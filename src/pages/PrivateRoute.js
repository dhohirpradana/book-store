import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../contexts/user";
import Home from "./Home";

const PrivateRoute = () => {
  const [userContext] = useContext(UserContext);
  return userContext.isLogin ? <Outlet /> : <Home />;
};

export default PrivateRoute;
