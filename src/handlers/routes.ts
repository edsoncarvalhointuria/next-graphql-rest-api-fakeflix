// Itens

import { NextRequest, NextResponse } from "next/server";
import { tryCatchRest } from "./wrapper";
import {
    addBaseItensToContent,
    deleteBaseItens,
    getBaseItens,
    getBaseItensByContenId,
    getBaseItensById,
    getContentItemBaseItens,
    registerBaseItens,
    removeBaseItensFromContentById,
    updateBaseItens,
} from "@/service/base.service";
import {
    schemaContenItemAddParams,
    schemaContenItemAlterParams,
    schemaDinamicId,
    schemaId,
    schemaRegisterItens,
    schemaSearchParamsItens,
    zodUpdate,
} from "@/schemas/zod_schemas";
import z from "zod";
import { deleteContent, registerContent, updateContent } from "@/service/content.service";
import { DEFAULT_LIMIT } from "@/constants/limit";
import { HAL_ROUTES } from "@/constants/routes";
import { contentItemTables } from "@/constants/content";
import { NextURL } from "next/dist/server/web/next-url";
import { ERRORS } from "@/constants/errors";
import { validate } from "graphql";

export type ContextOnlyId = { params: Promise<{ id: string }> };
type ContextIdTable = {
    params: Promise<{ table: string; id: string }>;
};
type ContextIdTableItemId = {
    params: Promise<{ table: string; itemId: string; id: string }>;
};

export const linkSelf = (nextUrl: NextURL) => {
    return {
        self: { href: nextUrl.href, method: "GET" },
    };
};
const linksModel = (
    nextUrl: NextURL,
    tableName: Exclude<Tables, "content_cast" | "content_creator" | "content_genre">,
    itemId: string,
) => {
    return {
        self: { href: `${nextUrl.origin}${HAL_ROUTES.update[tableName](itemId)}`, method: "GET" },
        update: { href: `${nextUrl.origin}${HAL_ROUTES.update[tableName](itemId)}`, method: ["PUT", "PATCH"] },
        delete: { href: `${nextUrl.origin}${HAL_ROUTES.delete[tableName](itemId)}`, method: "DELETE" },
    };
};
export const linksItem = (
    nextUrl: NextURL,
    tableName: Exclude<Tables, "episode" | "season" | "content_cast" | "content_creator" | "content_genre">,
    id: string,
) => {
    return {
        ...linksModel(nextUrl, tableName, id),
        post: { href: `${nextUrl.origin}${HAL_ROUTES.post[tableName]()}`, method: "POST" },
    };
};
export const linksSeason = (nextUrl: NextURL, id: string, serieId: string) => {
    return {
        ...linksModel(nextUrl, "season", id),
        post: { href: `${nextUrl.origin}${HAL_ROUTES.post.season(serieId)}`, method: "POST" },
    };
};
export const linksEpisode = (nextUrl: NextURL, id: string, seasonId: string) => {
    return {
        ...linksModel(nextUrl, "episode", id),
        post: { href: `${nextUrl.origin}${HAL_ROUTES.post.episode(seasonId)}`, method: "POST" },
    };
};
export const getItensRest = (tableName: (typeof contentItemTables)[number]) => {
    return tryCatchRest(async (request: NextRequest) => {
        const { nextUrl } = request;
        const params = Object.fromEntries(
            nextUrl.searchParams.keys().map((v) => {
                if (v === "id") return [v, nextUrl.searchParams.getAll(v)];
                return [v, nextUrl.searchParams.get(v)];
            }),
        ) as ArgsItens;

        const validate = schemaSearchParamsItens.parse(params);
        const result = (await getBaseItens(tableName, validate)) as Item[];

        const response = result.map((v) => ({
            ...v,
            _links: linksItem(nextUrl, tableName, v.id),
        }));

        return NextResponse.json({
            success: true,
            response,
            meta: { ...validate },
            _links: linkSelf(nextUrl),
        });
    });
};
export const getItensByIdRest = (tableName: (typeof contentItemTables)[number]) => {
    return tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
        const id = await context.params;
        const { nextUrl } = request;

        schemaId.parse(id);

        const result = await getBaseItensById(tableName, id.id);
        if (!result)
            throw new Error("Item não encontrado. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });

        const response = {
            ...result,
            _links: linksItem(nextUrl, tableName, result.id),
        };

        return NextResponse.json({
            success: true,
            response,
            _links: linkSelf(nextUrl),
        });
    });
};

