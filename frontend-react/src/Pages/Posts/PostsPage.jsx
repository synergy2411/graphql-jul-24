import { useQuery } from "@apollo/client";
import PostItem from "../../Components/PostItem";
import FETCH_POSTS from "../../apollo/fetch-posts";

function PostsPage() {
  const { data, error, loading } = useQuery(FETCH_POSTS);

  return (
    <>
      <h1>Posts coming soon...</h1>
      {loading && <h1>Loading....</h1>}
      {error && <p>{error}</p>}
      <div className="row">
        {data.posts.map((post) => (
          <PostItem post={post} key={post.id} />
        ))}
      </div>
    </>
  );
}

export default PostsPage;
