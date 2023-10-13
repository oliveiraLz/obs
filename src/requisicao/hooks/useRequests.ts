import { useState } from "react";

import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { connectionAPIPost } from "../functions/connection/connectionAPI";
import { ERROR_INVALID_PASSWORD } from "../constants/errorStatus";

import { useToast } from "../../shared/hooks/toast";
import { AuthType } from "../types/AuthType";

export interface DecodedProps {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export const useRequests = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getRequest = async (url: string) => {
    setLoading(true);
  };

  const postRequest = async <T>(url: string, body: any): Promise<T | undefined> => {
    setLoading(true);

    const returnData = await connectionAPIPost<T>(url, body)
      .then(() => {})
      .catch(() => {
        return undefined;
      });

    setLoading(false);
    return undefined;
  };

  const authRequest = async (body: any): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType>("/auth/login", body)
      .then((result) => {
        showToast({
          title: "Login",
          type: "success",
          description: "Entrando...",
        });

        localStorage.setItem("authToken", result.acessToken);

        navigate("/home");

        return result;
      })

      .catch(() => {
        showToast({
          title: "Erro",
          type: "error",
          description: ERROR_INVALID_PASSWORD,
        });
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    getRequest,
    postRequest,
    authRequest,
  };
};
