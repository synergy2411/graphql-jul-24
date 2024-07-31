import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

// Scalar Types - Single Value
// Complex Type -

const users = [
  { id: "u001", name: "monica", age: 21 },
  { id: "u002", name: "ross", age: 24 },
  { id: "u003", name: "rachel", age: 22 },
];

const posts = [
  { id: "p001", title: "GrpahQL 101", body: "Awesome book", published: true },
  { id: "p002", title: "Spring in Java", body: "Like it", published: false },
  {
    id: "p003",
    title: "Advanced React",
    body: "Love it.❤️❤️",
    published: true,
  },
  {
    id: "p004",
    title: "NodeJS for Beginner",
    body: "Beginners book",
    published: false,
  },
];

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    users(query: String): [User!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
  }
`;

const resolvers = {
  Query: {
    hello: () => "World!",
    users: (parent, args, context, info) => {
      if (args.query) {
        return users.filter((user) =>
          user.name.toLocaleLowerCase().includes(args.query.toLowerCase())
        );
      }
      return users;
    },
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
