import { UserType } from "./UserType";

export interface AuthType {
  acessToken: string;
  user?: UserType;
}
