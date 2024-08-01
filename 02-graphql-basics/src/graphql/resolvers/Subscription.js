const Subscription = {
  comment: {
    subscribe: (parent, args, { db, pubsub }, info) => {
      return pubsub.subscribe("comment-channel");
    },
    resolve: (payload) => payload,
  },
};

export default Subscription;
