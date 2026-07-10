export const typeDefs = `#graphql
enum ContentType{
    SERIE
    MOVIE
}
enum Classification{
    LIVRE
    IDADE_6
    IDADE_10
    IDADE_12
    IDADE_14
    IDADE_16
    IDADE_18
}


# Itens
type Genre{
    id: ID!
    name: String!
}
input GenreAddInp{
    name: String!
}
input GenreUpdInp{
    id: ID!
    name: String!
}

type Creator{
    id: ID!
    name: String!
}
input CreatorAddInp{
    name: String!
}
input CreatorUpdInp{
    id: ID!
    name: String!
}

type Cast{
    id: ID!
    name: String!
}
input CastAddInp{
    name: String!
}
input CastUpdInp{
    id: ID!
    name: String!
}


# Content
type Description {
    short: String!
    full: String!
}
input DescriptionAddInp{
    short:String!
    full:String!
}
input DescriptionUpdInp{
    short:String
    full:String
}

type Banner {
    horizontal: String!
    vertical: String!
}
input BannerAddInp{
    horizontal:String!
    vertical:String!
}
input BannerUpdInp{
    horizontal:String
    vertical:String
}

interface ContentBase{
    id:ID!
    type:ContentType!
    title:String!
    year:Int!
    trailer:String!
    description:Description!
    banner:Banner!
    genres:[Genre!]!
    cast:[Cast!]!
    creators:[Creator!]!
    classification:Classification!
}

# Serie

type Episode{
    id:ID!
    key: String!
    title:String!
    description: String!
    duration_minutes:Int!
    year:Int!
    image:String!
    number:Int!
}
input EpisodeAddInp{
    key:String
    title:String!
    description: String!
    number:Int!
    duration_minutes:Int!
    year:Int!
    image:String!
}
input EpisodeRegisterInp{
    key:String!
    title:String!
    description: String!
    number:Int!
    duration_minutes:Int!
    year:Int!
    image:String!
    season_id:ID!
}
input EpisodeUpdInp{
    id:ID!
    title:String
    description: String
    duration_minutes:Int
    year:Int
    image:String
    number:Int
}

type Season{
    id:ID!
    title:String!
    number:Int!

    episodes(ids:[ID!], numbers:[Int!]):[Episode!]!

}
input SeasonAddInp{
    title:String!
    number:Int!
    episodes:[EpisodeAddInp!]!
}
input SeasonRegisterInp{
    content_id:ID!
    title:String!
    number:Int!
    episodes:[EpisodeAddInp!]!
}
input SeasonUpdInp{
    id:ID!
    title:String
    number:Int
}

type SerieData{
    total_season:Int!
    total_episode: Int!
    seasons(seasonsIds:[ID!], limit:Int, offset:Int): [Season!]!
}
input SerieDataAddInp{
    seasons: [SeasonAddInp!]!
}

type Serie implements ContentBase{
    serieData: SerieData!
    id:ID!
    title:String!
    year:Int!
    trailer:String!
    description:Description!
    banner:Banner!
    genres:[Genre!]!
    cast:[Cast!]!
    creators:[Creator!]!
    classification:Classification!
    type:ContentType!

}
input SerieAddInp{
    serieData: SerieDataAddInp!
    title:String!
    year:Int!
    trailer:String!
    description:DescriptionAddInp!
    banner:BannerAddInp!
    genres:[ID!]!
    cast:[ID!]
    creators:[ID!]
    classification:Classification!

}
input SerieUpdInp{
    id:ID!
    title:String
    year:Int
    trailer:String
    description:DescriptionUpdInp
    banner:BannerUpdInp
    classification:Classification
}

# Movie

type MovieData{
    duration_minutes: Int!
}
input MovieDataInp{
    duration_minutes: Int!
}

type Movie implements ContentBase{
    movieData:MovieData!

    id:ID!
    title:String!
    year:Int!
    trailer:String!
    description:Description!
    banner:Banner!
    genres:[Genre!]!
    cast:[Cast!]!
    creators:[Creator!]!
    classification:Classification!
    type:ContentType!
}
input MovieAddInp{
    title:String!
    year:Int!
    trailer:String!
    description:DescriptionAddInp!
    banner:BannerAddInp!
    classification:Classification!
    movieData:MovieDataInp!
    cast:[ID!]!
    creators:[ID!]!
    genres:[ID!]!
}
input MovieUpdInp{
    id:ID!
    title:String
    year:Int
    trailer:String
    description:DescriptionUpdInp
    banner:BannerUpdInp
    classification:Classification
    movieData:MovieDataInp
}

type ExistingRelation{
    message:String!
}

# Query

type Query{
    catalog(
    id:[ID!],
    title:String,
    year:[Int!],
    genre:[ID!],
    description:String,
    cast:[ID!],
    creator:[ID!],
    classification:Classification,
    limit:Int
    offset: Int): [ContentBase]!

    genres(
        id:[ID!],
        name:[String!],
        limit: Int
        offset: Int): [Genre!]
    creators(
        id:[ID!],
        name:String,
        limit: Int
        offset: Int): [Creator!]
    cast(
        id:[ID!],
        name:[String!],
        limit: Int
        offset: Int): [Cast!]
    
}

type Mutation{
    registerGenres(data:[GenreAddInp!]!):[Genre!]!
    registerCasts(data:[CastAddInp!]!):[Cast!]!
    registerCreators(data:[CreatorAddInp!]!):[Creator!]!
    deleteGenre(genreId: ID!):Boolean!
    deleteCast(castId: ID!):Boolean!
    deleteCreator(creatorId: ID!):Boolean!
    updateGenre(data: GenreUpdInp!):Genre!
    updateCast(data: CastUpdInp!):Cast!
    updateCreator(data: CreatorUpdInp!):Creator!


    registerMovie(data:MovieAddInp!):Movie!
    registerSerie(data: SerieAddInp!):Serie!
    registerEpisode(data: EpisodeRegisterInp!):Episode!
    registerSeason(data: SeasonRegisterInp!):Season!
    deleteMovie(contentId:ID!):Boolean!
    deleteSerie(contentId:ID!):Boolean!
    deleteEpisode(episodeId:ID!):Boolean!
    deleteSeason(seasonId:ID!):Boolean!


    updateMovie(data:MovieUpdInp!):Movie!
    updateSerie(data:SerieUpdInp!):Serie!
    updateSeason(data:SeasonUpdInp!): Season!
    updateEpisode(data:EpisodeUpdInp!): Episode!


    addGenreToContent(contentId:ID!, genresIds:[ID!]!): [Genre!]!
    addCastToContent(contentId:ID!, castsIds:[ID!]!): [Cast!]!
    addCreatorToContent(contentId:ID!, creatorsIds:[ID!]!): [Creator!]!
    removeGenreFromContent(contentId:ID!, genresIds:[ID!]!): Boolean!
    removeCastFromContent(contentId:ID!, castsIds:[ID!]!): Boolean!
    removeCreatorFromContent(contentId:ID!, creatorsIds:[ID!]!): Boolean!
}

`;
