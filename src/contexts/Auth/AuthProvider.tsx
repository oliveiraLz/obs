/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from "react";

import jwtDecode from "jwt-decode";
import { useApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  const setToken = (token: any) => {
    localStorage.setItem("authToken", token);
  };

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);

    if (data.acessToken) {
      setToken(data.acessToken);

      const token = localStorage.getItem("authToken");

      const decoded: any = jwtDecode(token!);

      localStorage.setItem("authSub", decoded.sub);

      setUser(decoded);

      return true;
    }

    return false;
  };

  const signout = () => {
    api.logout();
    setUser(null);
  };

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data) {
          setUser(data.user);
        }
      }
    };
    validateToken();
  }, []);

  return <AuthContext.Provider value={{ user, signin, signout }}>{children}</AuthContext.Provider>;
};
