import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

const typeDefs = `
    type Query {
        hello : String
    }
`;

const resolvers = {
  Query: {
    hello: () => "World!",
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
});

const server = createServer(yoga);

server.listen(4040, () => console.log("🚀 GraphQL started at PORT : 4040"));
