// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  debugger;
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
