const { ApolloServer } = require("apollo-server-micro");

const typeDefs = require("../src/graphql/schema"); // adjust your path
const resolvers = require("../src/graphql/resolvers");

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  await startServer;
  return apolloServer.createHandler({ path: "/api/graphql" })(req, res);
};

module.exports.config = {
  api: {
    bodyParser: false,
  },
};
