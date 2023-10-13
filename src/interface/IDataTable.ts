// Interfaces de tabela de Grupos, Usuários e Permissões

import { AccessLevel } from "./IDataTableProps";

export interface IUserDataTable {
  id: string;
  name: string;
  email: string;
  groups?: {
    id: string;
    name: string;
  }[];
}

export interface IGroupDataTable {
  id: string;
  name: string;
  permissions?: IGroupPropsDataTable[];
}

interface IGroupPropsDataTable {
  id: string;
  name: string;
}

export interface IPermissionsDataTable {
  name: string;
  features?: FeaturesDataTable[];
}

export interface FeaturesDataTable {
  name: string;
  description: string;
  roles: RolesDataTable[];
}

export interface RolesDataTable {
  id: string;
  name: string;
  short: AccessLevel;
}

// Interfaces de linhas de tabela de Grupos e Usuários

export interface IRowUsers {
  id: string | number;
}

export interface IRowGroups {
  id: string | number;
}
