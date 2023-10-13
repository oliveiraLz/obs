import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "./AuthContext";
import { api } from "../../service/api";

export const RequireAuth = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  return children;
};
