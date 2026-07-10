import { CACHE_TAGS, CacheTag } from "@/constants/cacheTags";
import { DEFAULT_LIMIT } from "@/constants/limit";
import { db } from "@/sql/seed";
import { addCacheSettings, updateTagBaseItens, updateTagCatalogRest } from "@/util/cache";
import { normalizeText } from "@/util/normalizeText";
import { toQueryString } from "@/util/toQueryString";
import { randomUUID } from "crypto";

export const getSelectArrayGroupBaseItens = (tableName: Tables) => {
    return `(SELECT 
                json_group_array(json_object('id', tb.id, 'name', tb.name)) 
            FROM 
                content_${tableName} ctb
            INNER JOIN ${tableName} tb ON ctb.${tableName}_id = tb.id
            WHERE content_id = content.id)`;
};

export const updateBaseItens = async <T extends { id: string }>(
    tableName: Tables,
    data: T,
    parents?: { [key: string]: string }[],
) => {
    const { id, ...item } = data;
    const values: any[] = [];
    const updates: string[] = [];

    try {
        Object.entries(item).forEach(([key, value]) => {
            values.push(value);
            updates.push(`${key === "year" ? "year_number" : key} = ?`);
        });

        if (!updates.length) return false;
        values.push(id);
        if (parents?.length) values.push(...parents.flatMap((v) => Object.values(v)));

        const result = await db.get(
            `UPDATE ${tableName} 
            SET ${updates.join(", ")} 
            WHERE id = ? ${
                parents?.length
                    ? parents
                          .map((v) => {
                              const key = Object.keys(v)[0];

                              return `AND ${key} =  ?`;
                          })
                          .join(" ")
                    : ""
            }
            RETURNING *;`,
            values,
        );

        if (result) {
            updateTagBaseItens(tableName);
            updateTagCatalogRest(tableName);
        }

        return result;
    } catch (err: any) {
        throw new Error("Houve um erro ao atualizar dados " + err.message);
    }
};

export const registerBaseItens = async (tableName: Tables, data: Omit<Item, "id">[]) => {
    const itens: Item[] = [];

    try {
        await db.run(
            `INSERT INTO ${tableName} VALUES ${data.map(() => "(?,?)").join(", ")};`,
            data.flatMap((v) => {
                const id = randomUUID();
                itens.push({ id, name: v.name });
                return [id, v.name];
            }),
        );

        updateTagBaseItens(tableName);
        updateTagCatalogRest(tableName);

        return itens;
    } catch (err: any) {
        throw new Error("Houve um erro ao registrar os dados " + err.message);
    }
};

export const deleteBaseItens = async (tableName: Tables, data: DinamicId, parents?: { [key: string]: string }[]) => {
    const id = data[`${tableName}Id`];

    try {
        const { changes } = await db.run(
            `DELETE FROM ${tableName} WHERE id = ? ${
                parents?.length
                    ? parents
                          .map((v) => {
                              const key = Object.keys(v)[0];
                              return `AND ${key} = ?`;
                          })
                          .join(" ")
                    : ""
            }`,
            [id, ...(parents?.length ? parents.flatMap((v) => Object.values(v)) : [])],
        );

        const hasUpdate = changes && changes > 0;
        if (hasUpdate) {
            updateTagBaseItens(tableName);
            updateTagCatalogRest(tableName);
        }

        return hasUpdate;
    } catch (err: any) {
        throw new Error("Houve um erro ao deletar dados " + err.message);
    }
};

const getBaseItensCache = async (query: string, tableName: Tables) => {
    "use cache";

    const tag = `${CACHE_TAGS.BASE_ITENS}-${tableName}` as CacheTag;
    addCacheSettings(tag);

    return db.all(query);
};
export const getBaseItens = async (tableName: Tables, data: ArgsItens) => {
    const { id, limit, name, offset } = data;

    let query = `
        SELECT 
            *
        FROM ${tableName}
        $WHERE
        LIMIT ?
        ${offset ? "OFFSET ?" : ""}`;

    const where = [];
    const whereList = [];
    if (id?.length) {
        where.push(`id IN (${toQueryString(id)})`);
        whereList.push(...id);
    }
    if (name) {
        name.trim()
            .split(" ")
            .forEach((texto) => {
                where.push(`name LIKE ?`);
                whereList.push(`%${normalizeText(texto)}%`);
            });
    }
    whereList.push(limit || DEFAULT_LIMIT);
    if (offset) whereList.push(offset);

    if (where.length) query = query.replace("$WHERE", `WHERE ${where.join(" AND ")}`);
    else query = query.replace("$WHERE", "");

    try {
        if (!whereList.length) return await getBaseItensCache(query, tableName);
        return await db.all(query, whereList);
    } catch (err: any) {
        throw new Error("Houve um erro ao pegar dados " + err.message);
    }
};

export const getBaseItensById = async (tableName: Tables, id: string) => {
    try {
        const result = db.get(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
        return result;
    } catch (err: any) {
        throw new Error("Houve um erro ao pesquisar dados " + err.message);
    }
};
export const getBaseItensByContenId = async (tableName: Tables, contentIds: string[]) => {
    return await db.all(
        `
        SELECT
            ctn.content_id as id,
            json_group_array(json_object('id', t.id, 'name', t.name)) as list
        FROM
            content_${tableName} ctn
        INNER JOIN ${tableName} t ON t.id = ctn.${tableName}_id
        WHERE ctn.content_id IN (${toQueryString(contentIds)})
        GROUP BY ctn.content_id`,
        contentIds,
    );
};

export const addBaseItensToContent = async (tableName: Tables, data: ItensToContentData) => {
    const { contentId } = data;
    const itemIds = data[`${tableName}sIds`]!;

    try {
        const { changes } = await db.run(
            `INSERT OR IGNORE INTO content_${tableName}
             VALUES
             ${itemIds.map(() => "(?, ?)").join(", ")};
                `,
            itemIds.flatMap((v) => [v, contentId]),
        );

        const hasUpdate = changes && changes > 0;
        if (!hasUpdate) return;

        const response = await getBaseItens(tableName, { id: itemIds });
        return response;
    } catch (err: any) {
        throw new Error("Houve um erro ao adicionar " + err.message);
    }
};

export const removeBaseItensFromContent = async (tableName: Tables, data: ItensToContentData) => {
    const { contentId } = data;
    const itensId = data[`${tableName}sIds`]!;

    try {
        const { changes } = await db.run(
            `
                DELETE FROM content_${tableName}
                WHERE ${tableName}_id IN (${toQueryString(itensId)})
                AND content_id = ?;
            `,
            [...itensId, contentId],
        );
        return changes && changes > 0;
    } catch (err: any) {
        throw new Error("Houve um erro ao deletar " + err.message);
    }
};
export const removeBaseItensFromContentById = async (taleName: Tables, itemId: string, contentId: string) => {
    try {
        const { changes } = await db.run(
            `DELETE FROM content_${taleName} WHERE ${taleName}_id = ? AND content_id = ?`,
            [itemId, contentId],
        );

        return changes && changes > 0;
    } catch (err: any) {
        throw new Error("Houve um erro ao deletar " + err.message);
    }
};

export const getContentItemBaseItens = async (tableName: Tables, itemId: string, contentId: string) => {
    try {
        const result = await db.get(`SELECT * FROM content_${tableName} WHERE content_id = ? AND ${tableName}_id = ?`, [
            contentId,
            itemId,
        ]);

        return result;
    } catch (err: any) {
        throw new Error("Houve um erro ao pegar item " + err.message);
    }
};
