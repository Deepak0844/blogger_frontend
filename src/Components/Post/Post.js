import "./Post.css";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  MenuItem,
  Menu,
  TextareaAutosize,
  TextField,
  Avatar,
  DialogTitle,
  Dialog,
  DialogActions,
  Slide,
} from "@mui/material";
import axios from "axios";
import { URL } from "../BaseUrl";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { toast } from "react-toastify";

function Post() {
  const { id } = useParams();
  //get post by id
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios
      .get(`${URL}/post/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <div>
      {post ? (
        <PostData post={post} setPost={setPost} />
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px " }}>
          Post not available
        </p>
      )}
    </div>
  );
}

function PostData({ post, setPost }) {
  const history = useHistory();
  const [isUpdate, setIsUpdate] = useState(false);
  //menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //user from localstorage via redux
  const user = useSelector((state) => state.data);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //delete post
  const handleDelete = () => {
    setAnchorEl(null);
    axios
      .delete(`${URL}/post/${post._id}`, {
        data: { userName: user.userName },
      })
      .then(() => {
        toast.success("Post deleted successfully");
        history.push("/blog");
        setOpenDialog(false);
      })
      .catch((err) => toast.error(err.response.data.message));
  };
  //edit post
  const handleEdit = () => {
    setIsUpdate(true);
    setAnchorEl(null);
  };

  //validation
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        title: post.title,
        description: post.description,
      },
      validationSchema: formValidationSchema,
      onSubmit: (editedPost) => {
        axios
          .put(`${URL}/post/${post._id}`, {
            title: editedPost.title,
            description: editedPost.description,
            userName: user.userName,
          })
          .then((res) => {
            toast.success("Post edited successfully");
            setPost(res.data.editPost);
            setIsUpdate(false);
          })
          .catch((err) => console.log(err.response.data.message));
      },
    });
  //post delete dialog
  const [openDialog, setOpenDialog] = useState(false);

  // click to scroll top
  const [scroll, setScroll] = useState(false);
  const scrollFn = () => {
    if (window.pageYOffset > 350) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };
  //  scroll to button
  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.addEventListener("scroll", scrollFn);

  return (
    <form onSubmit={handleSubmit}>
      {scroll && (
        <Button color="inherit" onClick={toTop}>
          <span className="scrollTop">
            <KeyboardArrowUpOutlinedIcon fontSize="large" />
          </span>
        </Button>
      )}
      <section className="postContainer">
        <img src={post.photo} alt="post"></img>
        {isUpdate ? (
          <div className="postUpdateInput">
            <TextField
              inputProps={{
                min: 0,
                style: {
                  textAlign: "center",
                  fontFamily: "Lora",
                  fontWeight: "600",
                  fontSize: "25px",
                },
              }}
              fullWidth
              variant="standard"
              label="Title"
              color="secondary"
              id="title"
              value={values.title}
              error={errors.title && touched.title}
              helperText={errors.title && touched.title && errors.title}
              onChange={handleChange}
              onBlur={handleBlur}
            ></TextField>
          </div>
        ) : (
          <h1 className="postTitle">
            {post.title}
            {user && post.userName === user.userName && (
              <>
                <div className="postOptions">
                  <EditIcon
                    onClick={handleEdit}
                    className="postIcon"
                    color="info"
                  />
                  <DeleteIcon
                    onClick={() => setOpenDialog(true)}
                    className="postIcon"
                    color="error"
                  />
                </div>
                <div className="postOptionMobileView">
                  <Button onClick={handleClick}>
                    <MoreVertIcon color="action" />
                  </Button>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleEdit}>
                      <p
                        style={{
                          fontSize: "13px",
                          marginBottom: "0px",
                        }}
                      >
                        Edit
                      </p>
                    </MenuItem>
                    <MenuItem onClick={() => setOpenDialog(true)}>
                      <p
                        style={{
                          fontSize: "13px",
                          marginBottom: "0px",
                        }}
                      >
                        Delete
                      </p>
                    </MenuItem>
                  </Menu>
                </div>
              </>
            )}
          </h1>
        )}

        <div className="postInfo">
          <span
            className="postAuthor"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/blog?userName=${post.userName}`)}
          >
            <Avatar
              style={{ width: 32, height: 32 }}
              alt={post && post.userName}
              src={
                user && user.userName === post.userName
                  ? user.profilePic
                  : post.userProfilePic
              }
            >
              {post && post.userName[0]}
            </Avatar>
            {user && user.userName === post.userName ? (
              <b>You</b>
            ) : (
              <b>{post.userName}</b>
            )}
          </span>
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {isUpdate ? (
          <div className="updateDescription">
            <TextareaAutosize
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                background: "whitesmoke",
                fontFamily: "Varela Round",
              }}
              id="description"
              aria-label="empty textarea"
              placeholder="Description..."
              minRows={4}
            />
            <p style={{ color: "red" }}>
              {errors.description && touched.description && errors.description}
            </p>
          </div>
        ) : (
          <p className="postDescription">{post.description}</p>
        )}
        {isUpdate && (
          <div className="updateBtn">
            <Button variant="contained" color="success" type="submit">
              Update
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setIsUpdate(false)}
            >
              cancel
            </Button>
          </div>
        )}
        <DeletePostDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          handleDelete={handleDelete}
        />
      </section>
    </form>
  );
}

//
const formValidationSchema = yup.object({
  title: yup
    .string()
    .min(2, "Need bigger title name")
    .required("please fill the title"),
  description: yup
    .string()
    .min(15, "require longer description")
    .required("please fill the description"),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeletePostDialog({ openDialog, setOpenDialog, handleDelete }) {
  return (
    <div>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Are you sure. Do you want to delete your Post?"}
        </DialogTitle>
        <DialogActions>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Post;
