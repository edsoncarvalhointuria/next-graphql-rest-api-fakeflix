export const CACHE_TAGS = {
    CATALOG_GQL: "catalog-graphql",
    CATALOG_REST: "catalog-rest",

    BASE_ITENS: "base-itens",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];
