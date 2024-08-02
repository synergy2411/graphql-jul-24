import { gql } from "@apollo/client";

const CREATE_POST = gql`
  mutation CreatePost {
    createPost(
      data: {
        title: "Rachel Post"
        body: "created by Rachel"
        published: false
      }
    ) {
      title
      body
      published
    }
  }
`;

export default CREATE_POST;
