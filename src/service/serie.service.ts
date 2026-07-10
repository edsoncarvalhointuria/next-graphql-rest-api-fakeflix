import { db } from "@/sql/seed";
import { toQueryString } from "@/util/toQueryString";
import { getContentBaseSQL } from "./catalog.service";
import { getSelectArrayGroupBaseItens } from "./base.service";
import { parseRestContent } from "@/util/rest";

export const getAllSerie = async (limit?: number, offset?: number) => {
    let query = `
     ${getContentBaseSQL()}
        json_object('total_season',total_season, 'total_episode', total_episode) as serieData
        FROM content
        INNER JOIN serie ON serie.content_id = content.id
        WHERE content.type = 'SERIE'
        ${limit ? "LIMIT ?" : "LIMIT -1"}
        ${offset ? "OFFSET ?" : ""}
        ;`;

    try {
        const values: any[] = [];
        if (offset) values.push(offset);
        if (limit) values.push(limit);

        const result = await db.all(query, values);

        if (!result) return;

        const response = result.map((v: any) => {
            return {
                ...v,
                banner: JSON.parse(v.banner),
                description: JSON.parse(v.description),
                serieData: JSON.parse(v.serieData),
            };
        });

        return response;
    } catch (err: any) {
        throw new Error("Houve um erro ao pegar a serie " + err.message);
    }
};
export const getSerie = async (contentId: string, limitSeason?: number, offsetSeason?: number) => {
    let query = `
        WITH season_with AS (
            SELECT
                season.*,
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
                ) as episodes,
                ROW_NUMBER() OVER(PARTITION BY serie.id ORDER BY season.number) as row
            FROM season
            INNER JOIN serie ON serie.id = season.serie_id
            INNER JOIN episode ON episode.season_id = season.id
            WHERE serie.content_id = ?
            GROUP BY season.id
        )
     ${getContentBaseSQL()}
            ${getSelectArrayGroupBaseItens("cast")} as cast,
            ${getSelectArrayGroupBaseItens("creator")} as creators,
            ${getSelectArrayGroupBaseItens("genre")} as genres,

            json_object(
                'total_season',total_season, 
                'total_episode',total_episode,
                'seasons', 
                    (SELECT 
                        json_group_array(
                            json_object(
                                'id', season.id,
                                'title', season.title,
                                'number', season.number,
                                'episodes', season.episodes
                            )
                        ) 
                    FROM season_with season
                    WHERE ${offsetSeason ? "row > ?" : "row >= 0"} ${limitSeason ? " AND row <= ? + ?" : ""}
                    )  
            ) as serieData
        FROM content
        INNER JOIN serie ON serie.content_id = content.id
        WHERE content.type = 'SERIE' AND content.id = ?;
        `;

    try {
        const values: any[] = [contentId];
        if (offsetSeason) values.push(offsetSeason);
        if (limitSeason) values.push(limitSeason, offsetSeason || 0);

        const result = await db.get(query, [...values, contentId]);

        if (!result) return;

        const serieData = JSON.parse(result.serieData);
        const response = {
            ...result,
            ...parseRestContent(result),
            serieData: {
                ...serieData,
                seasons: serieData.seasons.map((s: any) => ({
                    ...s,
                    episodes: JSON.parse(s.episodes),
                })),
            },
        };

        return response;
    } catch (err: any) {
        throw new Error("Houve um erro ao pegar a serie " + err.message);
    }
};

export const getSerieByContentId = async (
    contentIds: string[],
    seasonIds?: string[],
    limit?: number,
    offset?: number,
) => {
    const values: any[] = [...contentIds];
    if (seasonIds?.length) values.push(...seasonIds);
    if (offset) values.push(offset);
    if (limit) values.push(limit, (offset || 0) > 1 ? offset : 0);

    try {
        const result = await db.all(
            `
                WITH seasons AS (
                    SELECT 
                        content_id,
                        serie.total_season,
                        serie.total_episode,
                        s.*,
                        ROW_NUMBER() over(PARTITION BY s.serie_id ORDER BY number) as row
                    FROM serie
                        INNER JOIN season s ON s.serie_id = serie.id
                        WHERE content_id IN (${toQueryString(contentIds)})
                        ${seasonIds?.length ? ` AND s.id IN (${toQueryString(seasonIds)})` : ""}
                )
                SELECT
                    content_id,
                    json_group_array(json_object(
                                'id', id,
                                'title', title,
                                'number', number
                            )) as seasons
                FROM seasons
                WHERE ${offset ? "row > ?" : "row > 0"} ${limit ? "AND row <= ? + ?" : ""}
        
            `,
            values,
        );

        return result;
    } catch (err: any) {
        throw new Error("Houve um erro ao pegar dados " + err.message);
    }
};

export const getSerieData = async (contentIds: string[]) => {
    return await db.all(
        `
        SELECT
            *
        FROM serie
        WHERE content_id IN (${toQueryString(contentIds)})
    `,
        contentIds,
    );
};
