import {
    extendZodWithOpenApi,
    OpenApiGeneratorV3,
    OpenApiGeneratorV31,
    OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import z from "zod";

extendZodWithOpenApi(z);
export const registry = new OpenAPIRegistry();

export const documentOpenapi = () => {
    const document = new OpenApiGeneratorV3(registry.definitions);

    return document.generateDocument({
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "Fakeflix",
            description: `## 🎬 Fakeflix API

Bem-vindo à documentação oficial da **Fakeflix API**, uma API REST desenvolvida para gerenciar um catálogo de **filmes e séries fictícios**, incluindo banners, trailers, temporadas, episódios e relacionamentos entre os recursos.

### ✨ Destaques

- 🔗 **REST Maturity Level 3 (HATEOAS)**
- 🛡️ Tratamento de erros seguindo o padrão **RFC 7807**
- ✅ Validações centralizadas com **Zod**
- 📖 Documentação automática utilizando **OpenAPI**

### 🧪 Sandbox

O ambiente está configurado como uma **Sandbox**. Requisições **POST**, **PUT**, **PATCH** e **DELETE** executam todo o fluxo da aplicação e retornam as respostas esperadas, porém **nenhuma alteração é persistida**, permitindo testar a API com segurança.

### 🐙 GraphQL

Além da API REST, o projeto também possui uma camada **GraphQL**, oferecendo consultas flexíveis e evitando *overfetching* e *underfetching*.

👉 **Playground:** [/graphql](/graphql)

---

Explore as rotas utilizando o menu lateral e consulte os **Schemas** para conhecer todas as estruturas de requisição e resposta da API.`,
            contact: {
                email: "edsoncarvalhointuria@gmail.com",
                name: "Edson Carvalho Inturia",
                url: "https://edsoncarvalhointuria.github.io/portfolio/",
            },
        },
        servers: [{ url: "https://fakeflix-api.vercel.app/", description: "Server Versel" }],
        tags: [
            {
                name: "Catálogo",
                description: `Endpoint responsável pela consulta de todas as séries e filmes cadastrados.

As respostas são otimizadas para listagens, retornando apenas as informações essenciais de filmes e séries, proporcionando consultas mais rápidas e menor volume de dados trafegados.`,
            },
            {
                name: "Séries",
                description: `Endpoints responsáveis pelo gerenciamento das séries.

Permitem cadastrar, consultar, atualizar e remover séries, além de acessar seus detalhes completos, temporadas e relacionamentos com gêneros, criadores e elenco.`,
            },
            {
                name: "Filmes",
                description: `Endpoints responsáveis pelo gerenciamento dos filmes.

Permitem cadastrar, consultar, atualizar e remover filmes, além de acessar seus detalhes completos e gerenciar seus relacionamentos com gêneros, criadores e elenco.`,
            },
            {
                name: "Temporadas",
                description: `Endpoints responsáveis pelo gerenciamento das temporadas de uma série.

Permitem consultar, cadastrar, atualizar e remover temporadas, bem como acessar seus episódios.`,
            },
            {
                name: "Episódios",
                description: `Endpoints responsáveis pelo gerenciamento dos episódios de uma temporada.

Permitem consultar, cadastrar, atualizar e remover episódios, incluindo todas as informações relacionadas ao episódio.`,
            },
            {
                name: "Gêneros",
                description: `Endpoints responsáveis pelo gerenciamento dos gêneros disponíveis no catálogo.

Os gêneros podem ser utilizados para classificar filmes e séries por meio de seus relacionamentos.`,
            },
            {
                name: "Criadores",
                description: `
Endpoints responsáveis pelo gerenciamento dos criadores de filmes e séries.

Permitem cadastrar, consultar, atualizar e remover criadores, que podem ser relacionados aos conteúdos do catálogo.`,
            },
            {
                name: "Elenco",
                description: `Endpoints responsáveis pelo gerenciamento do elenco.

Permitem cadastrar e gerenciar atores, atrizes e demais participantes que podem ser relacionados a filmes e séries.`,
            },
        ],
    });
};
