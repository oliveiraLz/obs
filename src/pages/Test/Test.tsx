import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";

import { DataTableGroups } from "../../components/DataTableGroup/DataTableGroup";

import { SideMenu } from "../../components/SideMenu/SideMenu";
import { Header } from "../../components/Header/Header";
import { IGroupDataTable } from "../../interface/IDataTable";
import { api } from "../../service/api";

interface IDecoded {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export const Groups: React.FC = () => {
  const [groups, setGroups] = useState<IGroupDataTable[]>([]);
  const [dataChanged, setDataChanged] = useState<boolean>(false);

  const navigate = useNavigate();

  const items: MenuItem[] = [{ label: "Grupos" }];
  const home: MenuItem = { icon: "pi pi-home", command: () => navigate("/") };

  const token = localStorage.getItem("authToken");

  const decoded: IDecoded = jwtDecode<IDecoded>(token!);

  const getDataGroups = useCallback(() => {
    api.get<IGroupDataTable[]>("/groups").then(({ data }) => {
      setGroups(data);
    });
    setDataChanged(true);
  }, []);

  useEffect(() => {
    getDataGroups();
    setDataChanged(false);
  }, [dataChanged]);

  return (
    <section className="container-groups-page">
      <SideMenu />
      <main className="container-main-groups-page">
        <Header title="Grupos">
          <BreadCrumb
            model={items}
            home={home}
            className="breadcrumb-component"
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>
        <section className="section-main">
          <div className="container-new-group-button">
            {decoded.roles.includes("GRUPO_WRITE") ? (
              <Button
                label="Criar grupo"
                icon="pi pi-plus"
                severity="info"
                onClick={() => navigate("/groups/register")}
              />
            ) : (
              ""
            )}
          </div>
          <div className="container-data-groups">
            <DataTableGroups dataGroup={groups} />
          </div>
        </section>
      </main>
    </section>
  );
};
