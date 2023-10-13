import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";

import { DataTableGroups } from "../../components/DataTableGroup/DataTableGroup";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { Header } from "../../components/Header/Header";

export const GAAA: React.FC = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [
    { label: "Grupos" },
    { label: "Notebook" },
    { label: "Accessories" },
    { label: "Backpacks" },
    { label: "Item" },
  ];
  const home: MenuItem = { icon: "pi pi-home", url: "https:///primereact" };

  return (
    <section className="container-groups-page">
      <SideMenu />
      <main className="container-main-groups-page">
        <Header title="Grupos">
          <BreadCrumb
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>
        <section className="section-main">
          <div className="container-btn-new-group">
            <Button
              label="Novo grupo"
              severity="info"
              icon="pi pi-plus"
              size="large"
              onClick={() => navigate("/groups/register")}
            />
          </div>
          <div>a</div>
        </section>
      </main>
    </section>
  );
};
