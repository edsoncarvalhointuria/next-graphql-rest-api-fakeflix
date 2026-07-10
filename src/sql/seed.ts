import os from "os";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { copyFileSync, existsSync } from "fs";

const dbName = "db.sqlite";
const pathToDatabase = path.join(process.cwd(), dbName);
let pathActiveDatabase = pathToDatabase;

if (process.env.NODE_ENV === "production") {
    const dbTmp = path.join(os.tmpdir(), dbName);
    if (!existsSync(dbTmp)) copyFileSync(pathToDatabase, dbTmp);

    pathActiveDatabase = dbTmp;
}

export const db = await open({
    filename: pathActiveDatabase,
    driver: sqlite3.Database,
});

await db.run("PRAGMA foreign_keys = ON;");
