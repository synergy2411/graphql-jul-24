import { GraphQLError } from "graphql";
import { v4 } from "uuid";

const Mutation = {
  createUser: (parent, args, { db }, info) => {
    const { name, age } = args;
    let newUser = {
      id: v4(),
      name,
      age,
    };
    db.users.push(newUser);
    return newUser;
  },
  deleteUser: (parent, args, { db }, info) => {
    const position = db.users.findIndex((user) => user.id === args.userId);
    if (position === -1) {
      throw new GraphQLError("Unable to find user for id - " + args.userId);
    }
    db.posts = db.posts.filter((post) => {
      const isMatched = post.author === args.userId;
      if (isMatched) {
        db.comments = db.comments.filter(
          (comment) => comment.postId !== post.id
        );
      }
      return !isMatched;
    });
    db.comments = db.comments.filter(
      (comment) => comment.creator !== args.userId
    );

    const [deletedUser] = db.users.splice(position, 1);
    return deletedUser;
  },
  updateUser: (parent, args, { db }, info) => {
    const { name, age } = args.data;

    const position = db.users.findIndex((user) => user.id === args.userId);
    if (position === -1) {
      throw new GraphQLError("Unable to find user for id -" + args.userId);
    }
    if (typeof name === "string") {
      db.users[position].name = name;
    }
    if (typeof age === "number") {
      db.users[position].age = age;
    }
    return db.users[position];
  },
  createPost: (parent, args, { db }, info) => {
    const { title, body, authorId } = args.data;
    const isFoundUser = db.users.some((user) => user.id === authorId);
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
    db.posts.push(newPost);
    return newPost;
  },
  deletePost: (parent, args, { db }, info) => {
    const position = db.posts.findIndex((post) => post.id === args.postId);
    if (position === -1) {
      throw new GraphQLError("Unable to delete post for id - " + postId);
    }

    db.comments = db.comments.filter(
      (comment) => comment.postId !== args.postId
    );

    const [deletedPost] = db.posts.splice(position, 1);
    return deletedPost;
  },
  createComment: (parent, args, { db, pubsub }, info) => {
    const postPosition = db.posts.findIndex((post) => post.id == args.postId);
    if (postPosition === -1) {
      throw new GraphQLError("Unable to find post ID - " + args.postId);
    }

    const userPosition = db.users.findIndex(
      (user) => user.id == args.creatorId
    );
    if (userPosition === -1) {
      throw new GraphQLError("Unable to find creator ID - " + args.creatorId);
    }

    let newComment = {
      id: v4(),
      text: args.text,
      postId: args.postId,
      creator: args.creatorId,
    };

    pubsub.publish("comment-channel", {
      mutation: "CREATED",
      comment: newComment,
    });
    db.comments.push(newComment);

    return newComment;
  },
  deleteComment: (parent, args, { db, pubsub }, info) => {
    const position = db.comments.findIndex(
      (comment) => comment.id === args.commentId
    );
    if (position === -1) {
      throw new GraphQLError(
        "Unable to find comment for Id - " + args.commentId
      );
    }
    const [deletedComment] = db.comments.splice(position, 1);

    pubsub.publish("comment-channel", {
      mutation: "DELETED",
      comment: deletedComment,
    });

    return deletedComment;
  },
};

export default Mutation;
