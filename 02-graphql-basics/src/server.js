import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";

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

const comments = [
  { id: "c001", text: "great book", postId: "p001", creator: "u001" },
  { id: "c002", text: "nice book", postId: "p002", creator: "u003" },
  { id: "c003", text: "Love the author", postId: "p003", creator: "u002" },
  { id: "c004", text: "Not bad", postId: "p002", creator: "u001" },
];

const typeDefs = /* GraphQL */ `
  type Mutation {
    createUser(name: String!, age: Int!): User!
    createPost(data: CreatePostInput): Post!
    createComment(text: String!, postId: ID!, creatorId: ID!): Comment!
  }
  type Query {
    hello: String!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    post: Post!
    creator: User!
  }
  input CreatePostInput {
    title: String!
    body: String!
    authorId: ID!
  }
`;

const resolvers = {
  Mutation: {
    createUser: (parent, args, context, info) => {
      const { name, age } = args;
      let newUser = {
        id: v4(),
        name,
        age,
      };
      users.push(newUser);
      return newUser;
    },
    createPost: (parent, args, context, info) => {
      const { title, body, authorId } = args.data;
      const isFoundUser = users.some((user) => user.id === authorId);
      if (!isFoundUser) {
        throw new GraphQLError("Unable to find author for id -" + authorId);
      }

      let newPost = {
        id: v4(),
        title,
        body,
        published: false,
        author: authorId,
      };
      posts.push(newPost);
      return newPost;
    },
    createComment: (parent, args, context, info) => {
      const postPosition = posts.findIndex((post) => post.id == args.postId);
      if (postPosition === -1) {
        throw new GraphQLError("Unable to find post ID - " + args.postId);
      }

      const userPosition = users.findIndex((user) => user.id == args.creatorId);
      if (userPosition === -1) {
        throw new GraphQLError("Unable to find creator ID - " + args.creatorId);
      }

      let newComment = {
        id: v4(),
        text: args.text,
        postId: args.postId,
        creator: args.creatorId,
      };

      comments.push(newComment);

      return newComment;
    },
  },
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
    comments: (parent, args, context, info) => comments,
  },
  Post: {
    author: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.author);
    },
    comments: (parent, args, context, info) => {
      return comments.filter((comment) => comment.postId === parent.id);
    },
  },
  User: {
    posts: (parent, args, context, info) => {
      return posts.filter((post) => post.author === parent.id);
    },
    comments: (parent, args, context, info) => {
      return comments.filter((comment) => comment.creator === parent.id);
    },
  },
  Comment: {
    post: (parent, args, context, info) => {
      return posts.find((post) => post.id === parent.postId);
    },
    creator: (parent, args, context, info) => {
      return users.find((user) => user.id === parent.creator);
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
