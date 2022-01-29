import "./App.css";
import AllPageRouters from "./Router/AllPageRouter";
import { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { helperRouter } from "./Router/Open/RouterData";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Loader from "./Components/Loader/Loader";
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            {helperRouter.map((route, index) => {
              return (
                <Route
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                  key={index}
                />
              );
            })}

            <AllPageRouters />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
