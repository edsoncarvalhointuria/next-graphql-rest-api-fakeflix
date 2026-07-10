import { CLASSIFICATIONS, contentItemTables } from "@/constants/content";
import z from "zod";
import { registry } from "./openapi_schemas";
import { DEFAULT_LIMIT } from "@/constants/limit";

export const schemaId = z.object({
    id: z.uuidv4("ID Inválido").openapi({
        description: "Identificador único (UUID).",
    }),
});
export const schemaLimitOffset = z.object({
    limit: z.coerce
        .number("O paramêtro limit está inválido. Ex: ?limit=1")
        .optional()
        .openapi({
            description: "Define a quantidade máxima de registros retornados na consulta.",
            example: 2,
        })
        .default(DEFAULT_LIMIT),
    offset: z.coerce.number("O paramêtro offset está inválido. Ex: ?offset=1").optional().openapi({
        description: "Define a quantidade de registros que serão ignorados antes do início da consulta.",
        example: 1,
    }),
});
export const schemaLimitOffsetSeason = z.object({
    limitSeason: z.coerce
        .number("O paramêtro limitSeason está inválido. Ex: ?limitSeason=1")
        .optional()
        .openapi({
            description: "Define a quantidade máxima de temporadas retornadas na consulta.",
            example: 2,
        })
        .default(DEFAULT_LIMIT),
    offsetSeason: z.coerce.number("O paramêtro offsetSeason está inválido. Ex: ?offsetSeason=1").optional().openapi({
        description: "Define a quantidade de temporadas que serão ignorados antes do início da consulta.",
        example: 1,
    }),
});
export const schemaLimitOffsetId = schemaLimitOffset.extend({
    id: z.array(z.uuidv4("O parâmetro id está inválido")).optional().openapi({
        description: "Filtra a consulta por um ou mais identificadores (UUID).",
    }),
});
export const schemaEpisodeId = z.object({
    episodeId: z
        .array(
            z
                .uuidv4("O paramêtro episodeId está inválido. Ex: ?episodeId=4b326463-05af-494b-9db1-52638918ba59")
                .openapi({ description: "Id do episódio", example: "4b326463-05af-494b-9db1-52638918ba59" }),
        )
        .optional(),
});
export const schemaNumbersEpisodesId = schemaEpisodeId
    .extend({
        number: z.array(
            z.coerce
                .number("O paramêtro number está inválido. Ex: ?number=1")
                .openapi({ description: "Número do episódio", example: 1 }),
        ),
    })
    .partial();

//Itens
export const schemaSearchParamsItens = registry.register(
    "SearchParamsItens",
    schemaLimitOffsetId.extend({
        name: z.string().optional().openapi({
            description: "Filtra os resultados pelo nome do item.",
        }),
    }),
);
export const schemaItem = z.object(
    { name: z.string().min(1).openapi({ description: "Nome do item." }) },
    "Você deve enviar o objeto com o nome. Ex: {name:'nome'}",
);
export const schemaRegisterItens = z
    .array(schemaItem.strict(), "Você deve enviar um array com os nomes. Ex: [{name:'nome'}]")
    .min(1, "Array Vazio")
    .openapi({ description: "Lista de nomes." });

export const schemaCreators = z
    .array(
        z.uuidv4("Id do criador inválido").openapi({
            description: "Identificador único (UUID) do criador.",
            example: "23fc8bce-13fa-4ef1-9993-3fa8a1408adf",
        }),
        "Os criadores devem ser enviados em uma array com os ids. Ex: creators: ['id1', 'id2']",
    )
    .min(1, "Sem nenhum criador")
    .openapi({
        description: "Lista de identificadores (UUID) dos criadores associados ao conteúdo.",
    });
export const schemaCast = z
    .array(
        z.uuidv4("Id cast inválido").openapi({
            description: "Identificador único (UUID) do elenco.",
            example: "c54e6010-b5e8-4216-9a64-73fd8b433972",
        }),
        "O elenco deve ser enviados em uma array com os ids. Ex: cast: ['id1', 'id2']",
    )
    .min(1, "Sem nenhum elenco")
    .openapi({
        description: "Lista de identificadores (UUID) do elenco associado ao conteúdo.",
    });
