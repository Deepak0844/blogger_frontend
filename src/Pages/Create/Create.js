import "./Create.css";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  TextField,
  TextareaAutosize,
  Tooltip,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { URL } from "../../Components/BaseUrl";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
//firebase
import firebaseFileUpload from "../../fireBase";

//toast
import { toast } from "react-toastify";

function Create() {
  const history = useHistory();
  //file uploader
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const fileUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      const file = e.target.files[0];
      firebaseFileUpload({ file, setProgress, setImage, setLoading });
    }
    return;
  };
  //get user from redux store
  const user = useSelector((state) => state.data);

  const Input = styled("input")({
    display: "none",
  });
  //validation
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (post) => {
        publish(post);
      },
    });

  const publish = (post) => {
    post.userName = user.userName;
    post.userProfilePic = user.profilePic ? user.profilePic : "";
    post.photo = image
      ? image
      : "https://image.kpopmap.com/2019/05/2.-HD_Mubeat.png";
    //"https://ouikar.com/pub/media/catalog/product/placeholder/default/image_not_available.png";
    axios
      .post(`${URL}/post`, post)
      .then(() => {
        toast.success("Blog Created Successfully");
        history.push("/blog");
      })
      .catch((err) => {
        toast.error(err.response.data.message + " use different title");
      });
  };
  return (
    <form className="CreateContainer" onSubmit={handleSubmit}>
      <h2
        style={{ textAlign: "center", padding: "10px", fontFamily: "poppins" }}
      >
        Create Your Blog
      </h2>
      <label htmlFor="file" style={{ display: "block" }}>
        <div className="uploadedImage">
          <img
            src={
              image
                ? image
                : "https://firebasestorage.googleapis.com/v0/b/blog-app-a46d7.appspot.com/o/Background%2F1643475840146.jpeg?alt=media&token=5e607096-c9c0-4953-b584-bc4b6df5d15b"
            }
            alt="uploaded pic"
          ></img>
          {loading ? (
            <Box sx={{ position: "absolute" }}>
              <CircularProgress
                variant="determinate"
                color="secondary"
                value={progress}
                size={53}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  fontSize={17}
                  color="WindowText"
                >
                  {`${progress}%`}
                </Typography>
              </Box>
            </Box>
          ) : (
            ""
          )}
        </div>
      </label>
      <div className="fileUploadContainer">
        <div className="fileUpload">
          <label htmlFor="file">
            <Input
              onChange={fileUpload}
              accept="image/*"
              id="file"
              type="file"
            />
            <Tooltip arrow title="Upload">
              <AddIcon
                color="action"
                style={{ cursor: "pointer", fontSize: "50px" }}
              />
            </Tooltip>
          </label>
          <TextField
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            fullWidth
            id="title"
            label="Title"
            variant="standard"
            size="medium"
            error={errors.title && touched.title}
            helperText={errors.title && touched.title && errors.title}
          />
        </div>

        <TextareaAutosize
          className="createDescription"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          id="description"
          aria-label="empty textarea"
          placeholder="Description..."
          minRows={3}
        />
        <p style={{ color: "#d52f2f" }}>
          {errors.description && touched.description && errors.description}
        </p>
        <div className="createBtn">
          <Button type="submit" variant="contained" color="success">
            Publish
          </Button>
        </div>
      </div>
    </form>
  );
}

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

export default Create;
