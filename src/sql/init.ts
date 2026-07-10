import sqlite3 from "sqlite3";
import { readFile } from "fs/promises";
import { open } from "sqlite";
import path from "path";
import { datas } from "@/data/fakefkix.datas";
import { randomUUID } from "crypto";
import { DEFAULT_IDS } from "@/constants/defaultIds";

const pathDb = path.join(process.cwd(), "db.sqlite");

const db = await open({ filename: pathDb, driver: sqlite3.Database });

const createTables = async () => {
    const pathToTables = path.join(process.cwd(), "src/sql/tables.sql");
    const code = await readFile(pathToTables, "utf-8");
    await db.exec(code);

    console.log("Tabelas criadas co sucesso!");
};

const populationTables = async () => {
    await db.run("BEGIN TRANSACTION;");

    const setCasts = new Set();
    const setCreators = new Set();
    const setGenres = new Set();

    datas.forEach((v) => {
        v.cast.forEach((v) => setCasts.add(v));
        v.creators.forEach((v) => setCreators.add(v));
        v.genres.forEach((v) => setGenres.add(v));
    });

    const prepareCast = await db.prepare("INSERT INTO cast VALUES (?, ?);");
    const prepareCreators = await db.prepare("INSERT INTO creator VALUES (?, ?);");
    const prepareGenres = await db.prepare("INSERT INTO genre VALUES (?, ?);");

    await Promise.all([
        ...setCasts
            .values()
            .map((v) => prepareCast.run([v === DEFAULT_IDS.cast.example ? DEFAULT_IDS.cast.id : randomUUID(), v])),
        ...setCreators
            .values()
            .map((v) =>
                prepareCreators.run([v === DEFAULT_IDS.creator.example ? DEFAULT_IDS.creator.id : randomUUID(), v]),
            ),
        ...setGenres
            .values()
            .map((v) => prepareGenres.run([v === DEFAULT_IDS.genre.example ? DEFAULT_IDS.genre.id : randomUUID(), v])),
    ]);

    for (const data of datas) {
        const title = data.title;
        const contentId = title === DEFAULT_IDS[data.type].example ? DEFAULT_IDS[data.type].id : randomUUID();

        await db.run(
            `INSERT INTO content
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
            [
                contentId,
                data.title,
                data.year,
                data.trailer,
                data.type,
                data.description.short,
                data.description.full,
                data.banner.vertical,
                data.banner.horizontal,
                data.classification,
            ],
        );

        try {
            for (const cast of data.cast) {
                await db.run(
                    `INSERT INTO content_cast VALUES 
                ((SELECT id FROM cast WHERE name = ?), ?);`,
                    [cast, contentId],
                );
            }
            for (const creator of data.creators) {
                await db.run(
                    `INSERT INTO content_creator VALUES 
                    ((SELECT id FROM creator WHERE name = ?), ?);`,
                    [creator, contentId],
                );
            }
            for (const genre of data.genres) {
                await db.run(
                    `INSERT INTO content_genre VALUES 
                    ((SELECT id FROM genre WHERE name = ?) ,?);`,
                    [genre, contentId],
                );
            }
        } catch {
            await db.run("ROLLBACK;");
            console.log("Houve um erro ao inserir os itens", data);
            break;
        }

        if (data.type === "MOVIE")
            await db.run(`INSERT INTO movie VALUES (?, ?, ?);`, [
                randomUUID(),
                data.movieData.duration_minutes,
                contentId,
            ]);
        else {
            const serieId = randomUUID();
            await db.run(`INSERT INTO serie(id, content_id) VALUES (?, ?);`, [serieId, contentId]);

            for (const season of data.serieData.seasons) {
                const seasonId = season.title === DEFAULT_IDS.season.example ? DEFAULT_IDS.season.id : randomUUID();
                await db.run(`INSERT INTO season VALUES (?, ?, ?, ?);`, [
                    seasonId,
                    season.title,
                    season.number,
                    serieId,
                ]);

                await Promise.all(
                    season.episodes.map((v) =>
                        db.run(`INSERT INTO episode VALUES (?,?,?,?,?,?,?,?,?);`, [
                            v.title === DEFAULT_IDS.episode.example ? DEFAULT_IDS.episode.id : randomUUID(),
                            v.key,
                            v.title,
                            v.description,
                            v.duration_minutes,
                            v.year,
                            v.image,
                            v.number,
                            seasonId,
                        ]),
                    ),
                );
            }
        }
    }

    await db.run("COMMIT;");

    console.log("Tabelas populadas com sucesso;");
};

const deleteTable = async () => {
    await db.exec(`
    BEGIN TRANSACTION;
        DELETE FROM content;
        DELETE FROM cast;
        DELETE FROM content_cast;
        DELETE FROM creator;
        DELETE FROM content_creator;
        DELETE FROM genre;
        DELETE FROM content_genre;
        DELETE FROM movie;
        DELETE FROM serie;
        DELETE FROM season;
        DELETE FROM episode;
    COMMIT;
`);

    console.log("limpeza concluída");
};

const dropTables = async () => {
    await db.exec(`BEGIN TRANSACTION;

        DROP TABLE IF EXISTS cast;
        DROP TABLE IF EXISTS content_cast;
        DROP TABLE IF EXISTS creator;
        DROP TABLE IF EXISTS content_creator;
        DROP TABLE IF EXISTS genre;
        DROP TABLE IF EXISTS content_genre;
        DROP TABLE IF EXISTS movie;
        DROP TABLE IF EXISTS episode;
        DROP TABLE IF EXISTS season;
        DROP TABLE IF EXISTS serie;
        DROP TABLE IF EXISTS content;

        COMMIT;`);

    console.log("Tabelas deletadas com sucesso!");
};

await createTables();
await populationTables();
