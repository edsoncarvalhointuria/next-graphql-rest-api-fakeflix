import { db } from "@/sql/seed";
import { updateTagCatalogRest, updateTagCatologCQL } from "@/util/cache";
import { randomUUID } from "crypto";
import { getMovie } from "./movie.service";
import { getSerie } from "./serie.service";

export const registerContent = async (type: Type, data: Omit<Serie | Movie, "id">) => {
    const obj: ContentBase = {
        id: randomUUID(),
        banner: data.banner,
        cast: data.cast,
        classification: data.classification,
        creators: data.creators,
        description: data.description,
        genres: data.genres,
        title: data.title,
        trailer: data.trailer,
        year: data.year,
    };

    await db.run("BEGIN TRANSACTION;");
    const insertItem = (key: "cast" | "creators" | "genres") => {
        return db.run(
            `INSERT OR IGNORE INTO 
                content_${key.replace(/(.+)s$/, "$1")} 
            VALUES ${obj[key].map(() => "(?, ?)").join(", ")};`,
            obj[key].flatMap((v) => [v, obj.id]),
        );
    };
    try {
        await db.run(
            `
                INSERT INTO content
                VALUES
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
                `,
            [
                obj.id,
                obj.title,
                obj.year,
                obj.trailer,
                type,
                obj.description.short,
                obj.description.full,
                obj.banner.vertical,
                obj.banner.horizontal,
                obj.classification,
            ],
        );

        if (obj.cast.length) await insertItem("cast");
        if (obj.creators.length) await insertItem("creators");
        await insertItem("genres");

        if ("serieData" in data && type === "SERIE") {
            const { seasons } = data.serieData as SerieData;
            const seasonsLista = seasons.map((v) => ({
                ...v,
                id: randomUUID(),
                episodes: v.episodes.map((e) => ({ ...e, key: `s${v.number}e${e.number}`, id: randomUUID() })),
            }));

            const serieId = randomUUID();
            await db.run(`INSERT INTO serie(id, content_id) VALUES (?, ?);`, [serieId, obj.id]);
            await db.run(
                `INSERT INTO season 
                    VALUES ${seasonsLista.map(() => "(?,?,?,?)").join(", ")};`,
                seasonsLista.flatMap((v) => [v.id, v.title, v.number, serieId]),
            );
            await db.run(
                `INSERT INTO episode VALUES 
                        ${seasonsLista
                            .flatMap((v) => v.episodes)
                            .map(() => "(?, ?, ?, ?, ?, ?, ?, ?, ?)")
                            .join(", ")};
                        `,
                seasonsLista.flatMap((v) =>
                    v.episodes.flatMap((e) => [
                        e.id,
                        e.key,
                        e.title,
                        e.description,
                        e.duration_minutes,
                        e.year,
                        e.image,
                        e.number,
                        v.id,
                    ]),
                ),
            );
        }
        if ("movieData" in data && type === "MOVIE") {
            const { duration_minutes } = data.movieData as MovieData;
            await db.run(`INSERT INTO movie VALUES (?, ?, ?)`, [randomUUID(), duration_minutes, obj.id]);
        }

        await db.run("COMMIT;");
    } catch (err: any) {
        await db.run("ROLLBACK;");
        throw new Error("Houve um erro ao registrar itens" + err.message);
    }

    let response;
    if (type === "MOVIE") response = await getMovie(obj.id);
    else response = await getSerie(obj.id);

    updateTagCatologCQL();
    updateTagCatalogRest();
    return response;
};

export const deleteContent = async (type: Type, data: { contentId: string }) => {
    try {
        const { changes } = await db.run("DELETE FROM content WHERE id = ? AND type = ?", [data.contentId, type]);

        updateTagCatologCQL();
        updateTagCatalogRest();
        return changes && changes > 0;
    } catch (err: any) {
        throw new Error("Houve um erro ao deletar " + err.message);
    }
};

export const updateContent = async (type: Type, data: Partial<Omit<ContentBase, "genres" | "cast" | "creators">>) => {
    const contentId = data.id!;
    const { movieData } = data as any;

    const values = [];
    const columns: string[] = [];

    await db.run("BEGIN TRANSACTION;");
    try {
        let response;
        const entries = Object.entries(data);
        entries.forEach(([key, value]) => {
            if (Array.isArray(value) || key === "movieData") return;

            if (typeof value === "object") {
                Object.entries(value).forEach(([keyObj, valueObj]) => {
                    values.push(valueObj);
                    columns.push(`${key}_${keyObj} = ?`);
                });
                return;
            }

            const keyTable = key === "year" ? "year_number" : key;
            values.push(value);
            columns.push(`${keyTable} = ?`);
        });

        if (columns.length) {
            values.push(contentId, type);
            const query = `
                    UPDATE content
                    SET $columns
                    WHERE id = ? AND type = ?
                    RETURNING 
                    content.id,
                    content.title,
                    content.trailer,
                    content.classification,
                    year_number as year,
                    json_object('vertical', banner_vertical, 'horizontal', banner_horizontal) as banner,
                    json_object('short', description_short, 'full', description_full) as description;

                `.replace("$columns", columns.join(", "));

            response = await db.get(query, values);
        } else {
            response = await db.get(
                `SELECT 
                    *, 
                    year_number as year,  
                    json_object('short', description_short, 'full', description_full) as description,
                    json_object('vertical', banner_vertical, 'horizontal', banner_horizontal) as banner
                FROM 
                    content 
                WHERE id = ? AND type = ?`,
                [contentId, type],
            );
        }

        if (type === "MOVIE") {
            if (movieData) {
                await db.run(
                    `
                    UPDATE movie 
                    SET duration_minutes = ? 
                    WHERE content_id = ?`,
                    [movieData.duration_minutes, contentId],
                );
                response.movieData = movieData;
            } else
                response.movieData = {
                    duration_minutes: (await db.get("SELECT duration_minutes FROM movie WHERE content_id = ?", [
                        contentId,
                    ]))!.duration_minutes,
                };
        }

        await db.run("COMMIT;");

        if (!columns.length && !(movieData && type === "MOVIE")) return;

        const banner = JSON.parse(response.banner);
        const description = JSON.parse(response.description);
        response = {
            ...response,
            banner,
            description,
        };

        updateTagCatologCQL();
        updateTagCatalogRest();
        return response;
    } catch (err: any) {
        await db.run("ROLLBACK;");
        throw new Error("Houve um erro ao atualizar " + err.message);
    }
};
