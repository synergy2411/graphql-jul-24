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
  {
    id: "p001",
    title: "GraphQL 101",
    body: "Awesome book",
    published: true,
    author: "u003",
  },
  {
    id: "p002",
    title: "Spring in Java",
    body: "Like it",
    published: false,
    author: "u002",
  },
  {
    id: "p003",
    title: "Advanced React",
    body: "Love it.❤️❤️",
    published: true,
    author: "u001",
  },
  {
    id: "p004",
    title: "NodeJS for Beginner",
    body: "Beginners book",
    published: false,
    author: "u002",
  },
];

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
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
    posts: (parent, args, context, info) => {
      if (args.query) {
        return posts.filter(
          (post) =>
            post.title.toLowerCase().includes(args.query.toLowerCase()) ||
            post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return posts; // [1,2,3,4]
    },
  },
  Post: {
    author: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.author);
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
