import { ApolloServer } from "apollo-server-micro";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import typeDefs from "../src/graphql/schema"; // adjust your path
import resolvers from "../src/graphql/resolvers";

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  await startServer;
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
