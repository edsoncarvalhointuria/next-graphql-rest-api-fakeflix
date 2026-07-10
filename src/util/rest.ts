export function parseRestContent(obj: any) {
    return {
        cast: JSON.parse(obj.cast),
        creators: JSON.parse(obj.creators),
        genres: JSON.parse(obj.genres),
        banner: JSON.parse(obj.banner),
        description: JSON.parse(obj.description),
    };
}
