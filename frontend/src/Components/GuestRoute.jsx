// GuestRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
   
    return user.role === "doctor" ? (
      <Navigate to="/Dashboard" replace />
    ) : (
      <Navigate to="/board" replace />
    );
  }

  return children;
};

export default GuestRoute;
