import {
    addBaseItensToContent,
    deleteBaseItens,
    getBaseItens,
    getBaseItensByContenId,
    registerBaseItens,
    removeBaseItensFromContent,
    updateBaseItens,
} from "@/service/base.service";
import { getCatalogGraphQl } from "@/service/catalog.service";
import { deleteContent, registerContent, updateContent } from "@/service/content.service";
import { getEpisodesBySeasonId, registerEpisode } from "@/service/episode.service";
import { getMovieByContentId } from "@/service/movie.service";
import { registerSeason } from "@/service/season.service";
import { getSerieByContentId, getSerieData } from "@/service/serie.service";
import { toJSONParse } from "@/util/toJSONParse";
import DataLoader from "dataloader";
import { GraphQLError } from "graphql/error";

interface ArgsData<T> {
    data: T;
}

interface ArgsSerieData {
    seasonsIds?: string[];
    limit?: number;
    offset?: number;
}
interface ArgsSeason {
    ids?: string[];
    numbers?: number[];
}
interface Context {
    cacheLoader: Map<Tables, DataLoader<any, any>>;
}

const fnArgsData = <T>(f: (args: T) => any) => {
    return (_: any, args: ArgsData<T>) => f(args.data);
};
const fnTableArgs = <TName, T>(table: TName, f: (table: TName, args: T) => any, throwNotFound: boolean = false) => {
    return async (_: any, args: T) => {
        try {
            const result = await f(table, args);

            if (throwNotFound && !result)
                throw new GraphQLError("Todas as relações já existem.", {
                    extensions: { code: "ALREADY_EXISTS", http: { status: 404 } },
                });

            return result;
        } catch (err: any) {
            if (throwNotFound && err.message.includes("SQLITE_CONSTRAINT: FOREIGN KEY"))
                throw new GraphQLError("Um dos ids enviados não foi encontrado.", {
                    extensions: { code: "NOT_FOUND", http: { status: 404 } },
                });

            throw err;
        }
    };
};
const fnTableArgsData = <TName, T>(table: TName, f: (table: TName, args: T) => any, throwNotFound: boolean = false) => {
    return async (_: any, args: ArgsData<T>) => {
        const result = await f(table, args.data);

        if (throwNotFound && !result)
            throw new GraphQLError("Item não encontrado, verifique o id enviado", {
                extensions: { code: "NOT_FOUND", http: { status: 404 } },
            });

        return result;
    };
};

const fnLoaderContext = (f: (ctx: Context) => DataLoader<any, any>) => {
    return async (parent: ContentBase, _: any, ctx: Context) => await f(ctx).load(parent.id);
};
const fnLoaderTableContext = <TName>(table: TName, f: (table: TName, ctx: Context) => DataLoader<any, any>) => {
    return async (parent: ContentBase, _: any, ctx: Context) => await f(table, ctx).load(parent.id);
};
const fnLoaderArgsContext = <T>(f: (args: T, ctx: Context) => DataLoader<any, any>) => {
    return async (parent: { id: string[] }, args: T, ctx: Context) => await f(args, ctx).load(parent.id);
};

const loaderSerie = (args: ArgsSerieData, context: Context) => {
    const { limit, offset, seasonsIds } = args;

    const key = `serie-${limit}-${offset}-${JSON.stringify(seasonsIds?.sort())}` as Tables;
    if (context.cacheLoader.has(key)) return context.cacheLoader.get(key)!;

    const loader = new DataLoader(async (keys: readonly string[]) => {
        const result = await getSerieByContentId(keys as any, seasonsIds, limit, offset);

        const response = keys.map((v) => {
            const season = result.find((r) => r?.content_id === v);
            return season ? JSON.parse(season?.seasons || "[]") : [];
        });
        return response;
    });

    context.cacheLoader.set(key, loader);

    return loader;
};
const loaderSerieTotals = (context: Context) => {
    const agora = Date.now();

    const key = "loader-serie-totals" as Tables;
    if (context.cacheLoader.has(key)) return context.cacheLoader.get(key)!;

    const loader = new DataLoader(async (keys: readonly string[]) => {
        const result = await getSerieData(keys as any[]);

        const response = keys.map((v) => {
            const item = result.find((r) => r.content_id === v);

            return item;
        });

        return response;
    });

    context.cacheLoader.set(key, loader);
    return loader;
};
const loaderSeason = (args: ArgsSeason, context: Context) => {
    const { ids, numbers } = args;
    const key = `season-${JSON.stringify(ids?.sort())}-${JSON.stringify(numbers?.sort())}` as Tables;

    if (context.cacheLoader.has(key)) return context.cacheLoader.get(key)!;

    const loader = new DataLoader(async (keys: readonly string[]) => {
        const result = await getEpisodesBySeasonId(keys as any, numbers, ids);

        const response = keys.map((v) => {
            const ep = result.filter((e) => e.season_id === v);
            return ep || [];
        });
        return response;
    });

    context.cacheLoader.set(key, loader);

    return loader;
};
const loaderMovie = (context: Context) => {
    if (context.cacheLoader.has("movie")) return context.cacheLoader.get("movie")!;

    const loader = new DataLoader(async (keys: readonly string[]) => {
        const result = await getMovieByContentId(keys as any);

        const response = keys.map((v) => {
            const duration = result.find((r) => r.id === v);

            return duration ? { duration_minutes: duration.duration_minutes } : {};
        });

        return response;
    });

    context.cacheLoader.set("movie", loader);

    return loader;
};
const loaderItens = (tableName: Tables, context: Context) => {
    if (context.cacheLoader.has(tableName)) return context.cacheLoader.get(tableName)!;

    const loader = new DataLoader(async (keys: readonly string[]) => {
        const result = await getBaseItensByContenId(tableName, keys as any);
        const response = keys.map((v) => {
            const item = result.find((r) => r.id === v);

            return JSON.parse(item.list || "[]");
        });
        return response;
    });

    context.cacheLoader.set(tableName, loader);

    return loader;
};

