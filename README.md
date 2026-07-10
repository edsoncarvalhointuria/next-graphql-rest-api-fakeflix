<div align="center" >
  <img src="./public/fakeflixpng.png" alt="Logo Fakeflix API" width=300 />
</div>

# 🎬 Fakeflix: Hyrbid API (REST & GraphQL)

Uma API robusta, híbrida e de alto desempenho desenvolvida como demonstração de domínio profundo em fundamentos de Engenharia de Software, Arquitetura de Redes e Design de APIs.

Este projeto não utiliza ORMs pesados ou frameworks mágicos para a camada de dados. Toda a infraestrutura foi projetada com foco nas melhores práticas de mercado, desde o controle relacional nativo até a interceptação de tráfego na borda (Edge Computing).

## 🚀 Ambientes Interativos (Sandbox Epêmero)

O ambiente de produção foi desenhado para ser testado à vontade. Operações de mutação (POST, PUT, PATCH, DELETE) executam suas lógicas reais e refletem no banco de dados temporário, mas o catálogo original é restaurado automaticamente para garantir a integridade dos testes.

- **Documentação REST (OpenAPI/Scalar):** [Acesse a Rota Principal (`/`)](#)
- **Playground GraphQL (Apollo/Yoga):** [Acesse a Rota (`/graphql`)](#)

---

## 🧠 Destaques Arquiteturais

### 🔗 REST: Maturidade Nível 3 (HATEOAS)

A camada REST alcança o nível máximo do modelo de maturidade de Richardson. Todas as requisições retornam o estado atual do recurso acompanhado de hiperlinks de navegação (`_links`), permitindo que o cliente descubra as próximas ações dinamicamente sem depender de documentação externa.

### 🛡️ Tratamento de Erros Padronizado (RFC 7807)

A API não retorna erros genéricos. Qualquer anomalia (seja falha de validação ou estouro de limite de requisições) é envelopada e devolvida estritamente no padrão internacional **RFC 7807** (`application/problem+json`), garantindo previsibilidade para os clientes que a consomem.

### 🐙 GraphQL com DataLoader (Anti N+1)

O motor GraphQL resolve relacionamentos complexos (Filmes, Séries, Temporadas, Episódios, Elenco, Criadores) de forma altamente otimizada. A implementação do padrão `DataLoader` agrupa e faz cache das resoluções em lote, erradicando o problema clássico de N+1 consultas ao banco de dados.

### 🗄️ Raw SQL & Controle Transacional

A persistência é gerenciada através de um driver SQLite nativo. A ausência de ORMs demonstra o domínio na escrita de _Raw Queries_, mapeamento relacional, controle explícito de Chaves Estrangeiras e integridade atômica utilizando transações manuais (`BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`).

### 🚦 Edge Rate Limiting (Proxy de Defesa)

Para proteger a integridade do banco de dados e evitar ataques de força bruta, a API conta com um Proxy Reverso operando na borda da aplicação (_Next.js Edge Runtime_). Baseado no algoritmo de Janela Deslizante em memória, o sistema barra requisições excessivas antes mesmo de atingirem a camada lógica principal.

### ✅ Validação Pura (Schema-Driven)

O ciclo de vida dos dados é fortemente tipado. A entrada de dados passa pela validação rigorosa de schemas do **Zod**, garantindo que nenhum dado malformado alcance o banco de dados. Esses mesmos schemas são responsáveis por gerar a documentação OpenAPI dinamicamente.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js (App Router & Edge Proxy)
- **Linguagem:** TypeScript
- **Bancos de Dados:** SQLite (Raw SQL Driver + In-Memory/Tmp Clone para Sandbox)
- **GraphQL:** Implementação de Schemas, Resolvers e DataLoader
- **Validação & OpenAPI:** Zod + Zod-to-OpenAPI
- **Padrões Adotados:** HATEOAS, RFC 7807, Domain-Driven Design (DDD)

---

<div align="center">
  <i>Edson Carvalho Inturia.</i>
</div>
