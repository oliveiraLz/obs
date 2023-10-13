import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";

export const NoRequireAuth = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/users" />;
  }

  return children;
};
