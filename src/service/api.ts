import axios from "axios";
// import { store } from "../redux/configStore";
// import { showErrorPage } from "../redux/errorPageSlice";

const token = localStorage.getItem("authToken");

export const api = axios.create({
  baseURL: "http://10.1.1.4:3001",
  headers: { Authorization: `Bearer ${token}` },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response && error.response.status === 401 && error.response.data.titulo.includes("JWT expired at")) {
    //   store.dispatch(showErrorPage());
    // }

    return Promise.reject(error);
  }
);
