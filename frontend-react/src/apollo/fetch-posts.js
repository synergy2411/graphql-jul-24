import { gql } from "@apollo/client";

const FETCH_POSTS = gql`
  query {
    posts {
      id
      title
      body
      published
    }
  }
`;

export default FETCH_POSTS;
