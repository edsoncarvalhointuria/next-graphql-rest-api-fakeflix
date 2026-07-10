import { CACHE_TAGS, CacheTag } from "@/constants/cacheTags";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

export const addCacheSettings = (tag: CacheTag) => {
    cacheTag(tag);
    cacheLife("hours");
};

export const updateTagCatologCQL = () => {
    revalidateTag(CACHE_TAGS.CATALOG_GQL, { expire: 0 });
};

export const updateTagCatalogRest = (tableName?: Tables) => {
    if (tableName && tableName !== "movie" && tableName !== "serie") return;
    revalidateTag(CACHE_TAGS.CATALOG_REST, { expire: 0 });
};

export const updateTagBaseItens = (tableName: Tables) => {
    const key = `${CACHE_TAGS.BASE_ITENS}-${tableName}`;
    revalidateTag(key, { expire: 0 });
};
