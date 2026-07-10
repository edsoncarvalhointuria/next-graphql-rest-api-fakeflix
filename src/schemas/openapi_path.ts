import { contentItemTables } from "@/constants/content";
import { registry } from "./openapi_schemas";
import {
    schemaCatalogParams,
    schemaCatalogReturn,
    schemaContenItemAddParams,
    schemaContenItemAlterParams,
    schemaContentBase,
    schemaEpisode,
    schemaEpisodeId,
    schemaEpisodeReturn,
    schemaId,
    schemaItem,
    schemaLimitOffset,
    schemaLimitOffsetSeason,
    schemaLinksHal,
    schemaMovie,
    schemaMovieReturn,
    schemaMoviesReturn,
    schemaNumbersEpisodesId,
    schemaRegisterItens,
    schemaReturnBase,
    schemaReturnDelete,
    schemaReturnItem,
    schemaSearchParamsItens,
    schemaSeason,
    schemaSeasonSummary,
    schemaSerie,
    schemaSerieDataDetail,
    schemaSerieReturn,
    schemaSeriesReturn,
    seasonReturn,
} from "./zod_schemas";
import z from "zod";

registry.registerPath({
    method: "get",
    path: "/catalog",
    summary: "Consultar catálogo",
    tags: ["Catálogo"],
    description:
        "Retorna os filmes e séries do catálogo em um formato resumido, otimizado para exibição em listagens. Apenas as informações essenciais são retornadas, garantindo consultas mais rápidas e respostas mais leves. Para obter os dados completos de um conteúdo, utilize o endpoint específico do recurso.",
    request: {
        query: schemaCatalogParams.partial(),
    },
    responses: {
        200: {
            description: "Lista de Séries e Filmes focados no frontend",
            content: {
                "application/json": {
                    schema: schemaReturnBase.extend({
                        response: schemaCatalogReturn.openapi({ "x-order": 2 }),
                        meta: schemaCatalogParams.partial(),
                    }),
                },
            },
        },
    },
});

