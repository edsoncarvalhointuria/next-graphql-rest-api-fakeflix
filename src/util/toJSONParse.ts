export const toJSONParse = <T>(obj: T, key: keyof T) => {
    if (typeof obj[key] === "string") return JSON.parse(obj[key]);
    return obj[key];
};
