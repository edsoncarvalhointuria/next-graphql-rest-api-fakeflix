interface ArgsItens {
    id?: string[];
    name?: string;
    limit?: number;
    offset?: number;
}
type DinamicId = { [k in TableId]?: string };
type DinamicIds = { [k in TableIds]?: string[] };
type ItensToContentData = {
    contentId: string;
} & DinamicIds;

interface CatalogQuerys {
    id?: string[];
    title?: string;
    year?: number[];
    genre?: string[];
    description?: string;
    cast?: string[];
    creator?: string[];
    classification?: Classification[];
    limit?: number;
    offset?: number;
}
