import React from "react";

import { useNavigate } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";

import { Header } from "../../components/Header/Header";
import { SideMenu } from "../../components/SideMenu/SideMenu";

export const Permissions: React.FC = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [{ label: "Permissões" }];
  const home: MenuItem = { icon: "pi pi-home", command: () => navigate("/") };

  return (
    <section className="container-permissions-page">
      <SideMenu />
      <main className="container-main-permissions-page">
        <Header title="Controle de Permissões">
          <BreadCrumb
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>

        <section className="section-main">
          <></>
        </section>
      </main>
    </section>
  );
};
