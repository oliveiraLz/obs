// Interfaces de propriedades de tabelas de Grupos, Usuários e Permissões

export interface IPermissionsOptions {
  id: string;
  name: string;
}

export interface IPermissionsData {
  id: string;
  name: string;
}

export type AccessLevel = "READ" | "WRITE" | "DELETE";

export interface AccessLevelElement<T> {
  label: string;
  role: T;
}
type AccessLevelMap = {
  [role in AccessLevel]: AccessLevelElement<role>;
};

export const accessLevelMap: AccessLevelMap = {
  READ: {
    label: "Leitura",
    role: "READ",
  },
  WRITE: {
    label: "Escrita",
    role: "WRITE",
  },
  DELETE: {
    label: "Deletar",
    role: "DELETE",
  },
};
