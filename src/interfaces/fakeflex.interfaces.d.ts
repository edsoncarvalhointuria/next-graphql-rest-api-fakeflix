type Type = "MOVIE" | "SERIE";

interface Item {
    id: string;
    name: string;
}

interface Description {
    short: string;
    full: string;
}
interface Banner {
    horizontal: string;
    vertical: string;
}

interface MovieData {
    duration_minutes: number;
}
interface Episode {
    id: string;
    season_id?: string;
    key: string;
    title: string;
    description: string;
    duration_minutes: number;
    year: number;
    image: string;
    number: number;
}
interface Season {
    id: string;
    title: string;
    number: number;
    episodes: Omit<Episode, "id">[];
    serie_id?: string;
}
interface SerieData {
    seasons: Season[];
    total_episode?: number;
    total_season?: number;
}
type Classification = "LIVRE" | "6" | "10" | "12" | "14" | "16" | "18";
type Genres =
    | "Romance"
    | "Drama"
    | "Música"
    | "Animação"
    | "Aventura"
    | "Fantasia"
    | "Mistério"
    | "Comédia"
    | "Ação"
    | "Ficção Científica"
    | "Anime"
    | "Escolar"
    | "Terror"
    | "Sobrenatural"
    | "Suspense"
    | "Psicológico"
    | "Cyberpunk"
    | "Família"
    | "Documentário"
    | "Natureza"
    | "Ciência"
    | "Crime Real"
    | "Esporte"
    | "Crime"
    | "Sitcom"
    | "Mockumentary"
    | "Policial"
    | "Isekai"
    | "Político"
    | "Dorama";

interface ContentBase {
    id: string;
    title: string;
    year: number;
    genres: Genres[];
    trailer: string;
    description: Description;
    banner: Banner;
    cast: string[];
    creators: string[];
    classification: Classification;
}

interface Serie extends ContentBase {
    type: "SERIE";
    serieData: SerieData;
}

interface Movie extends ContentBase {
    type: "MOVIE";
    movieData: MovieData;
}
