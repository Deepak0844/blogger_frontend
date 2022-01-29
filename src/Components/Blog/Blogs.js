import Blog from "./Blog";
import "./Blog.css";
import { URL } from "../BaseUrl";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

function Blogs() {
  const [blog, setBlog] = useState([]);
  const history = useHistory();
  const { search } = useLocation();
  useEffect(() => {
    axios
      .get(`${URL}/post/${search}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search]);
  return (
    <div className="blogContainer">
      {blog.length > 0 ? (
        blog.map((post) => <Blog key={post._id} post={post} />)
      ) : (
        <div className="noPostContainer">
          <h3>No Blogs Found </h3>
          <Button variant="contained" onClick={() => history.push("/create")}>
            Click Here to Create Yours
          </Button>
        </div>
      )}
    </div>
  );
}

export default Blogs;
