// Interfaces de atualização de Grupos e Usuários

export interface IGroup {
  role: string;
}

export interface IGroupCreate {
  name: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

export interface IUserData {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUser {
  name: string;
  email: string;
  group?: string;
}
