import axios, { AxiosRequestConfig } from "axios";
import { MethodsEnum } from "../enum/methods.enum";

export type MethodType = "get" | "post" | "put" | "patch" | "delete";

const token = localStorage.getItem("authToken");

export default class ConnectionAPI {
  static async call<T>(url: string, method: MethodType, body?: Object): Promise<T> {
    const config: AxiosRequestConfig = {
      baseURL: "http://10.1.1.4:3001",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    switch (method) {
      case MethodsEnum.POST:
      case MethodsEnum.PUT:
      case MethodsEnum.PATCH:
        return (await axios[method]<T>(url, body, config)).data;
      case MethodsEnum.GET:
      case MethodsEnum.DELETE:
      default:
        return (await axios[method]<T>(url, config)).data;
    }
  }

  static async connect<T>(url: string, method: MethodType, body?: Object): Promise<T> {
    return ConnectionAPI.call<T>(url, method, body).catch((error) => {
      if (error) {
        console.log(error.response.data.message);
      }
      throw new Error(`${error.response.data.message}`);
    });
  }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.GET);
};

export const connectionAPIPost = async <T>(url: string, body?: Object): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.POST, body);
};

export const connectionAPIPut = async <T>(url: string, body: Object): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.PUT, body);
};

export const connectionAPIPatch = async <T>(url: string, body: Object): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.PATCH, body);
};

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, MethodsEnum.DELETE);
};