const itens = {
    cast: {
        pluralName: "elencos",
        singularName: "elenco",
        exampleName: "Cameron Dias de Folga",
        exampleId: "c54e6010-b5e8-4216-9a64-73fd8b433972",
        tag: "Elenco",
    },
    creator: {
        pluralName: "criadores",
        singularName: "criador",
        exampleName: "Miazaki da Silva",
        exampleId: "23fc8bce-13fa-4ef1-9993-3fa8a1408adf",
        tag: "Criadores",
    },
    genre: {
        pluralName: "gêneros",
        singularName: "gênero",
        exampleName: "Comédia",
        exampleId: "c204a7ce-10a4-4bd2-9797-e17b81fe2f55",
        tag: "Gêneros",
    },
};
contentItemTables.map((v, i) => {
    const keyRoute = v === "cast" ? "cast" : v + "s";
    const schemaName = schemaItem.extend({ name: schemaItem.shape.name.openapi({ example: itens[v].exampleName }) });
    const schemaNameResponse = schemaReturnItem.extend({
        name: schemaReturnItem.shape.name.openapi({ example: itens[v].exampleName }),
        _links: schemaLinksHal,
    });
    const schemaParams = schemaSearchParamsItens.extend({
        id: schemaSearchParamsItens.shape.name.openapi({ example: itens[v].exampleId }),
        name: schemaSearchParamsItens.shape.name.openapi({ example: itens[v].exampleName }),
    });

    registry.registerPath({
        tags: [itens[v].tag],
        method: "get",
        path: `/${keyRoute}`,
        description: `Retorna uma lista com os ${itens[v].pluralName} cadastrados.`,
        summary: `Listar ${itens[v].pluralName}`,

        request: {
            query: schemaParams,
        },
        responses: {
            200: {
                description: "Itens encontrados",
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: z.array(schemaNameResponse).openapi({ "x-order": 2 }),
                            meta: schemaParams.partial(),
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        tags: [itens[v].tag],
        method: "post",
        path: `/${keyRoute}`,
        "x-order": i,
        summary: `Cadastrar ${itens[v].singularName}`,
        description: `Cadastra um ou mais ${v === "cast" ? "atores do elenco" : itens[v].pluralName}. Cada item deve conter as informações necessárias para seu cadastro. Os registros criados são retornados na resposta.`,
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: z.array(schemaName),
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Itens cadastrados",
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: z.array(schemaNameResponse).openapi({ "x-order": 2 }),
                        }),
                    },
                },
            },
        },
    });

    registry.registerPath({
        tags: [itens[v].tag],
        method: "get",
        path: `/${keyRoute}/{id}`,
        description: `Retorna os dados do ${itens[v].singularName} correspondente ao id informado.`,
        summary: `Buscar ${itens[v].singularName}`,
        "x-order": i,
        request: {
            params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: itens[v].exampleId }) }),
        },
        responses: {
            200: {
                description: "Item identificado",
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: schemaNameResponse.openapi({ "x-order": 2 }),
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        tags: [itens[v].tag],
        method: "put",
        path: `/${keyRoute}/{id}`,
        summary: `Substituir ${itens[v].singularName}`,
        description: `Substitui todas as informações do ${itens[v].singularName} identificado pelo id. Todos os campos obrigatórios devem ser enviados na requisição.`,
        "x-order": i,
        request: {
            params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: itens[v].exampleId }) }),
            body: { content: { "application/json": { schema: schemaName } } },
        },
        responses: {
            200: {
                description: "Item atualizado",
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({ response: schemaNameResponse.openapi({ "x-order": 2 }) }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        tags: [itens[v].tag],
        method: "patch",
        path: `/${keyRoute}/{id}`,
        summary: `Atualizar ${itens[v].singularName}`,
        description: `Atualiza parcialmente as informações do ${itens[v].singularName} identificado pelo id. Apenas os campos que deverão ser alterados precisam ser enviados na requisição.`,
        "x-order": i,
        request: {
            params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: itens[v].exampleId }) }),
            body: { content: { "application/json": { schema: schemaName.partial() } } },
        },
        responses: {
            200: {
                description: "Item atualizado",
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({ response: schemaNameResponse.openapi({ "x-order": 2 }) }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        tags: [itens[v].tag],
        method: "delete",
        path: `/${keyRoute}/{id}`,
        summary: `Excluir  ${itens[v].singularName}`,
        description: `Remove o ${itens[v].singularName} correspondente ao id.`,
        "x-order": i,
        request: {
            params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: itens[v].exampleId }) }),
        },
        responses: {
            200: {
                description: "Resultado da Operação",
                content: { "application/json": { schema: schemaReturnDelete } },
            },
        },
    });
});

