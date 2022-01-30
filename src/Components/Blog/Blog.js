import React from "react";
import "./Blog.css";
import { useHistory } from "react-router-dom";

//to list all the blogs
function Blog({ post }) {
  const history = useHistory();
  return (
    <section className="blog">
      <img className="blogImage" src={post.photo} alt="bike"></img>
      <h1
        className="blogTitle"
        onClick={() => history.push(`/post/${post._id}`)}
      >
        {post.title}
      </h1>
      <p className="blogDate">{new Date(post.createdAt).toDateString()}</p>

      <p className="blogDescription">{post.description}</p>
    </section>
  );
}

export default Blog;
