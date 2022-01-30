import React from "react";
import RouterProtection from "./RouterProtection";

const Create = React.lazy(() => import("../../Pages/Create/Create"));
const Profile = React.lazy(() => import("../../Pages/Profile/Profile"));

//these router will protected needs authentication
const ToProtect = [
  {
    path: "/create",
    component: Create,
    exact: true,
  },
  {
    path: "/profile",
    component: Profile,
    exact: true,
  },
];
function ProtectedRouter() {
  return (
    <div>
      {ToProtect.map((route, index) => {
        return (
          <RouterProtection
            path={route.path}
            key={index}
            component={route.component}
            exact={route.exact}
          />
        );
      })}
    </div>
  );
}

export default ProtectedRouter;
