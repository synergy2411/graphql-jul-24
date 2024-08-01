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

//   const allUsers = await prisma.user.findMany();

//   console.log(allUsers);

// POST CREATED

//   const result = await prisma.post.create({
//     data: {
//       title: "Advanced React",
//       body: "...",
//       published: true,
//       authorId: "66ab370ffc6018adc6802b7a",
//     },
//   });

//   console.log("RESULT : ", result);

//   const allUsers = await prisma.user.findMany({
//     include: {
//       Post: true,
//     },
//   });

//   console.log(allUsers);

const allPosts = await prisma.post.findMany({
  include: {
    author: true,
  },
  orderBy: {
    title: "asc",
  },
  // take: 100,
  // skip: 100,
  // where: {
  //   published: false,
  // },
});

console.log(allPosts);
