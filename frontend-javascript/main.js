import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const FETCH_POSTS = gql`
  query {
    posts {
      title
      body
      published
    }
  }
`;

window.onload = function () {
  const postContainer = document.getElementById("post-container");

  const fetchPosts = async () => {
    const { data } = await client.query({ query: FETCH_POSTS });

    data.posts.forEach((post) => {
      const liElement = document.createElement("li");
      liElement.innerHTML = post.title.toUpperCase();
      postContainer.appendChild(liElement);
    });
  };

  fetchPosts();
};
