import React from "react";

import { useNavigate } from "react-router-dom";

import { MenuItem } from "primereact/menuitem";

import { BreadCrumb } from "primereact/breadcrumb";
import { Header } from "../../components/Header/Header";
import { SideMenu } from "../../components/SideMenu/SideMenu";

export const Job: React.FC = () => {
  const navigate = useNavigate();

  const items: MenuItem[] = [{ label: "Vagas" }];
  const home: MenuItem = { icon: "pi pi-home", command: () => navigate("/") };

  return (
    <section className="container-job-page">
      <SideMenu />
      <main className="container-main-job-page">
        <Header title="Vagas">
          <BreadCrumb
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>

        <section className="section-main">
          <div className="container">VAGAS</div>
        </section>
      </main>
    </section>
  );
};
