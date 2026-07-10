export const toQueryString = (list: any[]) => {
    return list.map((_) => "?").join(", ");
};
