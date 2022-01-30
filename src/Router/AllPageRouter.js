import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../Components/Navbar/Navbar";
import ProtectedRouter from "./Protection/ProtectedRouter";
import { openRouter } from "./Open/RouterData";
import Loader from "../Components/Loader/Loader";

//routers
export default function AllPageRouters() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <NavBar />
        <Switch>
          {openRouter.map((route, index) => {
            return (
              <Route
                path={route.path}
                component={route.component}
                exact={route.exact}
                key={index}
              />
            );
          })}

          <Route
            path="/"
            name="protected pages"
            render={(props) => <ProtectedRouter {...props} />}
          />
        </Switch>
      </Suspense>
    </Router>
  );
}
