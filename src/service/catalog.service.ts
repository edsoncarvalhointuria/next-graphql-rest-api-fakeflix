import { CACHE_TAGS } from "@/constants/cacheTags";
import { DEFAULT_LIMIT } from "@/constants/limit";
import { db } from "@/sql/seed";
import { addCacheSettings } from "@/util/cache";
import { normalizeText } from "@/util/normalizeText";
import { toQueryString } from "@/util/toQueryString";

export const getContentBaseSQL = () => {
    return `SELECT
                content.id,
                content.title,
                content.year_number as year,
                content.trailer,
                content.type,
                json_object('short', description_short, 'full', description_full) as description,
                json_object('vertical', banner_vertical, 'horizontal', banner_horizontal) as banner,
                classification,`;
};

const getCatologGQLCache = async (query: string) => {
    "use cache";
    addCacheSettings(CACHE_TAGS.CATALOG_GQL);

    return db.all(query);
};

export const getCatalogGraphQl = async (querys: CatalogQuerys) => {
    const { cast, classification, creator, description, genre, id, limit, offset, title, year } = querys;
    let query = `
        ${getContentBaseSQL().replace(/(.+),$/, "$1")}
        FROM content
        ${creator?.length ? `INNER JOIN content_creator ccr ON content.id = ccr.content_id` : ""}
        ${cast?.length ? `INNER JOIN content_cast cca ON cca.content_id = content.id` : ""}
        ${genre?.length ? `INNER JOIN content_genre cge ON cge.content_id = content.id` : ""}
        $WHERE
        GROUP BY content.id
        ${limit ? "LIMIT ?" : "LIMIT -1"}
        ${offset ? "OFFSET ?" : ""}`;

    const where = [];
    const whereList: any[] = [];

    if (id?.length) {
        where.push(`content.id IN (${toQueryString(id)})`);
        whereList.push(...id);
    }
    if (title) {
        title
            .trim()
            .split(" ")
            .forEach((v) => {
                if (!v) return;
                whereList.push(`%${normalizeText(v)}%`);
                where.push(`content.title LIKE ?`);
            });
    }
    if (year?.length) {
        where.push(`content.year_number IN (${toQueryString(year)})`);
        whereList.push(...year);
    }
    if (genre?.length) {
        where.push(`cge.genre_id IN (${toQueryString(genre)})`);
        whereList.push(...genre);
    }
    if (description) {
        description
            .trim()
            .split(" ")
            .forEach((v) => {
                const texto = normalizeText(v);
                whereList.push(`%${texto}%`, `%${texto}%`);
                where.push(`(content.description_short LIKE ? OR content.description_full LIKE ?)`);
            });
    }
    if (cast?.length) {
        where.push(`cca.cast_id IN (${toQueryString(cast)})`);
        whereList.push(...cast);
    }
    if (creator?.length) {
        where.push(`ccr.creator_id IN (${toQueryString(creator)})`);
        whereList.push(...creator);
    }
    if (classification?.length) {
        where.push(`content.classification IN (${toQueryString(classification)})`);
        whereList.push(...classification);
    }
    if (limit) whereList.push(limit);
    if (offset) whereList.push(offset);

    if (where.length) query = query.replace("$WHERE", `WHERE ${where.join(" AND ")}`);
    else query = query.replace("$WHERE", "");
    try {
        if (!whereList.length) return await getCatologGQLCache(query);
        return await db.all(query, whereList);
    } catch (err: any) {
        console.log(err);

        throw new Error("Houve um erro ao pegar dados " + err.message);
    }
};

const getCatalogRestCache = async (query: string) => {
    "use cache";
    addCacheSettings(CACHE_TAGS.CATALOG_REST);
    return db.all(query);
};
export const getCatalogRest = async (querys: CatalogQuerys) => {
    const { id, cast, genre, creator, classification, year, description, title, limit, offset } = querys;

    let query = `
        ${getContentBaseSQL()}
            CASE
                WHEN type = 'MOVIE' THEN json_object('duration_minutes',movie.duration_minutes)
                ELSE NULL
            END as movieData,
            CASE
                WHEN type = 'SERIE' THEN json_object('total_episode', serie.total_episode, 'total_season', serie.total_season)
                ELSE NULL
            END as serieData
        FROM content
        LEFT JOIN serie ON serie.content_id = content.id
        LEFT JOIN movie ON movie.content_id = content.id
        ${cast?.length ? "LEFT JOIN content_cast cca ON content.id = cca.content_id" : ""}
        ${creator?.length ? "LEFT JOIN content_creator ccr ON content.id = ccr.content_id" : ""}
        ${genre?.length ? "LEFT JOIN content_genre cge ON content.id = cge.content_id" : ""}
        $WHERE
        GROUP BY content.id
        LIMIT ?
        ${offset ? "OFFSET ?" : ""}
    `;

    const where: string[] = [];
    const whereList: any[] = [];

    if (id?.length) {
        where.push(`content.id IN (${toQueryString(id)})`);
        whereList.push(...id);
    }
    if (cast?.length) {
        where.push(`cca.cast_id IN (${toQueryString(cast)})`);
        whereList.push(...cast);
    }
    if (creator?.length) {
        where.push(`ccr.creator_id IN (${toQueryString(creator)})`);
        whereList.push(...creator);
    }
    if (genre?.length) {
        where.push(`cge.genre_id IN (${toQueryString(genre)})`);
        whereList.push(...genre);
    }
    if (classification?.length) {
        where.push(`classification IN (${toQueryString(classification)})`);
        whereList.push(...classification);
    }
    if (year?.length) {
        where.push(`content.year_number IN (${toQueryString(year)})`);
        whereList.push(...year);
    }
    if (description) {
        description
            .trim()
            .split(" ")
            .forEach((v) => {
                const text = normalizeText(v);
                where.push("description_full LIKE ?", "description_short LIKE ?");
                whereList.push(`%${text}%`, `%${text}%`);
            });
    }
    if (title) {
        title
            .trim()
            .split(" ")
            .forEach((v) => {
                const text = normalizeText(v);
                where.push("content.title LIKE ?");
                whereList.push(`%${text}%`);
            });
    }
    whereList.push(limit || DEFAULT_LIMIT);
    if (offset) whereList.push(offset);

    if (where.length) query = query.replace("$WHERE", `WHERE ${where.join(" AND ")}`);
    else query = query.replace("$WHERE", "");

    try {
        let result;
        if (!whereList.length) result = await getCatalogRestCache(query);
        else result = await db.all(query, whereList);

        const response = result.map((v) => ({
            ...v,
            banner: JSON.parse(v.banner),
            description: JSON.parse(v.description),
            movieData: v.type === "MOVIE" ? JSON.parse(v.movieData) : v.movieData,
            serieData: v.type === "SERIE" ? JSON.parse(v.serieData) : v.serieData,
        }));

        return response;
    } catch (err: any) {
        throw new Error("Houve um erro ao buscar dados: " + err.message);
    }
};
