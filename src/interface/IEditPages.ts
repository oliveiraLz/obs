// Interfaces de requisições de todas as páginas de edição

export interface IUserData {
  id: string;
  name: string;
  email: string;
}

export interface IGroupsData {
  checked: boolean;
  id: string;
  name: string;
  permissions?: [
    {
      name_role: string;
      id: string;
      name: string;
    }
  ];
}
