import { createServer } from "node:http";
import { PrismaClient } from "@prisma/client";
import { createSchema, createYoga } from "graphql-yoga";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { hashSync, compareSync } = bcrypt;
const { sign, verify } = jwt;
const SECRET_KEY = "MySuperSecretKey";

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Mutation {
    signUp(data: SignUpInput): SignUpPayload!
    signIn(data: SignInInput): SignInPayload!
    createPost(data: CreatePostInput): Post!
  }

  type Query {
    hello: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }

  type SignUpPayload {
    name: String!
    age: Int!
    email: String!
    role: Role!
    id: ID!
  }

  type SignInPayload {
    token: String!
  }

  input SignUpInput {
    name: String!
    age: Int!
    email: String!
    password: String!
    role: Role
  }

  input SignInInput {
    email: String!
    password: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean
  }
  enum Role {
    ANALYST
    MANAGER
    ADMIN
  }
`;

const resolvers = {
  Mutation: {
    signUp: async (parent, args, context, info) => {
      let { name, age, email, password, role } = args.data;
      role = role || "ANALYST";
      const hashedPassword = hashSync(password, 12);
      try {
        const createdUser = await prisma.user.create({
          data: {
            name,
            email,
            age,
            password: hashedPassword,
            role,
          },
        });
        return createdUser;
      } catch (err) {
        console.log(err);
        throw new GraphQLError("Unable to create new User");
      }
    },
    signIn: async (parent, args, context, info) => {
      const { email, password } = args.data;

      try {
        const foundUser = await prisma.user.findUnique({ where: { email } });
        if (!foundUser) {
          throw new GraphQLError("Invalid email");
        }

        const isMatched = compareSync(password, foundUser.password);
        if (!isMatched) {
          throw new GraphQLError("Invalid password");
        }

        const token = sign(
          { id: foundUser.id, role: foundUser.role },
          SECRET_KEY
        );
        return { token };
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
    createPost: async (parent, args, { token }, info) => {
      if (!token) {
        throw new GraphQLError("Token required");
      }
      try {
        let { title, body, published } = args.data;
        published = published || false;

        const { id } = verify(token, SECRET_KEY);

        const createdPost = await prisma.post.create({
          data: {
            title,
            body,
            published,
            authorId: id,
          },
        });
        return createdPost;
      } catch (err) {
        console.log(err);
        throw new GraphQLError("Unable to create post");
      }
    },
  },
  Query: {
    hello: () => "World!",
    posts: async () => {
      const allPosts = await prisma.post.findMany();
      return allPosts;
    },
  },
};

async function main() {
  const schema = createSchema({
    typeDefs,
    resolvers,
  });

  const yoga = createYoga({
    schema,
    context: ({ request }) => {
      const authHeader = request.headers.get("authorization");
      let token = null;
      if (authHeader) {
        token = authHeader.split(" ")[1];
      }
      return {
        prisma,
        token,
      };
    },
  });

  const server = createServer(yoga);

  server.listen(4000, () =>
    console.log("GraphQL Server is running on PORT: 4000")
  );
}

main()
  .catch((err) => {
    console.log(err);
    prisma.$disconnect();
  })
  .finally(() => prisma.$disconnect());
