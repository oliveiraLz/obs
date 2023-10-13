import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import jwtDecode from "jwt-decode";

import ConnectionAPI, { MethodType, connectionAPIPost, connectionAPIGet } from "../functions/connectionAPI";

import { useToast } from "./toast";
import { AuthType } from "../../interface/IRequests";
import { api } from "../../service/api";

export const useRequests = () => {
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { showToast } = useToast();

  const navigate = useNavigate();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: any
  ): Promise<T | undefined> => {
    setLoading(true);

    const returnData: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        return result;
      })
      .catch(() => {
        return undefined;
      });

    setLoading(false);
    return returnData;
  };

  const getRequest = async <T>(): Promise<void> => {
    setLoading(true);

    await connectionAPIGet<T>("/groups")
      .then(() => {
        showToast({
          title: "Sucesso",
          type: "success",
          description: "Grupo cadastrado!",
        });
        navigate("/groups");
      })
      .catch(() => {
        showToast({
          title: "Erro",
          type: "error",
          description: "Não foi possível cadastrar o grupo",
        });
        setLoading(false);
      });
  };

  const postRequest = async <T>(body: any): Promise<void> => {
    setLoading(true);

    connectionAPIPost<T>("/user", body)
      .then(() => {
        showToast({
          title: "Sucesso",
          type: "success",
          description: "Você foi cadastrado!",
        });
      })
      .catch((error) => {
        showToast({
          title: "Erro",
          description: `${error}`,
          type: "error",
        });
      });
    setLoading(false);
  };

  const postGroupRequest = async <T>(body: any): Promise<void> => {
    setLoading(true);

    connectionAPIPost<T>("/groups", body)
      .then(() => {
        showToast({
          title: "Sucesso",
          type: "success",
          description: "Grupo criado!",
        });
        navigate("/groups");
      })
      .catch((error) => {
        showToast({
          title: "Erro",
          description: `${error}`,
          type: "error",
        });
      });
    setLoading(false);
  };

  const putUserRequest = async <T>(body: any): Promise<void> => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    api
      .put(`/user/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        showToast({
          title: "Sucesso",
          type: "success",
          description: "Dados atualizados!",
        });
        navigate("/users");
      })
      .catch(() => {
        showToast({
          title: "Erro",
          type: "error",
          description: "Não foi possível atualizar os dados do usuário",
        });
      });

    setLoading(false);
  };

  const putGroupRequest = async <T>(body: any): Promise<void> => {
    setLoading(true);

    api
      .put(`/groups/${id}`, body)
      .then(() => {
        showToast({
          title: "Sucesso",
          type: "success",
          description: "Permissões adicionadas!",
        });
        navigate("/groups");
      })
      .catch(() => {
        showToast({
          title: "Erro",
          type: "error",
          description: "Não foi possível adicionar as permissões!",
        });
      });

    setLoading(false);
  };

  const authRequest = async (body: any): Promise<void> => {
    setLoading(true);

    await connectionAPIPost<AuthType>("/auth/login", body)
      .then((response) => {
        localStorage.setItem("authToken", response.token);

        const token = localStorage.getItem("authToken");

        const decoded: any = jwtDecode(token!);

        localStorage.setItem("authSub", decoded.sub);

        navigate("/users");
      })
      .catch((error) => {
        showToast({
          title: "Erro",
          type: "error",
          description: `${error}`,
        });
        return undefined;
      });

    setLoading(false);
  };

  return {
    loading,
    authRequest,
    request,
    postRequest,
    postGroupRequest,
    putUserRequest,
    putGroupRequest,
    getRequest,
  };
};
