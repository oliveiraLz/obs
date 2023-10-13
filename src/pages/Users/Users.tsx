import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";

import { SideMenu } from "../../components/SideMenu/SideMenu";
import { Header } from "../../components/Header/Header";
import { DataTableUsers } from "../../components/DataTableUsers/DataTableUsers";
import { IUserDataTable } from "../../interface/IDataTable";
import { api } from "../../service/api";

interface IDecoded {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export const Users: React.FC = () => {
  const [dataUsers, setDataUsers] = useState<IUserDataTable[]>([]);
  const [dataChanged, setDataChanged] = useState<boolean>(false);

  const navigate = useNavigate();

  const items: MenuItem[] = [{ label: "Usuários" }];
  const home: MenuItem = { icon: "pi pi-home", command: () => navigate("/") };

  const token = localStorage.getItem("authToken");

  const decoded: IDecoded = jwtDecode<IDecoded>(token!);

  const getDataUsers = useCallback(() => {
    api.get<IUserDataTable[]>("/user").then(({ data }) => {
      setDataUsers(data);
    });
    setDataChanged(true);
  }, []);

  useEffect(() => {
    getDataUsers();
    setDataChanged(false);
  }, [dataChanged]);

  return (
    <section className="container-users-page">
      <SideMenu />
      <main className="container-main-users-page">
        <Header title="Usuários">
          <BreadCrumb
            className="p-breadcrumb"
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>

        <section className="section-main">
          <div className="container-new-user-button">
            {decoded.roles.includes("USUARIO_WRITE") ? (
              <Button
                label="Criar usuário"
                icon="pi pi-plus"
                severity="info"
                onClick={() => navigate("/users/register")}
              />
            ) : (
              ""
            )}
          </div>
          <div className="container-data-user">
            <DataTableUsers dataUser={dataUsers} />
          </div>
        </section>
      </main>
    </section>
  );
};
