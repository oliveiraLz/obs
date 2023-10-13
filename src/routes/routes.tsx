/* eslint-disable jsx-a11y/aria-role */
import React from "react";

import jwtDecode from "jwt-decode";

import { Route, Routes } from "react-router-dom";
import { Users } from "../pages/Users/Users";
import { Login } from "../pages/Login/Login";
import { CreateUser } from "../pages/CreateUser/CreateUser";
import { EditUser } from "../pages/EditUser/EditUser";
import { Groups } from "../pages/Test/Test";
import { CreateGroup } from "../pages/CreateGroup/CreateGroup";
import { EditGroup } from "../pages/EditGroup/EditGroup";
import { Forbidden } from "../pages/Forbidden/Forbidden";
import { NotFound } from "../pages/NotFound/NotFound";
import { Home } from "../pages/Home/Home";
import { NewLayout } from "../pages/NewLayout/NewLayout";

interface IDecoded {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

const GroupRoleRoute = ({ children, Role }: any) => {
  const token = localStorage.getItem("authToken");
  const decoded: IDecoded = jwtDecode<IDecoded>(token!);
  if (decoded.roles.includes(Role || Role)) {
    return children;
  }
  return <Forbidden link="/users" />;
};

const UserRoleRoute = ({ children, Role }: any) => {
  const token = localStorage.getItem("authToken");
  const decoded: IDecoded = jwtDecode<IDecoded>(token!);
  if (decoded.roles.includes(Role || Role)) {
    return children;
  }
  return <Forbidden link="/groups" />;
};

const PublicRoute = ({ children }: any) => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return children;
  }
  return <NotFound link="/groups" text="Voltar para página inicial" />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/users"
        element={
          <UserRoleRoute Role="USUARIO_READ">
            <Users />
          </UserRoleRoute>
        }
      />
      <Route
        path="/users/register"
        element={
          <UserRoleRoute Role="USUARIO_WRITE">
            <CreateUser />
          </UserRoleRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <UserRoleRoute Role="USUARIO_READ">
            <EditUser />
          </UserRoleRoute>
        }
      />
      <Route
        path="/groups"
        element={
          <GroupRoleRoute Role="GRUPO_READ">
            <Groups />
          </GroupRoleRoute>
        }
      />
      <Route
        path="/groups/register"
        element={
          <GroupRoleRoute Role="GRUPO_WRITE">
            <CreateGroup />
          </GroupRoleRoute>
        }
      />

      <Route
        path="/groups/:id"
        element={
          <GroupRoleRoute Role="GRUPO_READ">
            <EditGroup />
          </GroupRoleRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route path="/home" element={<Home />} />
      <Route path="newlayout" element={<NewLayout />} />

      <Route path="*" element={<NotFound link="/" text="Retornar para página principal" />} />
    </Routes>
  );
};
