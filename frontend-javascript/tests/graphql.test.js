const {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
} = require("@apollo/client");
const fetch = require("cross-fetch");

describe("GraphQL Query", () => {
  let client = null;

  // Setup and Tear down
  beforeEach(() => {
    client = new ApolloClient({
      link: new HttpLink({
        fetch,
        uri: "http://localhost:4000/graphql",
      }),
      cache: new InMemoryCache(),
    });
  });

  afterEach(() => (client = null));

  test("should fetch all the posts from GraphQL Server", async () => {
    //   Arrange
    const FETCH_POSTS = gql/* GraphQL */ `
      query {
        posts {
          id
          title
          body
          published
        }
      }
    `;

    //   Act
    const { data } = await client.query({ query: FETCH_POSTS });

    //   Assert
    expect(data).not.toBeUndefined();
    expect(data.posts.length).not.toEqual(0);
    expect(data.posts.length).toEqual(2);
  });

  test("should retrun token when correct credentials are given", async () => {
    const USER_LOGIN = gql`
      mutation SignIn {
        signIn(data: { email: "joey@test", password: "joey123" }) {
          token
        }
      }
    `;

    const { data } = await client.mutate({ mutation: USER_LOGIN });

    expect(data.signIn.token).not.toBeUndefined();
  });

  test.skip("should not retrun token when incorrect credentials are given", async () => {
    const USER_LOGIN = gql`
      mutation SignIn {
        signIn(data: { email: "john@test", password: "john123" }) {
          token
        }
      }
    `;

    const { data } = await client.mutate({ mutation: USER_LOGIN });

    expect(data.signIn.token).toBeUndefined();
  });

  test("should create new user in GraphQL Server", async () => {
    const USER_REGISTRATION = gql`
      mutation SignUp {
        signUp(
          data: {
            name: "rachel"
            age: 22
            email: "rachel@test"
            password: "rachel123"
          }
        ) {
          name
          email
          age
          role
          id
        }
      }
    `;

    const { data } = await client.mutate({ mutation: USER_REGISTRATION });

    expect(data.signUp.id).not.toBeUndefined();
  });
});