export const schemaGenres = z
    .array(
        z.uuidv4("Id genre inválido").openapi({
            description: "Identificador único (UUID) do gênero.",
            example: "c204a7ce-10a4-4bd2-9797-e17b81fe2f55",
        }),
        "Os gêneros devem ser enviados em uma array com os ids. Ex: genres: ['id1', 'id2']",
    )
    .min(1, "Sem nenhum gênero")
    .openapi({
        description: "Lista de identificadores (UUID) dos gêneros associados ao conteúdo.",
    });

//Content
export const schemaBanner = z
    .object(
        {
            vertical: z.url("Link do banner vertical inválido. Ex: vertical:'https//...'").openapi({
                description: "URL da imagem do banner na orientação vertical.",
                example:
                    "https://res.cloudinary.com/dbjobat5r/image/upload/v1767715242/Cr%C3%B4nicas_Estelares_Vertical_kkrct5.png",
            }),
            horizontal: z.url("Link do banner horizontal inválido. Ex: horizontal:'https//...'").openapi({
                description: "URL da imagem do banner na orientação horizontal.",
                example:
                    "https://res.cloudinary.com/dbjobat5r/image/upload/v1767715241/Cr%C3%B4nicas_Estelares_Horizontal_dpdcpw.png",
            }),
        },
        "O banner está inválido. Ex: banner:{vertical:'https//...', horizontal:'https//...'}",
    )
    .openapi({
        description: "Informações das imagens de banner utilizadas pelo conteúdo.",
    });
export const schemaDescription = z
    .object(
        {
            short: z.string("A descrição curta está inválida. Ex: short:'descrição'").openapi({
                description: "Descrição resumida do conteúdo.",
                example:
                    "Um jovem fazendeiro espacial descobre seu legado místico e se une a rebeldes para destruir uma superarma capaz de vaporizar planetas.",
            }),
            full: z.string("A descrição completa está inválida. Ex: full:'descrição'").openapi({
                description: "Descrição completa do conteúdo.",
                example:
                    "Há muito tempo, em uma galáxia não tão distante, o Império Sombrio constrói a 'Esfera do Juízo', uma estação espacial do tamanho de uma lua. Luke Andarilho, um garoto do deserto, encontra dois droides fugitivos e um velho mestre que lhe ensina os caminhos da 'Energia Cósmica'. Junto com um contrabandista charmoso e uma princesa guerreira, eles devem entregar os planos da estação para a Aliança Rebelde antes que a liberdade na galáxia seja extinta para sempre.",
            }),
        },
        "A descrição está inválida. Ex: description:{short:'texto', full:'texto'}",
    )
    .openapi({
        description: "Descrições resumida e completa do conteúdo.",
    });
export const schemaContentBase = z.object({
    title: z.string("O título está inválido. Ex: title:'Título'").openapi({
        description: "Título do conteúdo.",
        example: "Ecos do Coração",
    }),
    year: z.number("O ano está inválido. Ex: year:2000").openapi({
        description: "Ano de lançamento do conteúdo.",
        example: 2025,
    }),
    trailer: z.url("Link do trailer inválido. Ex: trailer:'https//...'").openapi({
        description: "URL do trailer do conteúdo.",
        example:
            "https://res.cloudinary.com/dbjobat5r/video/upload/v1767649560/Ecos_do_Cora%C3%A7%C3%A3o_Trailer_dwpm6i.mp4",
    }),
    description: schemaDescription,
    banner: schemaBanner,
    classification: z
        .enum(CLASSIFICATIONS, `A classificação só pode ser: ${CLASSIFICATIONS.join(", ")}. Ex: classification:'LIVRE'`)
        .openapi({
            description: "Classificação indicativa do conteúdo.",
            example: "14",
        }),
});

