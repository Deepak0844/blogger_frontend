import { lazy } from "react";

const Blogs = lazy(() => import("../../Components/Blog/Blogs"));
const Post = lazy(() => import("../../Components/Post/Post"));
const SignIn = lazy(() => import("../../Pages/SignIn/SignIn"));
const SignUp = lazy(() => import("../../Pages/SignUp/SignUp"));
const Home = lazy(() => import("../../Pages/Home/Home"));
const AccountActivatedSuccess = lazy(() =>
  import("../../Pages/AccountActivatedSuccess/AccountActivatedSuccess")
);

const PasswordChangedSuccess = lazy(() =>
  import("../../Pages/PasswordChangedSuccess/PasswordChangedSuccess")
);
const ResetPassword = lazy(() =>
  import("../../Pages/ResetPassword/ResetPassword")
);
const ForgotPassword = lazy(() =>
  import("../../Pages/ForgotPassword/ForgotPassword")
);

//these router will be access without authentication
export const openRouter = [
  {
    path: "/blog",
    component: Blogs,
    exact: true,
  },
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/post/:id",
    component: Post,
    exact: true,
  },
  {
    path: "/signin",
    component: SignIn,
    exact: true,
  },
  {
    path: "/signup",
    component: SignUp,
    exact: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    exact: true,
  },
];

export const helperRouter = [
  {
    path: "/account-verification/:token",
    component: AccountActivatedSuccess,
    exact: true,
  },
  {
    path: "/reset-password/:token",
    component: ResetPassword,
    exact: true,
  },
  {
    path: "/passwordchanged-Successfully",
    component: PasswordChangedSuccess,
    exact: true,
  },
];
