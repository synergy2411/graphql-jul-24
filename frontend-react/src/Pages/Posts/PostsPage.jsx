import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import PostItem from "../../Components/PostItem";
import FETCH_POSTS from "../../apollo/fetch-posts";
import { useEffect, useState } from "react";
import CREATE_POST from "../../apollo/create-post";

function PostsPage() {
  const { data, error, loading, refetch } = useQuery(FETCH_POSTS);
  const [token, setToken] = useState(null);

  const [onCreateNewPost] = useMutation(CREATE_POST);

  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const onCreatePost = async () => {
    try {
      const { data } = await onCreateNewPost();
      refetch();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <h1 className="text-center mb-4">The Blog App</h1>

      {token && (
        <div className="row mb-4">
          <div className="col-4">
            <div className="d-grid">
              <button className="btn btn-secondary" onClick={onCreatePost}>
                Add New Post
              </button>
            </div>
          </div>
          <div className="col-4 offset-4">
            <div className="d-grid">
              <button className="btn btn-outline-danger" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <h1>Loading....</h1>}
      {error && <p>{error}</p>}
      <div className="row">
        {!loading &&
          data.posts.map((post) => <PostItem post={post} key={post.id} />)}
      </div>
    </>
  );
}

export default PostsPage;
