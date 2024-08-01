import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   const result = await prisma.user.create({
  //     data: {
  //       name: "ross",
  //       age: 24,
  //       email: "ross@test",
  //       password: "ross123",
  //       role: "MANAGER",
  //     },
  //   });

  //   console.log("RESULT : ", result);

  const allUsers = await prisma.user.findMany();

  console.log(allUsers);
}

main()
  .catch((err) => {
    console.log(err);
    prisma.$disconnect();
  })
  .finally(() => prisma.$disconnect());
