<div align="center">
  <img src="./public/fakeflixpng.png" alt="Logo Fakeflix API" width="300" />
</div>

# 🎬 Fakeflix: Hybrid API (REST & GraphQL)

Uma API híbrida (**REST + GraphQL**) desenvolvida para gerenciar um catálogo fictício de filmes e séries.

O Fakeflix API foi construído com foco em boas práticas de Engenharia de Software, Arquitetura de APIs e modelagem relacional, explorando conceitos como **HATEOAS**, **GraphQL**, **Raw SQL**, **validação orientada por schemas**, **documentação automática** e **Edge Computing**.

<p align="center">

**REST • GraphQL • HATEOAS • RFC 7807 • OpenAPI • Zod • SQLite • Raw SQL • DataLoader • Next.js**

</p>

---

## 🍿 Catálogo

A API disponibiliza um catálogo fictício pronto para uso, composto por:

- 🎬 **30 filmes**
- 📺 **14 séries**
- 🎞️ Temporadas e episódios
- 🎭 Elenco
- ✍️ Criadores
- 🏷️ Gêneros

Todos os conteúdos incluem **banners**, **descrições**, **classificação indicativa** e **trailers gerados por Inteligência Artificial**, proporcionando um ambiente rico para testes e integração.

---

## 🚀 Ambientes Interativos (Sandbox)

O ambiente foi projetado para ser explorado livremente.

Operações de escrita (**POST**, **PUT**, **PATCH** e **DELETE**) executam normalmente, incluindo validações, regras de negócio e persistência em um banco temporário. Ao final do processo, o catálogo original é restaurado automaticamente, permitindo testar toda a API sem comprometer os dados disponibilizados para demonstração.

- 📖 **Documentação REST (OpenAPI + Scalar):** `/`
- 🐙 **Playground GraphQL (GraphQL Yoga):** `/graphql`

---

# 🧠 Destaques da Arquitetura

## 🔗 REST Maturity Level 3 (HATEOAS)

A API REST segue o **Nível 3 do Modelo de Maturidade de Richardson (HATEOAS)**.

As respostas incluem hiperlinks (`_links`) que permitem ao cliente descobrir recursos e ações relacionadas dinamicamente, reduzindo o acoplamento entre cliente e servidor.

---

## 🛡️ Tratamento de Erros (RFC 7807)

Todos os erros seguem o padrão **RFC 7807 (Problem Details for HTTP APIs)**.

Falhas de validação, recursos inexistentes, conflitos e limitações de requisições são retornados utilizando o formato `application/problem+json`, fornecendo respostas consistentes e previsíveis para qualquer cliente.

---

## 🐙 GraphQL com DataLoader

Além da camada REST, o projeto disponibiliza uma API GraphQL construída com **GraphQL Yoga**.

Relacionamentos entre filmes, séries, temporadas, episódios, criadores, elenco e gêneros são resolvidos utilizando **DataLoader**, agrupando consultas e reduzindo significativamente o problema de **N+1 Queries**.

---

## 🗄️ Persistência com Raw SQL

A camada de persistência foi implementada utilizando **SQLite** e consultas **Raw SQL**, sem a utilização de ORMs.

Essa abordagem proporciona controle explícito sobre consultas, relacionamentos, chaves estrangeiras, índices e transações (`BEGIN`, `COMMIT` e `ROLLBACK`), além de facilitar a otimização das operações executadas pelo banco de dados.

---

## 🚦 Edge Rate Limiting

Para proteger a aplicação contra abuso e excesso de requisições, a API possui um sistema de **Rate Limiting** executado na borda da aplicação (**Next.js Edge Runtime**).

As requisições são analisadas antes de alcançarem a camada de negócio, reduzindo carga desnecessária sobre o servidor e protegendo os recursos da aplicação.

---

## ✅ Validação Orientada por Schemas

Toda entrada de dados é validada utilizando **Zod**.

Os mesmos schemas utilizados na validação são responsáveis por gerar automaticamente toda a documentação **OpenAPI**, garantindo que documentação e implementação permaneçam sempre sincronizadas.

---

# 🛠️ Tecnologias

### Backend

- Next.js (App Router)
- TypeScript
- SQLite
- Raw SQL

### APIs

- REST
- GraphQL Yoga
- DataLoader

### Documentação

- OpenAPI 3.1
- Scalar
- Zod
- Zod-to-OpenAPI

### Arquitetura

- REST Maturity Level 3 (HATEOAS)
- RFC 7807 (Problem Details)
- Edge Runtime
- Rate Limiting
- Schema Validation

---

<div align="center">

Desenvolvido por **Edson Carvalho Inturia**.

</div>