export const registerItensRest = (tableName: (typeof contentItemTables)[number]) => {
    return tryCatchRest(async (request: NextRequest) => {
        const body = await request.json();

        const validate = schemaRegisterItens.parse(body);

        const result = await registerBaseItens(tableName, validate);
        const response = result.map((v) => ({ ...v, _links: linksItem(request.nextUrl, tableName, v.id) }));

        return NextResponse.json({ success: true, response, _links: linkSelf(request.nextUrl) }, { status: 201 });
    });
};
export const deleteItensRest = (tableName: (typeof contentItemTables)[number]) => {
    return tryCatchRest(async (request, context: ContextOnlyId) => {
        const params = await context.params;

        schemaId.parse(params);

        const key: keyof DinamicId = `${tableName}Id`;
        const data: DinamicId = { [key]: params.id };

        const response = await deleteBaseItens(tableName, data);

        if (!response)
            throw new Error("Item não encontrado. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
        return NextResponse.json({
            success: true,
            message: "Objeto deletado com Sucesso",
            _links: { collection: { href: `${request.nextUrl.origin}${HAL_ROUTES.post[tableName]()}`, method: "GET" } },
        });
    });
};
export const updateItensRest = (tableName: (typeof contentItemTables)[number], zodObject: z.ZodObject) => {
    return tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
        const [id, body] = await Promise.all([context.params, request.json()]);

        schemaId.parse(id);

        const validateObj = zodObject.strict().parse(body);

        const result = await updateBaseItens(tableName, { ...validateObj, id: id.id });

        if (!result)
            throw new Error("Item não encontrado. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
        const response = {
            ...result,
            _links: linksItem(request.nextUrl, tableName, id.id),
        };
        return NextResponse.json({ success: true, response, _link: linkSelf(request.nextUrl) });
    });
};

