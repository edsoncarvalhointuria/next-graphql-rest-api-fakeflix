import { db } from "@/sql/seed";
import { toQueryString } from "@/util/toQueryString";
import { getContentBaseSQL } from "./catalog.service";
import { getSelectArrayGroupBaseItens } from "./base.service";
import { parseRestContent } from "@/util/rest";

export const getAllMovie = async (limit?: number, offset?: number) => {
    let query = `
        ${getContentBaseSQL()}
            json_object('duration_minutes', duration_minutes) as movieData
        FROM content
        INNER JOIN movie ON movie.content_id = content.id
        WHERE content.type = 'MOVIE'
        ${limit ? "LIMIT ?" : "LIMIT -1"}
        ${offset ? "OFFSET ?" : ""}`;

    const values = [];
    if (limit) values.push(limit);
    if (offset) values.push(offset);
    try {
        const result = await db.all(query, values);

        if (!result) return;
        const response = result.map((v) => ({
            ...v,
            banner: JSON.parse(v.banner),
            description: JSON.parse(v.description),
            movieData: JSON.parse(v.movieData),
        }));

        return response;
    } catch (err: any) {
        throw new Error("Houve um erro ao pegar os dados " + err.message);
    }
};
export const getMovie = async (contentId: string) => {
    let query = `
        ${getContentBaseSQL()}
        ${getSelectArrayGroupBaseItens("cast")} as cast,
        ${getSelectArrayGroupBaseItens("creator")} as creators,
        ${getSelectArrayGroupBaseItens("genre")} as genres,
            json_object('duration_minutes', duration_minutes) as movieData
        FROM content
        INNER JOIN movie ON movie.content_id = content.id
        WHERE content.type = 'MOVIE' AND content.id = ?
    `;

    try {
        const result = await db.get(query, [contentId]);

        if (!result) return;
        const response = { ...result, ...parseRestContent(result), movieData: JSON.parse(result.movieData) };
        return response;
    } catch (err: any) {
        throw new Error("Houve um erro ao pegar os dados " + err.message);
    }
};

export const getMovieByContentId = async (contendIds: string[]) => {
    return await db.all(
        `
        SELECT 
            movie.content_id as id,
            duration_minutes
        FROM movie 
        WHERE movie.content_id IN (${toQueryString(contendIds)})`,
        contendIds,
    );
};