export const schemaContenItemAddParams = schemaId.extend({
    table: z
        .enum(
            contentItemTables,
            `Tabela da url inválida. As tabelas aceitas são: ${contentItemTables.join(", ")}, season.`,
        )
        .openapi({
            description: "Tabela na qual o item será adicionado ou alterado.",
            example: "genre",
        }),
});
export const schemaContenItemAlterParams = schemaContenItemAddParams.extend({
    itemId: z.uuidv4("Id Inválido").openapi({
        description: "Identificador (UUID) do item relacionado.",
        example: "c204a7ce-10a4-4bd2-9797-e17b81fe2f55",
    }),
});

//Serie
export const schemaEpisode = registry.register(
    "RegisterEpisode",
    z
        .object({
            title: z.string("O título está inválido. Ex: title:'Título'").openapi({
                description: "Título do episódio.",
                example: "O Começo",
            }),
            key: z.string().optional().openapi({
                description: "Chave utilizada para identificar o episódio no armazenamento ou player.",
                example: "s1e1",
            }),
            description: z.string("A descrição está inválida. Ex: description:'Descrição'").openapi({
                description: "Descrição do episódio.",
                example: "O protagonista inicia sua jornada.",
            }),
            duration_minutes: z.number("Duração do episódio inválida. Ex: duration_minutes:10").openapi({
                description: "Duração do episódio em minutos.",
                example: 42,
            }),
            year: z.number("O ano está inválido. Ex: year:2000").openapi({
                description: "Ano de lançamento do episódio.",
                example: 2025,
            }),
            image: z.url("Link da imagem do episódio inválido. Ex: image:'https//...'").openapi({
                description: "URL da imagem de capa do episódio.",
                example:
                    "https://res.cloudinary.com/dbjobat5r/image/upload/v1767736242/Cora%C3%A7%C3%B5es_de_Seda_2E2_1_auvixl.png",
            }),
            number: z.number("Número do episódio inválido. Ex: number:1").openapi({
                description: "Número do episódio na temporada.",
                example: 1,
            }),
        })
        .openapi({ description: "Dados de um episódio da série." }),
);
export const schemaSeason = registry.register(
    "RegisterSeason",
    z
        .object({
            title: z.string("O título está inválido. Ex: title:'Título'").openapi({
                description: "Título da temporada.",
                example: "Temporada 1: O Baile de Máscaras",
            }),
            number: z.number("Número da temporada está inválido. Ex: number:1").openapi({
                description: "Número da temporada.",
                example: 1,
            }),
            episodes: z
                .array(schemaEpisode, "Os episódios devem vir em um array. Ex: episodes:[{...}]")
                .min(1, "Sem nenhum episódio")
                .openapi({
                    description: "Lista de episódios pertencentes à temporada.",
                }),
        })
        .openapi({ description: "Dados de uma temporada da série." }),
);
export const schemaSeasonSummary = schemaSeason
    .extend({
        total_episode: z.number().openapi({
            description: "Número total de episódios da temporada.",
            example: 10,
        }),
    })
    .omit({ episodes: true });
export const schemaSerieDataSummary = z.object({
    total_season: z.number().openapi({ description: "Total de temporadas da série.", example: 2 }),
    total_episode: z.number().openapi({ description: "Total de episódios da série", example: 2 }),
});
export const schemaSerieDataDetail = z.object(
    {
        seasons: z
            .array(schemaSeason, "As temporadas devem ser enviadas em um array. Ex: seasons:[{...}]")
            .min(1, "Sem nenhuma temporada")
            .openapi({ description: "Lista de temporadas" }),
    },
    "Serie Data está inválido, ele deve conter as temporadas. Ex: serieData:{seasons:[{...}]}",
);

export const schemaSerie = registry.register(
    "RegisterSerie",
    schemaContentBase.extend({
        serieData: schemaSerieDataDetail,
        creators: schemaCreators,
        cast: schemaCast,
        genres: schemaGenres,
    }),
);

