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

const USER_LOGIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(data: { email: $email, password: $password }) {
      token
    }
  }
`;

window.onload = function () {
  const postContainer = document.getElementById("post-container");
  const btnLogin = document.getElementById("btn-login");
  const txtEmail = document.getElementById("email");
  const txtPassword = document.getElementById("password");

  btnLogin.addEventListener("click", async function (event) {
    event.preventDefault();

    const { data } = await client.mutate({
      mutation: USER_LOGIN,
      variables: {
        email: txtEmail.value,
        password: txtPassword.value,
      },
    });

    console.log(data);
  });

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
