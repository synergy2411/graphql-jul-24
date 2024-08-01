import { createServer } from "node:http";
import { PrismaClient } from "@prisma/client";
import { createSchema, createYoga } from "graphql-yoga";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";

const { hashSync } = bcrypt;

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Mutation {
    signUp(data: SignUpInput): SignUpPayload!
  }

  type Query {
    hello: String!
  }

  type SignUpPayload {
    name: String!
    age: Int!
    email: String!
    role: Role!
    id: ID!
  }

  input SignUpInput {
    name: String!
    age: Int!
    email: String!
    password: String!
    role: Role
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
  },
  Query: {
    hello: () => "World!",
  },
};

async function main() {
  const schema = createSchema({
    typeDefs,
    resolvers,
  });

  const yoga = createYoga({
    schema,
    context: {
      prisma,
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