// Movie
export const schemaMovieData = z
    .object(
        {
            duration_minutes: z.number("A duração do filme está inválida. Ex: duration_minutes:10").openapi({
                description: "Duração do filme em minutos.",
                example: 120,
            }),
        },
        "O Movie Data está inválido. Ex: movieData:{duration_minutes:10}",
    )
    .openapi({ description: "Informações específicas de um filme." });
export const schemaMovie = registry.register(
    "RegisterMovie",
    schemaContentBase.extend({
        movieData: schemaMovieData,
        creators: schemaCreators,
        cast: schemaCast,
        genres: schemaGenres,
    }),
);
// CATALOG
export const schemaCatalogParams = registry.register(
    "SearchParamsCatalog",
    z
        .object({
            id: z
                .array(
                    z
                        .uuidv4("O id do filme/série está inválido. Ex: ?id=fdd516b6-f30c-4c38-91a4-30652d5c70a8")
                        .openapi({
                            description: "Filtra a consulta por um ou mais ids (UUID).",
                            example: "fdd516b6-f30c-4c38-91a4-30652d5c70a8",
                        }),
                )
                .openapi({ description: "Lista de ids", example: "fdd516b6-f30c-4c38-91a4-30652d5c70a8" }),
            year: z
                .preprocess(
                    (v) => (Array.isArray(v) ? v.map((v) => Number(v)) : [Number(v)]),
                    z.array(
                        z.number("O ano está inválido. Ex: ?year=2024").openapi({
                            description: "Filtra os resultados por um ou mais anos de lançamento",
                            example: 2024,
                        }),
                    ),
                )
                .openapi({ description: "Lista de anos", example: 2024 }),
            genre: z
                .array(
                    z.uuidv4("O gênero está inválido. Ex: ?genre=c204a7ce-10a4-4bd2-9797-e17b81fe2f55").openapi({
                        description: "Filtra os resultados por um ou mais gêneros.",
                        example: "c204a7ce-10a4-4bd2-9797-e17b81fe2f55",
                    }),
                )
                .openapi({ description: "Lista de ids do gênero", example: "c204a7ce-10a4-4bd2-9797-e17b81fe2f55" }),
            cast: z
                .array(
                    z.uuidv4("Id do elenco está inválido. Ex: ?cast=c54e6010-b5e8-4216-9a64-73fd8b433972").openapi({
                        description: "Filtra os resultados por um ou mais integrantes do elenco.",
                        example: "c54e6010-b5e8-4216-9a64-73fd8b433972",
                    }),
                )
                .openapi({
                    description: "Lista de ids de integrantes do elenco",
                    example: "c54e6010-b5e8-4216-9a64-73fd8b433972",
                }),
            creator: z
                .array(
                    z.uuidv4("Id do criador está inválido. Ex: ?creator=23fc8bce-13fa-4ef1-9993-3fa8a1408adf").openapi({
                        description: "Filtra os resultados por um ou mais criadores.",
                        example: "23fc8bce-13fa-4ef1-9993-3fa8a1408adf",
                    }),
                )
                .openapi({
                    description: "Lista de ids dos criadores",
                    example: "23fc8bce-13fa-4ef1-9993-3fa8a1408adf",
                }),
            title: z.preprocess(
                (v) => (Array.isArray(v) ? v[0] : v),
                z
                    .string("O título inválido. Ex: ?title=titulo")
                    .openapi({ description: "Filtra os resultados por título do conteúdo.", example: "Neon Noir" }),
            ),
            description: z.preprocess(
                (v) => (Array.isArray(v) ? v[0] : v),
                z.string("A descrição inválida. Ex: ?description=descricao").openapi({
                    description: "Filtra os resultados por texto presente na descrição do conteúdo.",
                    example: "em uma",
                }),
            ),
            classification: z
                .array(
                    z
                        .enum(
                            CLASSIFICATIONS,
                            `Classificação inválida, os tipos aceitos são: ${CLASSIFICATIONS.join(", ")}.`,
                        )
                        .openapi({
                            description: "Filtra os resultados por uma ou mais classificações indicativas.",
                            example: "LIVRE",
                        }),
                )
                .openapi({ description: "Lista de classificações", example: "LIVRE" }),
            limit: z.preprocess(
                (v) => Number(Array.isArray(v) ? v[0] : v),
                z.number("O limit inválido. Ex: ?limit=1").openapi({
                    description: "Define a quantidade máxima de registros retornados na consulta.",
                    example: 2,
                    default: DEFAULT_LIMIT,
                }),
            ),
            offset: z.preprocess(
                (v) => Number(Array.isArray(v) ? v[0] : v),
                z.number("O offset está inválido. Ex: ?offset=1").openapi({
                    description: "Define a quantidade de registros que serão ignorados antes do início da consulta.",
                    example: 2,
                }),
            ),
        })
        .partial(),
);

