function PostItem({ post }) {
  return (
    <div className="col-6">
      <div className="card text-center">
        <div className="card-body">
          <h4>{post.title.toUpperCase()}</h4>
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
