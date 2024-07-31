const Query = {
  hello: () => "World!",
  users: (parent, args, { db }, info) => {
    if (args.query) {
      return db.users.filter((user) =>
        user.name.toLocaleLowerCase().includes(args.query.toLowerCase())
      );
    }
    return db.users;
  },
  posts: (parent, args, { db }, info) => {
    if (args.query) {
      return db.posts.filter(
        (post) =>
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    }
    return db.posts; // [1,2,3,4]
  },
  comments: (parent, args, { db }, info) => db.comments,
};

export default Query;
