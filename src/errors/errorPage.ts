import { IAppError } from "./AppErrorInterfaces";

export const errorErrors: IAppError[] = [
  {
    code: "Não foi possível carregar os erros",
    title: "Não foi possível carregar a listagem de erros.",
    message: "Tente novamente mais tarde, ou entre em contato com um administrador",
  },
  {
    code: "Não foi possível editar o erro",
    message: "Não foi possível atualizar o erro.",
  },
];
