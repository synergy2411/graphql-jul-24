import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { GraphQLError } from "graphql";
import { v4 } from "uuid";

// Scalar Types - Single Value
// Complex Type -

// u001 -> p003 | c001 | c004 | c003

let users = [
  { id: "u001", name: "monica", age: 21 },
  { id: "u002", name: "ross", age: 24 },
  { id: "u003", name: "rachel", age: 22 },
];

let posts = [
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

let comments = [
  { id: "c001", text: "great book", postId: "p001", creator: "u001" },
  { id: "c002", text: "nice book", postId: "p002", creator: "u003" },
  { id: "c003", text: "Love the author", postId: "p003", creator: "u002" },
  { id: "c004", text: "Not bad", postId: "p002", creator: "u001" },
];

const typeDefs = /* GraphQL */ `
  type Mutation {
    createUser(name: String!, age: Int!): User!
    deleteUser(userId: ID!): User!
    updateUser(userId: ID!, data: UpdateUserInput): User!
    createPost(data: CreatePostInput): Post!
    deletePost(postId: ID!): Post!
    createComment(text: String!, postId: ID!, creatorId: ID!): Comment!
    deleteComment(commentId: ID!): Comment!
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

  input UpdateUserInput {
    name: String
    age: Int
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
    deleteUser: (parent, args, context, info) => {
      const position = users.findIndex((user) => user.id === args.userId);
      if (position === -1) {
        throw new GraphQLError("Unable to find user for id - " + args.userId);
      }
      posts = posts.filter((post) => {
        const isMatched = post.author === args.userId;
        if (isMatched) {
          comments = comments.filter((comment) => comment.postId !== post.id);
        }
        return !isMatched;
      });
      comments = comments.filter((comment) => comment.creator !== args.userId);

      const [deletedUser] = users.splice(position, 1);
      return deletedUser;
    },
    updateUser: (parent, args, context, info) => {
      const { name, age } = args.data;

      // user exists
      const position = users.findIndex((user) => user.id === args.userId);
      if (position === -1) {
        throw new GraphQLError("Unable to find user for id -" + args.userId);
      }

      // name
      if (typeof name === "string") {
        users[position].name = name;
      }
      if (typeof age === "number") {
        users[position].age = age;
      }
      return users[position];
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
    deletePost: (parent, args, context, info) => {
      const position = posts.findIndex((post) => post.id === args.postId);
      if (position === -1) {
        throw new GraphQLError("Unable to delete post for id - " + postId);
      }

      comments = comments.filter((comment) => comment.postId !== args.postId);

      const [deletedPost] = posts.splice(position, 1);
      return deletedPost;
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
    deleteComment: (parent, args, context, info) => {
      const position = comments.findIndex(
        (comment) => comment.id === args.commentId
      );
      if (position === -1) {
        throw new GraphQLError(
          "Unable to find comment for Id - " + args.commentId
        );
      }
      const [deletedComment] = comments.splice(position, 1);
      return deletedComment;
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
