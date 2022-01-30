import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RouterProtection(props) {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.data);

  if (user && token !== null) {
    //token and userinfo is not null protected routes will accessible
    return <Route {...props} />;
  } else {
    //return to sign in page
    return <Redirect to="/signin" />;
  }
}
