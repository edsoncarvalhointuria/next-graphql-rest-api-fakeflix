import { db } from "@/sql/seed";
import { toQueryString } from "@/util/toQueryString";
import { randomUUID } from "crypto";

type DataRegister = Omit<Season, "id" | "serie_id" | "episodes"> & {
    content_id: string;
    episodes: Omit<Episode, "key" | "id">[];
};

export const getSeasons = async (limit?: number, offset?: number) => {
    const values = [];
    if (limit) values.push(limit);
    if (offset) values.push(offset);
    return await db.all(
        `
        SELECT
            season.id,
            season.title,
            season.number,
            (SELECT content_id FROM serie WHERE serie.id = season.serie_id) as content_id,
            COUNT(episode.id) as total_episodes
        FROM
            season
        INNER JOIN episode ON episode.season_id = season.id
        GROUP BY season.id
        ${limit ? "LIMIT ?" : "LIMIT -1"}
        ${offset ? "OFFSET ?" : ""}
        `,
        values,
    );
};
export const getSeasonById = async (id: string, episodeIds?: string[]) => {
    const values = [];
    if (episodeIds?.length) values.push(...episodeIds);
    values.push(id);

    try {
        const result = await db.get(
            `SELECT 
                season.id,
                season.title,
                season.number,
                serie.content_id,
                (SELECT json_group_array(
                    json_object(
                        'id', episode.id,
                        'season_id', episode.season_id,
                        'key', episode.key,
                        'title', episode.title,
                        'description', episode.description,
                        'duration_minutes', episode.duration_minutes,
                        'year', episode.year_number,
                        'image', episode.image,
                        'number', episode.number
                        )
                    )
                FROM episode
                WHERE episode.season_id = season.id
                ${episodeIds?.length ? `AND episode.id IN (${toQueryString(episodeIds)})` : ""}
                )as episodes
            FROM 
                season 
            INNER JOIN serie ON serie.id = season.serie_id
            WHERE season.id = ?`,
            values,
        );
        if (!result) return;

        const response = { ...result, episodes: JSON.parse(result.episodes) };
        return response;
    } catch (err: any) {
        throw new Error("Houve um erro ao pegar season " + err.message);
    }
};
export const getSeasonByContentId = async (contentId: string, numbers?: number[], episodeIds?: string[]) => {
    const values: any[] = [contentId];
    if (numbers?.length) values.push(...numbers);
    if (episodeIds?.length) values.push(...episodeIds);

    try {
        const result = await db.get(
            `SELECT 
                season.id,
                season.title,
                season.number ,
                json_group_array(
                    json_object(
                        'id', episode.id,
                        'season_id', episode.season_id,
                        'key', episode.key,
                        'title', episode.title,
                        'description', episode.description,
                        'duration_minutes', episode.duration_minutes,
                        'year', episode.year_number,
                        'image', episode.image,
                        'number', episode.number
                    )
                ) as episodes
            FROM 
                season 
            INNER JOIN episode ON episode.season_id = season.id
            WHERE season.serie_id = (SELECT id FROM serie WHERE serie.content_id = ?)
            ${numbers?.length ? `AND season.number IN (${toQueryString(numbers)})` : ""}
            ${episodeIds?.length ? `AND episode.id IN (${toQueryString(episodeIds)})` : ""}
            GROUP BY season.id`,
            values,
        );
        if (!result) return;

        const response = { ...result, episodes: JSON.parse(result.episodes) };
        return response;
    } catch (err: any) {
        throw new Error("Houve um erro ao pegar season " + err.message);
    }
};
export const registerSeason = async (data: DataRegister) => {
    const serie_id = await db.get("SELECT id FROM serie WHERE content_id = ?", data.content_id);
    const season: Season = {
        id: randomUUID(),
        number: data.number,
        title: data.title,
        serie_id: serie_id?.id,
        episodes: data.episodes.map((e) => ({ ...e, key: `s${data.number}e${e.number}`, id: randomUUID() })),
    };

    try {
        await db.run("BEGIN TRANSACTION");

        await db.run(`INSERT INTO season VALUES (?,?,?,?);`, [season.id, season.title, season.number, season.serie_id]);
        await db.run(
            `INSERT INTO episode VALUES 
                        ${season.episodes.map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)").join(", ")};
                        `,

            season.episodes.flatMap((e) => [
                (e as any).id,
                e.key,
                e.title,
                e.description,
                e.duration_minutes,
                e.year,
                e.image,
                e.number,
                season.id,
            ]),
        );
        await db.run("COMMIT;");
        return season;
    } catch (err: any) {
        await db.run("ROLLBACK");
        throw new Error("Houve um erro ao registrar " + err.message);
    }
};