const contents = {
    movie: {
        singularName: "Filme",
        pluralName: "Filmes",
        preposition: "do",
        exampleId: "fdd516b6-f30c-4c38-91a4-30652d5c70a8",
    },
    serie: {
        singularName: "Série",
        pluralName: "Séries",
        preposition: "da",
        exampleId: "6edd242a-28cd-4d66-958e-e70b2b9f31fb",
    },
};
(["movie", "serie"] as const).map((v) => {
    const returnContent = v === "movie" ? schemaMovieReturn : schemaSerieReturn;
    const id = schemaId.extend({ id: schemaId.shape.id.openapi({ example: contents[v].exampleId }) });

    registry.registerPath({
        method: "get",
        path: `/${v}`,
        summary: `Listar ${contents[v].pluralName}`,
        description: `Retorna ${contents[v].preposition.replace("d", "")}s ${contents[v].pluralName} cadastrados em um formato otimizado para listagens. A resposta contém apenas as informações essenciais de cada ${contents[v].singularName}, reduzindo o volume de dados trafegados e melhorando o desempenho da consulta. Para obter todas as informações de ${v === "movie" ? "um" : "uma"} ${contents[v].singularName}, utilize o endpoint \`/${v}/{id}\``,
        tags: [v === "movie" ? "Filmes" : "Séries"],
        request: {
            query: schemaLimitOffset.partial(),
        },
        responses: {
            200: {
                description: `Lista de ${contents[v].pluralName}`,
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: z
                                .array(v === "movie" ? schemaMoviesReturn : schemaSeriesReturn)
                                .openapi({ "x-order": 2 }),
                            meta: schemaLimitOffset,
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "post",
        path: `/${v}`,
        summary: `Cadastrar ${contents[v].singularName}`,
        description: `Cadastra um novo filme no catálogo utilizando as informações enviadas no corpo da requisição.`,
        tags: [v === "movie" ? "Filmes" : "Séries"],
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: v === "movie" ? schemaMovie : schemaSerie,
                    },
                },
            },
        },
        responses: {
            200: {
                description: `${contents[v].singularName} cadastrad${v === "movie" ? "o" : "a"}`,
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: returnContent,
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "get",
        path: `/${v}/{id}`,
        summary: `Buscar ${contents[v].singularName}`,
        description: `Retorna todas as informações ${contents[v].preposition} ${contents[v].singularName} correspondente ao id informado, incluindo seus dados completos e todos os relacionamentos associados.`,
        tags: [v === "movie" ? "Filmes" : "Séries"],
        request: {
            query: v === "movie" ? undefined : schemaLimitOffsetSeason,
            params: id,
        },
        responses: {
            200: {
                description: `${contents[v].singularName}}`,
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: returnContent,
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "put",
        path: `/${v}/{id}`,
        summary: `Substituir ${contents[v].singularName}`,
        description: `Substitui todas as informações ${contents[v].preposition} ${contents[v].singularName}. Todos os campos obrigatórios devem ser enviados na requisição.`,
        tags: [v === "movie" ? "Filmes" : "Séries"],

        request: {
            body: {
                content: {
                    "application/json": {
                        schema: schemaContentBase,
                    },
                },
            },
            params: id,
        },
        responses: {
            200: {
                description: "Item atualizado",
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: returnContent,
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "patch",
        path: `/${v}/{id}`,
        summary: `Atualizar ${contents[v].singularName}`,
        description: `Atualiza parcialmente as informações ${contents[v].preposition} ${contents[v].singularName}. Apenas os campos que deverão ser alterados precisam ser enviados na requisição.`,
        tags: [v === "movie" ? "Filmes" : "Séries"],
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: schemaContentBase.partial(),
                    },
                },
            },
            params: id,
        },
        responses: {
            200: {
                description: "Item atualizado",
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: returnContent,
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "delete",
        path: `/${v}/{id}`,
        summary: `Excluir ${contents[v].singularName}`,
        description: `Remove ${contents[v].preposition.replace("d", "")} ${contents[v].singularName} incluindo todos os relacionamentos associados ao recurso.`,
        tags: [v === "movie" ? "Filmes" : "Séries"],
        request: {
            params: id,
        },
        responses: {
            200: {
                description: "Resultado da Operação",
                content: { "application/json": { schema: schemaReturnDelete } },
            },
        },
    });

    if (v === "serie") {
        registry.registerPath({
            method: "get",
            path: `/${v}/{id}/season`,
            summary: `Temporadas da Série`,
            description: `Retorna todas as temporadas da série especificada no id`,
            tags: ["Séries", "Temporadas"],
            request: {
                params: id.extend({ id: id.shape.id.openapi({ description: "Identificador único (UUID) da série." }) }),
                query: schemaNumbersEpisodesId,
            },
            responses: {
                200: {
                    description: "Lista de Temporadas",
                    content: {
                        "application/json": {
                            schema: schemaReturnBase.extend({
                                response: z
                                    .array(seasonReturn)
                                    .openapi({ description: "Lista de temporadas", "x-order": 2 }),
                                meta: schemaNumbersEpisodesId,
                            }),
                        },
                    },
                },
            },
        });
        registry.registerPath({
            method: "post",
            path: `/${v}/{id}/season`,
            summary: `Adicionar Temporada`,
            description: `Adiciona uma nova temporada a série especificada no id`,
            tags: ["Séries", "Temporadas"],
            request: {
                params: id.extend({ id: id.shape.id.openapi({ description: "Identificador único (UUID) da série." }) }),
                body: {
                    content: {
                        "application/json": {
                            schema: schemaSeason,
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Lista de Temporadas",
                    content: {
                        "application/json": {
                            schema: schemaReturnBase.extend({
                                response: seasonReturn,
                                meta: schemaNumbersEpisodesId,
                            }),
                        },
                    },
                },
            },
        });
    }

    registry.registerPath({
        method: "get",
        path: `/${v}/{id}/{table}`,
        summary: `Listar relações ${contents[v].preposition} ${contents[v].singularName}`,
        description: `Retorna todos os gêneros, criadores ou integrantes do elenco relacionados ${v === "movie" ? "ao" : "a"} ${contents[v].singularName}, de acordo com a tabela informada no parâmetro table`,
        tags: [v === "movie" ? "Filmes" : "Séries", "Gêneros", "Criadores", "Elenco"],
        request: {
            params: schemaContenItemAddParams.extend({
                id: schemaContenItemAddParams.shape.id.openapi({ example: "b5a3f788-a95c-4c96-b5fb-cffc656f53f7" }),
            }),
        },
        responses: {
            200: {
                description: "Lista de itens",
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: z
                                .array(
                                    schemaReturnItem.extend({
                                        id: schemaReturnItem.shape.id.openapi({
                                            example: "c204a7ce-10a4-4bd2-9797-e17b81fe2f55",
                                        }),
                                        name: schemaReturnItem.shape.name.openapi({ example: "Comédia" }),
                                        _links: schemaLinksHal,
                                    }),
                                )
                                .openapi({ "x-order": 2 }),
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "post",
        path: `/${v}/{id}/{table}`,
        summary: `Vincular ${contents[v].singularName}`,
        description: `Cria um relacionamento entre ${contents[v].preposition.replace("d", "")} ${contents[v].singularName} e um gênero, criador ou integrante do elenco, conforme a tabela informada pelo parâmetro table.`,
        tags: [v === "movie" ? "Filmes" : "Séries", "Gêneros", "Criadores", "Elenco"],
        request: {
            params: schemaContenItemAddParams.extend({
                id: schemaContenItemAddParams.shape.id.openapi({ example: "b5a3f788-a95c-4c96-b5fb-cffc656f53f7" }),
            }),
        },
        responses: {
            200: {
                description: "Lista de itens",
                content: {
                    "application/json": {
                        schema: schemaReturnBase.extend({
                            response: schemaReturnItem
                                .extend({
                                    id: schemaReturnItem.shape.id.openapi({
                                        example: "c204a7ce-10a4-4bd2-9797-e17b81fe2f55",
                                    }),
                                    name: schemaReturnItem.shape.name.openapi({ example: "Comédia" }),
                                    _links: schemaLinksHal,
                                })

                                .openapi({ "x-order": 2 }),
                        }),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "get",
        path: `/${v}/{id}/{table}/{itemId}`,
        summary: `Buscar relacionamento ${contents[v].singularName}`,
        description: `Retorna o relacionamento entre ${contents[v].preposition.replace("d", "")} ${contents[v].singularName} e o gênero, criador ou integrante do elenco identificado pelo id, caso ele exista.`,
        tags: [v === "movie" ? "Filmes" : "Séries", "Gêneros", "Criadores", "Elenco"],
        request: {
            params: schemaContenItemAlterParams.extend({
                id: schemaContenItemAlterParams.shape.id.openapi({ example: "b5a3f788-a95c-4c96-b5fb-cffc656f53f7" }),
            }),
        },
        responses: {
            200: {
                description: "Relacionamento",
                content: {
                    "application/json": {
                        schema: z.union([
                            z.object({
                                genre_id: z.uuidv4().openapi({
                                    description: "Id do gênero",
                                    example: "c204a7ce-10a4-4bd2-9797-e17b81fe2f55",
                                }),
                                content_id: z.uuidv4().openapi({
                                    description: "Id do conteudo",
                                    example: "b5a3f788-a95c-4c96-b5fb-cffc656f53f7",
                                }),
                            }),
                            z.object({
                                cast_id: z.uuidv4().openapi({
                                    description: "Id do elenco",
                                    example: "c54e6010-b5e8-4216-9a64-73fd8b433972",
                                }),
                                content_id: z.uuidv4().openapi({
                                    description: "Id do conteudo",
                                    example: "b5a3f788-a95c-4c96-b5fb-cffc656f53f7",
                                }),
                            }),
                            z.object({
                                creator_id: z.uuidv4().openapi({
                                    description: "Id do criador",
                                    example: "23fc8bce-13fa-4ef1-9993-3fa8a1408adf",
                                }),
                                content_id: z.uuidv4().openapi({
                                    description: "Id do conteudo",
                                    example: "b5a3f788-a95c-4c96-b5fb-cffc656f53f7",
                                }),
                            }),
                        ]),
                    },
                },
            },
        },
    });
    registry.registerPath({
        method: "delete",
        path: `/${v}/{id}/{table}/{itemId}`,
        summary: `Desvincular ${contents[v].singularName}`,
        description: `Remove o relacionamento entre ${contents[v].preposition.replace("d", "")} ${contents[v].singularName} e o gênero, criador ou integrante do elenco informado. Esta operação remove apenas o vínculo entre os recursos, sem excluir o gênero, criador ou integrante do elenco do catálogo.`,
        tags: [v === "movie" ? "Filmes" : "Séries", "Gêneros", "Criadores", "Elenco"],
        request: {
            params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: contents[v].exampleId }) }),
        },
        responses: {
            200: {
                description: "Resultado da Operação",
                content: { "application/json": { schema: schemaReturnDelete } },
            },
        },
    });
});

const season = {
    exampleId: "418b841b-d163-4ce9-a886-7a5bbeaca914",
};
registry.registerPath({
    method: "get",
    path: `/season`,
    description: `Retorna uma lista com todas as temporadas cadastradas.`,
    summary: `Listar Temporadas`,
    tags: ["Temporadas"],
    request: {
        query: schemaLimitOffset,
    },
    responses: {
        200: {
            description: "Temporadas encontradas",
            content: {
                "application/json": {
                    schema: schemaReturnBase.extend({
                        response: z.array(schemaSeasonSummary).openapi({ "x-order": 2 }),
                        meta: schemaLimitOffset,
                    }),
                },
            },
        },
    },
});
registry.registerPath({
    method: "get",
    path: `/season/{id}`,
    description: `Retorna os dados da temporada correspondente ao id informado.`,
    tags: ["Temporadas"],
    summary: `Buscar Temporada`,
    request: {
        params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: season.exampleId }) }),
        query: schemaEpisodeId,
    },
    responses: {
        200: {
            description: "Temporada encontrada",
            content: {
                "application/json": {
                    schema: schemaReturnBase
                        .extend({
                            response: seasonReturn,
                            meta: schemaEpisodeId,
                        })
                        .openapi({ "x-order": 2 }),
                },
            },
        },
    },
});
registry.registerPath({
    method: "put",
    path: `/season/{id}`,
    summary: `Substituir Temporada`,
    description: `Substitui todas as informações da temporada, exceto dos episódios vinculados à ela. Para fazer alterações nos episódios, você deve ir em \´episode/id\``,
    tags: ["Temporadas"],
    request: {
        params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: season.exampleId }) }),
        body: { content: { "application/json": { schema: schemaSeason.omit({ episodes: true }) } } },
    },
    responses: {
        200: {
            description: "Temporada Atualizada",
            content: {
                "application/json": {
                    schema: seasonReturn,
                },
            },
        },
    },
});
registry.registerPath({
    method: "patch",
    path: `/season/{id}`,
    summary: `Atualizar Temporada`,
    description: `Atualiza parcialmente as informações da Temporada, exceto dos episódios vinculados à ela. Para fazer alterações nos episódios, você deve ir em \´episode/id\``,
    tags: ["Temporadas"],
    request: {
        params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: season.exampleId }) }),
        body: { content: { "application/json": { schema: schemaSeason.omit({ episodes: true }).partial() } } },
    },
    responses: {
        200: {
            description: "Temporada Atualizada",
            content: {
                "application/json": {
                    schema: seasonReturn,
                },
            },
        },
    },
});
registry.registerPath({
    method: "delete",
    path: `/season/{id}`,
    summary: `Excluir  Temporada`,
    description: `Remove a temporada correspondente ao id e todas as suas relações.`,
    tags: ["Temporadas"],
    request: {
        params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: season.exampleId }) }),
    },
    responses: {
        200: {
            description: "Resultado da Operação",
            content: { "application/json": { schema: schemaReturnDelete } },
        },
    },
});
registry.registerPath({
    method: "get",
    path: `/season/{id}/episode`,
    summary: `Adicionar Episódio`,
    description: `Lista todos os episódios vinculados a temporada.`,
    tags: ["Temporadas", "Episódios"],
    request: {
        query: schemaNumbersEpisodesId,
        params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: season.exampleId }) }),
    },
    responses: {
        200: {
            description: "Episódios Encontrados",
            content: {
                "application/json": {
                    schema: schemaReturnBase.extend({
                        response: z.array(schemaEpisodeReturn).openapi({ "x-order": 2 }),
                        meta: schemaNumbersEpisodesId,
                    }),
                },
            },
        },
    },
});
const episode = {
    exampleId: "4c6d361d-1bfd-4c03-9afd-f8079eb97317",
};
registry.registerPath({
    method: "get",
    path: `/episode`,
    description: `Retorna uma lista com todos os episódios cadastrados.`,
    summary: `Listar Episódios`,
    tags: ["Episódios"],
    request: {
        query: schemaLimitOffset,
    },
    responses: {
        200: {
            description: "Temporadas encontradas",
            content: {
                "application/json": {
                    schema: schemaReturnBase.extend({
                        response: z.array(schemaEpisodeReturn).openapi({ "x-order": 2 }),
                        meta: schemaLimitOffset,
                    }),
                },
            },
        },
    },
});
registry.registerPath({
    method: "get",
    path: `/episode/{id}`,
    description: `Retorna os dados do episódio correspondente ao id informado.`,
    tags: ["Episódios"],
    summary: `Buscar Episódio`,
    request: {
        params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: episode.exampleId }) }),
    },
    responses: {
        200: {
            description: "Episódio encontrado",
            content: {
                "application/json": {
                    schema: schemaReturnBase
                        .extend({
                            response: schemaEpisodeReturn,
                        })
                        .openapi({ "x-order": 2 }),
                },
            },
        },
    },
});
registry.registerPath({
    method: "put",
    path: `/episode/{id}`,
    summary: `Substituir Episódio`,
    description: `Substitui todas as informações do episódio identificado pelo id. Todos os campos obrigatórios devem ser enviados na requisição.`,
    tags: ["Episódios"],
    request: {
        params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: episode.exampleId }) }),
        body: { content: { "application/json": { schema: schemaEpisode } } },
    },
    responses: {
        200: {
            description: "Episódio Atualizado",
            content: {
                "application/json": {
                    schema: schemaEpisodeReturn,
                },
            },
        },
    },
});
registry.registerPath({
    method: "put",
    path: `/episode/{id}`,
    summary: `Atualizar Episódio`,
    description: `Atualiza parcialmente as informações do episódio identificado pelo id. Apenas os campos que deverão ser alterados precisam ser enviados na requisição.`,
    tags: ["Episódios"],
    request: {
        params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: episode.exampleId }) }),
        body: { content: { "application/json": { schema: schemaEpisode.partial() } } },
    },
    responses: {
        200: {
            description: "Episódio Atualizado",
            content: {
                "application/json": {
                    schema: schemaEpisodeReturn,
                },
            },
        },
    },
});
registry.registerPath({
    method: "delete",
    path: `/episode/{id}`,
    summary: `Excluir Episódio`,
    description: `Remove o episódio correspondente ao id.`,
    tags: ["Episódios"],
    request: {
        params: schemaId.extend({ id: schemaId.shape.id.openapi({ example: episode.exampleId }) }),
    },
    responses: {
        200: {
            description: "Resultado da Operação",
            content: { "application/json": { schema: schemaReturnDelete } },
        },
    },
});
