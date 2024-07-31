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

export const db = { users, posts, comments };
