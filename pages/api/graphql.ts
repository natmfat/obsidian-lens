import { getCookie } from "cookies-next";
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from "graphql-scalars";
import gql from "graphql-tag";
import { createSchema, createYoga } from "graphql-yoga";
import type { NextApiRequest, NextApiResponse } from "next";

import * as vaultResolvers from "../../schema/vault/resolvers";
import vaultTypes from "../../schema/vault/types.graphql";

export const config = {
  api: {
    bodyParser: false,
  },
};

// TODO: client graphql (urql)

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  graphqlEndpoint: "/api/graphql",
  context: async ({ req, res }) => {
    return {
      accessToken: await getCookie("access_token", { req, res }),
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
        ...scalarResolvers.Query,
        ...vaultResolvers.Query,
      },
      Mutation: {
        ...scalarResolvers.Mutation,
        ...vaultResolvers.Mutation,
      },
    },
  }),
});
