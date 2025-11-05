import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user); // assuming user info stored here

  if (!user || !user.role) {
    return <Navigate to="/Signin" replace />; // Not logged in
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // Role not allowed
  }

  return children; // Authorized
};

export default ProtectedRoute;