//Functions
export const zodUpdate = (zodObject: z.ZodObject<any>) =>
    zodObject
        .partial()
        .refine(
            (v) => Object.values(v).find((v) => !!v),
            "Não foi encontrada nenhuma das propriedades necessárias para atualização.",
        );
export const schemaDinamicId = (key: string) =>
    z.object({
        [key]: z
            .array(
                z.uuidv4(`O id está inválido. EX: {${key}:['id1', id2]}`),
                `Os ids devem ser enviados em um array. Ex: ${key}:['id1', id2]`,
            )
            .min(1, "O array está vazio"),
    });

// RETURNS
const schemaLinkHal = z.object({
    href: z.url().openapi({ description: "URL relacionada à resposta.", example: "https://api.exemplo.com/items" }),
    method: z.string().openapi({ description: "Método HTTP utilizado para acessar o recurso.", example: "GET" }),
});
export const schemaLinksHal = registry.register(
    "DefaultLinksHATEOS",
    z.object({
        self: schemaLinkHal,
        update: schemaLinkHal.extend({ method: schemaLinkHal.shape.method.openapi({ example: ["POST", "PUT"] }) }),
        delete: schemaLinkHal.extend({ method: schemaLinkHal.shape.method.openapi({ example: "DELETE" }) }),
        post: schemaLinkHal.extend({ method: schemaLinkHal.shape.method.openapi({ example: "POST" }) }),
    }),
);
export const schemaReturnBase = z.object({
    success: z
        .boolean()
        .openapi({ description: "Indica se a operação foi realizada com sucesso", example: true, "x-order": 1 }),
    _links: z.object({ self: schemaLinkHal }).openapi({ description: "Link para o próprio recurso." }),
});
export const schemaReturnDelete = z.object({
    success: z.boolean().openapi({ description: "Indica se a operação foi realizada com sucesso.", example: true }),
    message: z.string().openapi({
        description: "Mensagem descrevendo o resultado da operação.",
        example: "Item deletado com sucesso",
    }),
    _links: z.object({ collection: schemaLinkHal }).openapi({ description: "Link para a coleção do recurso." }),
});
export const schemaReturnItem = registry
    .register("ResponseItens", schemaId.extend({ name: z.string().openapi({ description: "Nome do Item" }) }))
    .openapi({ description: "Lista de itens" });
export const schemaCatalogReturn = z.array(
    schemaContentBase.extend({
        id: z.uuidv4().openapi({ description: "Id do conteúdo", example: "fdd516b6-f30c-4c38-91a4-30652d5c70a8" }),
        type: z.enum(["MOVIE", "SERIE"]).openapi({ description: "Indica o tipo do conteúdo", example: "MOVIE" }),
        movieData: schemaMovieData.or(z.null()),
        serieData: schemaSerieDataSummary.or(z.null()),
        _links: schemaLinksHal,
    }),
);

export const schemaMoviesReturn = schemaContentBase
    .extend({
        id: z.uuidv4().openapi({ description: "Id do Filme", example: "fdd516b6-f30c-4c38-91a4-30652d5c70a8" }),
        movieData: schemaMovieData,
        type: z.enum(["MOVIE"]),
        _links: schemaLinksHal,
    })
    .openapi({ "x-order": 2 });
