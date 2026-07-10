import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import { ApolloServer, BaseContext } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

const handler = startServerAndCreateNextHandler<NextRequest>(apollo, {
    context: async () => {
        const cacheLoader = new Map();
        return {
            cacheLoader,
        };
    },
});

export async function GET(request: NextRequest) {
    return handler(request);
}
export async function POST(request: NextRequest) {
    return handler(request);
}
