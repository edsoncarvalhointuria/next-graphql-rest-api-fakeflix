import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schema";
import { ApolloServer, BaseContext } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

const apollo = new ApolloServer<BaseContext>({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest>(apollo, {
    context: async () => {
        const cacheLoader = new Map();
        return {
            cacheLoader,
        };
    },
});

export { handler as GET, handler as POST };
