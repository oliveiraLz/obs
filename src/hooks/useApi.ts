/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post(
      `/auth/me`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  signin: async (email: string, password: string) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("authSub");
    localStorage.removeItem("authToken");
  },
});
