import {
  Button,
  TextField,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import "./SignIn.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
//
import { useHistory } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { URL } from "../../Components/BaseUrl";
import axios from "axios";
//
import { green } from "@mui/material/colors";

import { useSelector, useDispatch } from "react-redux";
import {
  api_call_starts,
  api_call_successful,
  api_call_failed,
} from "../../redux/user/userAction";

//sign in
function SignIn() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const [isFetching, setIsFetching] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const history = useHistory();
  //validation
  const { handleSubmit, values, handleChange, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (signinUser) => {
        signIn(signinUser);
      },
    });

  const signIn = (signinUser) => {
    dispatch(api_call_starts());
    axios
      .post(`${URL}/auth/signin`, signinUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(api_call_successful(res.data.loginData)); // user info will stored in local storage and pass the data to all components via redux
        history.push("/blog");
      })
      .catch((err) => dispatch(api_call_failed(err.response.data.message))); //error message
  };

  //demo credential
  const handleSignin = () => {
    const signinUser = {
      email: "test@gmail.com",
      password: "Test@123",
    };
    setIsFetching(true);
    axios
      .post(`${URL}/auth/signin`, signinUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        dispatch(api_call_successful(res.data.loginData)); // user info will stored in local storage and pass the data to all components via redux
        setIsFetching(false);
        history.push("/blog");
      })
      .catch(() => setIsFetching(false));
  };
  return (
    <form className="signInFormContainer" onSubmit={handleSubmit}>
      <div className="signInForm">
        <h2>Sign In</h2>
        <h6 style={{ color: "red" }}>{error}</h6>
        <div className="signInInputs">
          <TextField
            fullWidth
            label="Email"
            color="secondary"
            variant="standard"
            id="email"
            value={values.email}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          ></TextField>
          <FormControl
            error={errors.password && touched.password}
            fullWidth
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText color="error" id="component-error-text">
              {errors.password && touched.password && errors.password}
            </FormHelperText>
          </FormControl>
          <Button
            type="submit"
            sx={{
              borderRadius: "5px",
              boxShadow: "none",
              padding: "5px",
            }}
            variant="contained"
            color="secondary"
            disabled={isLoading}
          >
            <p className="optionBtn">Sign In</p>
            {isLoading ? (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            ) : (
              ""
            )}
          </Button>
           <Button
            onClick={handleSignin}
            sx={{
              borderRadius: "5px",
              boxShadow: "none",
              padding: "5px",
            }}
            variant="contained"
            color="success"
            disabled={isFetching}
          >
            <p className="optionBtn">Sign in with demo credential</p>
            {isFetching ? (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            ) : (
              ""
            )}
          </Button>
        </div>
        <div className="signInBtn">
          <p style={{ margin: 0, display: "inline" }}>
            Don't have an account?
            <Button
              style={{ color: "white", textDecoration: "underLine" }}
              onClick={() => {
                history.push("/signup");
              }}
            >
              Sign Up
            </Button>
          </p>
          <Button
            color="warning"
            onClick={() => {
              history.push("/forgot-password");
            }}
          >
            <p className="optionBtn">Forgot Password?</p>
          </Button>
        </div>
      </div>
    </form>
  );
}

//validation schema
const formValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please provide valid email")
    .required("please fill the Email"),
  password: yup.string().required("please fill the Password"),
});

export default SignIn;
