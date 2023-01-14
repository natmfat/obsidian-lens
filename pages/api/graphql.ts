import type { NextApiRequest, NextApiResponse } from "next";
import { createYoga, createSchema } from "graphql-yoga";
import gql from "graphql-tag";
import {
    typeDefs as scalarTypeDefs,
    resolvers as scalarResolvers,
} from "graphql-scalars";

import * as vaultResolvers from "../../schema/vault/resolvers";
import vaultTypes from "../../schema/vault/types.graphql";
import { getCookie } from "cookies-next";

export const config = {
    api: {
        bodyParser: false,
    },
};

// TODO: codegen
// TODO: client graphql (urql)

export default createYoga<{
    req: NextApiRequest;
    res: NextApiResponse;
}>({
    graphqlEndpoint: "/api/graphql",
    context: ({ req, res }) => {
        return {
            accessToken: getCookie("access_token", { req, res }),
        };
    },
    schema: createSchema({
        typeDefs: [
            ...scalarTypeDefs,
            gql`
                type Query
                type Mutation
            `,
            vaultTypes,
        ],
        resolvers: {
            Query: {
                ...vaultResolvers.Query,
            },
            Mutation: {
                ...vaultResolvers.Mutation,
            },
        },
    }),
});