export const getAllContentItemRest = (type: Type) => {
    return tryCatchRest(async (request: NextRequest, context: ContextIdTable) => {
        const params = await context.params;
        const { nextUrl } = request;

        const validate = schemaContenItemAddParams.parse(params);

        const result = await getBaseItensByContenId(validate.table, [params.id]);

        if (!result.length)
            throw new Error(
                `${type === "MOVIE" ? "Filme" : "Série"} não encontrad${type === "MOVIE" ? "o" : "a"}. Verifique o id presente na url.`,
                { cause: ERRORS.NOT_FOUND_SQL },
            );
        const table = validate.table;
        const contentId = validate.id;
        const response = result
            .flatMap((v) => JSON.parse(v.list || "[]"))
            .map((v) => ({
                ...v,
                _links: {
                    self: { href: `${nextUrl.origin}${HAL_ROUTES.update[table](v.id)}`, method: "GET" },
                    update: { href: `${nextUrl.origin}${HAL_ROUTES.update[table](v.id)}`, method: ["PUT", "PATCH"] },
                    delete: {
                        href: `${nextUrl.origin}${HAL_ROUTES.delete[`content_${table}`](type, contentId, table, v.id)}`,
                        method: "DELETE",
                    },
                    post: {
                        href: `${nextUrl.origin}${HAL_ROUTES.post[`content_${table}`](type, contentId, table)}`,
                        method: "POST",
                    },
                },
            }));

        return NextResponse.json({
            success: true,
            response,
            _links: linkSelf(nextUrl),
        });
    });
};
export const addItensToContentRest = (type: Type) => {
    return tryCatchRest(async (request: NextRequest, context: ContextIdTable) => {
        const [body, params] = await Promise.all([request.json(), context.params]);
        const key = `${params.table}sIds` as TableIds;
        const { nextUrl } = request;

        const validateParams = schemaContenItemAddParams.parse(params);

        const validateBody = schemaDinamicId(key).parse(body);

        const data = { contentId: params.id, ...validateBody };
        const result = await addBaseItensToContent(validateParams.table, data);

        if (!result?.length)
            return NextResponse.json(
                { success: false, message: "Todos itens enviados já estavam relacionados" },
                { status: 400 },
            );

        const table = validateParams.table;
        const contentId = validateParams.id;
        const response = result.map((v) => ({
            ...v,
            _links: {
                self: { href: `${nextUrl.origin}${HAL_ROUTES.update[table](v.id)}`, method: "GET" },
                update: { href: `${nextUrl.origin}${HAL_ROUTES.update[table](v.id)}`, method: ["PUT", "PATCH"] },
                delete: {
                    href: `${nextUrl.origin}${HAL_ROUTES.delete[`content_${table}`](type, contentId, table, v.id)}`,
                    method: "DELETE",
                },
                post: {
                    href: `${nextUrl.origin}${HAL_ROUTES.post[`content_${table}`](type, contentId, table)}`,
                    method: "POST",
                },
            },
        }));

        return NextResponse.json(
            {
                success: true,
                response,
                _links: linkSelf(nextUrl),
            },
            { status: 201 },
        );
    });
};
export const removeItensFromContentRest = (type: Type) => {
    return tryCatchRest(async (request: NextRequest, context: ContextIdTableItemId) => {
        const params = await context.params;
        const { nextUrl } = request;

        const validate = schemaContenItemAlterParams.parse(params);

        const result = await removeBaseItensFromContentById(validate.table, params.itemId, params.id);

        if (!result)
            throw new Error("Item não encontrado. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
        return NextResponse.json({
            success: true,
            message: "Relação desfeita com Sucesso",
            _links: {
                collection: {
                    href: `${nextUrl.origin}/${type.toLowerCase()}/${validate.id}/${validate.table}`,
                    method: "GET",
                },
            },
        });
    });
};
export const getContentItemByIdRest = (type: Type) => {
    return tryCatchRest(async (request: NextRequest, context: ContextIdTableItemId) => {
        const params = await context.params;
        const { nextUrl } = request;

        const validate = schemaContenItemAlterParams.parse(params);

        const response = await getContentItemBaseItens(validate.table, params.itemId, params.id);

        if (!response)
            throw new Error("Item não encontrado. Verifique o id presente na url.", { cause: ERRORS.NOT_FOUND_SQL });
        const { table, id, itemId } = validate;

        return NextResponse.json({
            success: true,
            response,
            _links: {
                self: { href: request.nextUrl.href, method: "GET" },
                update: { href: `${nextUrl.origin}${HAL_ROUTES.update[table](itemId)}`, method: ["PUT", "PATCH"] },
                delete: {
                    href: `${nextUrl.origin}${HAL_ROUTES.delete[`content_${table}`](type, id, table, itemId)}`,
                    method: "DELETE",
                },
                post: {
                    href: `${nextUrl.origin}${HAL_ROUTES.post[`content_${table}`](type, id, table)}`,
                    method: "POST",
                },
            },
        });
    });
};

export const registerContentRest = (type: Type, schema: z.ZodObject<any>) => {
    return tryCatchRest(async (request: NextRequest) => {
        const { nextUrl } = request;
        const t = type.toLowerCase() as "serie" | "movie";
        const body = await request.json();
        const validate = schema.parse(body);

        const result = await registerContent(type, validate as any);

        if (!result)
            throw new Error(`Houve um erro ao adicionar ${type === "MOVIE" ? "o filme" : "a série"}, tente novamente`);

        let response = {
            ...result,
            cast: result.cast.map((v: any) => ({ ...v, _links: linksItem(nextUrl, "cast", v.id) })),
            genres: result.genres.map((v: any) => ({ ...v, _links: linksItem(nextUrl, "genre", v.id) })),
            creators: result.creators.map((v: any) => ({ ...v, _links: linksItem(nextUrl, "creator", v.id) })),
            _links: linksItem(nextUrl, t, result.id),
        };

        if (type === "SERIE") {
            const seasons = response.serieData.seasons.map((v: any) => ({
                ...v,
                _links: linksSeason(nextUrl, v.id, response.id),
                episodes: v.episodes.map((v: any) => ({ ...v, _links: linksEpisode(nextUrl, v.id, v.season_id!) })),
            }));

            response = { ...response, serieData: { ...response.serieData, seasons } };
        }

        return NextResponse.json(
            {
                success: true,
                response,
                _links: linkSelf(nextUrl),
            },
            { status: 201 },
        );
    });
};
export const updateContentRest = (type: Type, schema: z.ZodObject<any>) => {
    return tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
        const [body, params] = await Promise.all([request.json(), context.params]);
        const { nextUrl } = request;

        schemaId.parse(params);

        const validadeBody = schema.parse(body);

        const result = await updateContent(type, { ...validadeBody, id: params.id });

        if (!result)
            throw new Error(
                `${type === "MOVIE" ? "Filme não encontrado" : "Série não encontrada"}. Verifique o id presente na url.`,
                { cause: ERRORS.NOT_FOUND_SQL },
            );

        const response = {
            ...result,
            _links: linksItem(nextUrl, type.toLowerCase() as "serie" | "movie", result.id),
        };
        return NextResponse.json({
            success: true,
            response,
            _links: linkSelf(nextUrl),
        });
    });
};
export const deleteContentRest = (type: Type) => {
    return tryCatchRest(async (request: NextRequest, context: ContextOnlyId) => {
        const params = await context.params;
        const { nextUrl } = request;

        schemaId.parse(params);

        const response = await deleteContent(type, { contentId: params.id });
        if (!response)
            throw new Error(
                `${type === "MOVIE" ? "Filme não encontrado" : "Série não encontrada"}. Verifique o id presente na url.`,
                { cause: ERRORS.NOT_FOUND_SQL },
            );
        return NextResponse.json({
            success: true,
            message: `${type === "MOVIE" ? "Filme" : "Série"} e todas as suas relações foram deletadas com sucesso`,
            _links: { collection: { href: `${nextUrl.origin}/${type.toLowerCase()}` }, method: "GET" },
        });
    });
};
