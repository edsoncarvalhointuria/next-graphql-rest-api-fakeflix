type Tables =
    | "content"
    | "cast"
    | "content_cast"
    | "creator"
    | "content_creator"
    | "genre"
    | "content_genre"
    | "movie"
    | "serie"
    | "season"
    | "episode";
type TableId = `${Tables}Id`;
type TableIds = `${Tables}sIds`;
