/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-globals */
import axios from "axios";
import { useToast } from "../shared/hooks/toast";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

const { showToast } = useToast();

export const useCrud = () => ({
  putGroup: async (token: string, uuidGroup: string, children: any) => {
    await api
      .put(
        `/groups/${uuidGroup}`,
        {
          children,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {})
      .catch(() => {});
  },

  createGroup: async (token: any, name: any) => {
    const response = await api
      .post(
        `/groups`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        showToast({
          title: "Sucesso",
          type: "success",
          description: "Grupo criado!",
        });
      })
      .catch(() => {
        showToast({
          title: "Erro",
          type: "error",
          description: "Não foi possível criar o grupo!",
        });
      });
    return response;
  },

  deleteGroup: async (token: string, uuidGroup: string) => {
    await api
      .delete(`/groups/${uuidGroup}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {})
      .catch(() => {});
  },

  putUser: async (token: string, uuidUser: string, children: any) => {
    await api
      .put(
        `/user/${uuidUser}`,
        {
          children,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {})
      .catch(() => {});
  },
});