export const schemaSeriesReturn = schemaContentBase
    .extend({
        id: z.uuidv4().openapi({ description: "Id da Série", example: "6edd242a-28cd-4d66-958e-e70b2b9f31fb" }),
        serieData: schemaSerieDataSummary,
        type: z.enum(["SERIE"]),
        _links: schemaLinksHal,
    })
    .openapi({ "x-order": 2 });
export const schemaGenresReturn = registry.register(
    "ResponseGenres",
    z
        .array(
            z.object({
                id: z
                    .uuidv4()
                    .openapi({ description: "Id do gênero", example: "c204a7ce-10a4-4bd2-9797-e17b81fe2f55" }),
                name: z.string().openapi({ description: "Título do gênero", example: "Comédia" }),
                _links: schemaLinksHal,
            }),
        )
        .openapi({ description: "Lista de gêneros" }),
);
export const schemaCastReturn = registry.register(
    "ResponseCast",
    z
        .array(
            z.object({
                id: z.uuidv4().openapi({
                    description: "Id do integrante do elenco",
                    example: "c54e6010-b5e8-4216-9a64-73fd8b433972",
                }),
                name: z
                    .string()
                    .openapi({ description: "Nome do integrante do elenco", example: "Cameron Dias de Folga" }),
                _links: schemaLinksHal,
            }),
        )
        .openapi({ description: "Lista dos integrantes do elenco" }),
);
export const schemaCreatorsReturn = registry.register(
    "ResponseCreators",
    z
        .array(
            z.object({
                id: z
                    .uuidv4()
                    .openapi({ description: "Id do criador", example: "23fc8bce-13fa-4ef1-9993-3fa8a1408adf" }),
                name: z.string().openapi({ description: "Nome do criador", example: "Miazaki da Silva" }),
                _links: schemaLinksHal,
            }),
        )
        .openapi({ description: "Lista de criadores" }),
);

export const schemaMovieReturn = registry.register(
    "ResponseMovie",
    schemaContentBase
        .extend({
            id: z.uuidv4().openapi({ description: "Id do Filme", example: "fdd516b6-f30c-4c38-91a4-30652d5c70a8" }),
            movieData: schemaMovieData,
            type: z.enum(["MOVIE"]),
            creators: schemaCreatorsReturn,
            cast: schemaCastReturn,
            genres: schemaGenresReturn,
            _links: schemaLinksHal,
        })
        .openapi({ "x-order": 2 }),
);

export const schemaEpisodeReturn = registry.register(
    "ResponseEpisode",
    schemaEpisode.extend({
        id: z.uuidv4().openapi({ description: "Id do episódio", example: "4c6d361d-1bfd-4c03-9afd-f8079eb97317" }),
        _links: schemaLinksHal,
    }),
);
export const seasonReturn = registry.register(
    "ResponseSeason",
    schemaSeason
        .extend({
            id: z.uuidv4().openapi({ description: "Id da temporada", example: "418b841b-d163-4ce9-a886-7a5bbeaca914" }),
            _links: schemaLinksHal,
            episodes: z.array(schemaEpisodeReturn).openapi({ description: "lista de episódios" }),
        })
        .openapi({ "x-order": 2 }),
);
export const schemaSerieReturn = registry.register(
    "ResponseSerie",
    schemaContentBase
        .extend({
            id: z.uuidv4().openapi({ description: "Id da Série", example: "6edd242a-28cd-4d66-958e-e70b2b9f31fb" }),
            serieData: z.object({
                seasons: z.array(seasonReturn).openapi({ description: "Lista de temporadas" }),
            }),
            type: z.enum(["SERIE"]),
            creators: schemaCreatorsReturn,
            cast: schemaCastReturn,
            genres: schemaGenresReturn,
            _links: schemaLinksHal,
        })
        .openapi({ "x-order": 2 }),
);
