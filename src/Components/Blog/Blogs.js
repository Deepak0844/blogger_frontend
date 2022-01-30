import Blog from "./Blog";
import "./Blog.css";
import { URL } from "../BaseUrl";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import Loader from "../Loader/Loader";

function Blogs() {
  const [blog, setBlog] = useState([]);
  const history = useHistory();
  const { search } = useLocation(); //use query to fetch post by user
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    axios
      .get(`${URL}/post/${search}`)
      .then((res) => {
        setBlog(res.data);
        setIsLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoad(false);
      });
  }, [search]);
  return (
    <div className="blogContainer">
      {blog.length > 0 ? ( //length of blog less than 0 it spinner or create yours
        blog.map((post) => <Blog key={post._id} post={post} />)
      ) : isLoad ? (
        <Loader />
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
