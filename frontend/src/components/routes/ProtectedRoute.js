import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({
  isAuthenticated,
  children,
  redirect = "/login",
  isAdmin=false

}) => {
  const { user } = useSelector((state) => state.user);
  // if (!isAuthenticated) {
  //   console.log("in isA")
  //   return <Navigate to={redirect} />;
  // }
  // if (isAdmin === true && user.role !== "admin") {
  //  console.log("in isAdmin")
  //   return <Navigate to="/login" />;
  // }
  

  return children ? children : <Outlet />;
};

export default ProtectedRoute;