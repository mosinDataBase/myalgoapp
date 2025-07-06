// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //const authToken = localStorage.getItem('authToken');
  const authToken = sessionStorage.getItem("authToken");
  const mobileNumber = sessionStorage.getItem("mobileNumber");

  if (!authToken && !mobileNumber) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
