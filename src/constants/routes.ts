import { contentItemTables } from "./content";

export const HAL_ROUTES = {
    update: {
        cast: (id: string) => `/cast/${id}`,
        genre: (id: string) => `/genres/${id}`,
        creator: (id: string) => `/creators/${id}`,
        content: (id: string) => ``,
        content_cast: (id: string) => ``,
        content_creator: (id: string) => ``,
        content_genre: (id: string) => ``,
        movie: (id: string) => `/movie/${id}`,
        serie: (id: string) => `/serie/${id}`,
        season: (id: string) => `/season/${id}`,
        episode: (id: string) => `/episode/${id}`,
    },
    delete: {
        cast: (id: string) => `/cast/${id}`,
        genre: (id: string) => `/genres/${id}`,
        creator: (id: string) => `/creators/${id}`,
        content: (id: string) => ``,
        content_cast: (type: Type, contentId: string, table: (typeof contentItemTables)[number], id: string) =>
            `/${type.toLocaleLowerCase()}/${contentId}/${table}/${id}`,
        content_creator: (type: Type, contentId: string, table: (typeof contentItemTables)[number], id: string) =>
            `/${type.toLocaleLowerCase()}/${contentId}/${table}/${id}`,
        content_genre: (type: Type, contentId: string, table: (typeof contentItemTables)[number], id: string) =>
            `/${type.toLocaleLowerCase()}/${contentId}/${table}/${id}`,
        movie: (id: string) => `/movie/${id}`,
        serie: (id: string) => `/serie/${id}`,
        season: (id: string) => `/season/${id}`,
        episode: (id: string) => `/episode/${id}`,
    },
    post: {
        cast: () => `/cast`,
        genre: () => `/genres`,
        creator: () => `/creators`,
        content: () => ``,
        content_cast: (type: Type, contentId: string, table: (typeof contentItemTables)[number]) =>
            `/${type.toLocaleLowerCase()}/${contentId}/${table}`,
        content_creator: (type: Type, contentId: string, table: (typeof contentItemTables)[number]) =>
            `/${type.toLocaleLowerCase()}/${contentId}/${table}`,
        content_genre: (type: Type, contentId: string, table: (typeof contentItemTables)[number]) =>
            `/${type.toLocaleLowerCase()}/${contentId}/${table}`,
        movie: () => `/movie`,
        serie: () => `/serie`,
        season: (serieId: string) => `/serie/${serieId}/season`,
        episode: (seasonId: string) => `/season/${seasonId}/episode`,
    },
} as const;