const fnsContent = {
    description: (parent: ContentBase) => {
        return toJSONParse(parent, "description");
    },
    banner: (parent: ContentBase) => {
        return toJSONParse(parent, "banner");
    },
    creators: fnLoaderTableContext("creator", loaderItens),
    cast: fnLoaderTableContext("cast", loaderItens),
    genres: fnLoaderTableContext("genre", loaderItens),
};

export const resolvers = {
    Classification: {
        IDADE_6: "6",
        IDADE_10: "10",
        IDADE_12: "12",
        IDADE_14: "14",
        IDADE_16: "16",
        IDADE_18: "18",
    },

    Query: {
        catalog: (_: any, args: CatalogQuerys) => getCatalogGraphQl(args),
        genres: fnTableArgs("genre", getBaseItens),
        creators: fnTableArgs("creator", getBaseItens),
        cast: fnTableArgs("cast", getBaseItens),
    },
    ContentBase: {
        __resolveType: (content: Movie | Serie) => {
            const { type } = content;
            if (type === "MOVIE") return "Movie";
            if (type === "SERIE") return "Serie";
            return null;
        },
    },
    Movie: {
        movieData: fnLoaderContext(loaderMovie),
        ...fnsContent,
    },
    Serie: {
        serieData: async (parent: ContentBase, _: any, ctx: Context) => {
            const result = await loaderSerieTotals(ctx).load(parent.id);
            return { ...result, id: parent.id };
        },

        ...fnsContent,
    },
    Season: {
        episodes: fnLoaderArgsContext(loaderSeason),
    },
    SerieData: {
        seasons: fnLoaderArgsContext(loaderSerie),
    },

    Mutation: {
        registerMovie: fnTableArgsData("MOVIE", registerContent),
        registerSerie: fnTableArgsData("SERIE", registerContent),
        registerEpisode: fnArgsData(registerEpisode),
        registerSeason: fnArgsData(registerSeason),
        registerGenres: fnTableArgsData("genre", registerBaseItens),
        registerCasts: fnTableArgsData("cast", registerBaseItens),
        registerCreators: fnTableArgsData("creator", registerBaseItens),

        deleteMovie: fnTableArgs("MOVIE", deleteContent),
        deleteSerie: fnTableArgs("SERIE", deleteContent),
        deleteSeason: fnTableArgs("season", deleteBaseItens),
        deleteEpisode: fnTableArgs("episode", deleteBaseItens),
        deleteGenre: fnTableArgs("genre", deleteBaseItens),
        deleteCast: fnTableArgs("cast", deleteBaseItens),
        deleteCreator: fnTableArgs("creator", deleteBaseItens),

        updateMovie: fnTableArgsData("MOVIE", updateContent, true),
        updateSerie: fnTableArgsData("SERIE", updateContent, true),
        updateSeason: fnTableArgsData<"season", Season>("season", updateBaseItens, true),
        updateEpisode: fnTableArgsData<"episode", Episode>("episode", updateBaseItens, true),
        updateGenre: fnTableArgsData<"genre", Item>("genre", updateBaseItens, true),
        updateCast: fnTableArgsData<"cast", Item>("cast", updateBaseItens, true),
        updateCreator: fnTableArgsData<"creator", Item>("creator", updateBaseItens, true),

        addGenreToContent: fnTableArgs("genre", addBaseItensToContent, true),
        addCastToContent: fnTableArgs("cast", addBaseItensToContent, true),
        addCreatorToContent: fnTableArgs("creator", addBaseItensToContent, true),

        removeGenreFromContent: fnTableArgs("genre", removeBaseItensFromContent),
        removeCastFromContent: fnTableArgs("cast", removeBaseItensFromContent),
        removeCreatorFromContent: fnTableArgs("creator", removeBaseItensFromContent),
    },
};
