const Subscription = {
  comment: {
    subscribe: (parent, args, { db, pubsub }, info) => {
      return pubsub.subscribe("comment-channel");
    },
    resolve: (payload) => payload,
  },
  post: {
    subscribe: (parent, args, { db, pubsub }, info) => {
      return pubsub.subscribe("post-channel");
    },
    resolve: (payload) => payload,
  },
};

export default Subscription;
