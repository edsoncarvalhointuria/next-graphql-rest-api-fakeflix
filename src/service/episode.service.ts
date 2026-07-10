import { db } from "@/sql/seed";
import { updateTagCatalogRest } from "@/util/cache";
import { toQueryString } from "@/util/toQueryString";
import { randomUUID } from "crypto";

export const registerEpisode = async (data: Omit<Episode, "id">) => {
    try {
        const episode: Episode = {
            id: randomUUID(),
            season_id: data.season_id,
            description: data.description,
            image: data.image,
            key: data.key,
            number: data.number,
            duration_minutes: data.duration_minutes,
            title: data.title,
            year: data.year,
        };

        await db.run(`INSERT INTO episode VALUES (?,?,?,?,?,?,?,?,?)`, [
            episode.id,
            episode.key,
            episode.title,
            episode.description,
            episode.duration_minutes,
            episode.year,
            episode.image,
            episode.number,
            episode.season_id,
        ]);
        updateTagCatalogRest();
        return episode;
    } catch (err: any) {
        throw new Error("Houve um erro ao registrar " + err.message);
    }
};

export const getEpisodesBySeasonId = async (seasonIds: string[], numbers?: number[], episodeIds?: string[]) => {
    const values: any[] = [...seasonIds];
    if (episodeIds?.length) values.push(...episodeIds);
    if (numbers?.length) values.push(...numbers);
    try {
        const result = await db.all(
            `
        SELECT 
            episode.season_id,
            episode.id,
            episode.key,
            episode.title,
            episode.description,
            episode.duration_minutes,
            episode.year_number as year,
            episode.image,
            episode.number
        FROM episode
        WHERE season_id IN (${toQueryString(seasonIds)})
        ${episodeIds?.length ? ` AND episode.id IN (${toQueryString(episodeIds)})` : ""}
        ${numbers?.length ? ` AND episode.number IN (${toQueryString(numbers)})` : ""}`,
            values,
        );

        return result;
    } catch (err: any) {
        throw new Error("Houve erro ao pegar dados " + err.message);
    }
};

export const getEpisodes = async (limit?: number, offset?: number) => {
    const values = [];
    if (limit) values.push(limit);
    if (offset) values.push(offset);
    return await db.all(
        `
        SELECT    
            *
        FROM episode
        ${limit ? "LIMIT ?" : "LIMIT -1"}
        ${offset ? "OFFSET ?" : ""};`,
        values,
    );
};
