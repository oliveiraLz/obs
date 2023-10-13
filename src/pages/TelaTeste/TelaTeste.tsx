import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { PanelMenu } from "primereact/panelmenu";
import { MenuItem } from "primereact/menuitem";

import { Header } from "../../components/Header/Header";

export const TelaTeste: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);

  const itema: MenuItem[] = [
    { label: "Grupos", command: () => navigate("/groups") },
    { label: "Adicionar permissões" },
  ];
  const home: MenuItem = { icon: "pi pi-home", command: () => navigate("/") };

  const items: MenuItem[] = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
      expanded: true,
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          expanded: true,
          items: [
            {
              label: "Bookmark",
              icon: "pi pi-fw pi-bookmark",
            },
            {
              label: "Video",
              icon: "pi pi-fw pi-video",
            },
          ],
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      expanded: true,
      items: [
        {
          label: "Left",
          icon: "pi pi-fw pi-align-left",
        },
        {
          label: "Right",
          icon: "pi pi-fw pi-align-right",
        },
        {
          label: "Center",
          icon: "pi pi-fw pi-align-center",
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify",
        },
      ],
    },
    {
      label: "Users",
      expanded: true,
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus",
        },
      ],
    },
  ];

  return (
    <section className="container-creategroup-page">
      <main className="container-main-creategroup-page">
        <Header title="Novo Grupo">
          <BreadCrumb
            model={itema}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>

        <section className="section-main">
          <div style={{ margin: "2rem 0 0 2rem" }}>
            <Button icon="pi pi-arrow-left" outlined severity="info" onClick={() => navigate("/groups")} />
          </div>

          <div className="container-title">
            <Sidebar
              visible={visible}
              onHide={() => setVisible(false)}
              onMouseLeave={() => setVisible(false)}
              showCloseIcon={false}
            >
              <PanelMenu model={items} className="w-full md:w-25rem" multiple />
            </Sidebar>
            <Button icon="pi pi-list" severity="info" onClick={() => setVisible(true)} />
            <h1>Criação de grupo</h1>
            <Divider align="right" />
          </div>
          <form className="container-form-data-creategroup">
            <label htmlFor="p-inputtext-lg">Nome do grupo</label>
            <InputText placeholder="Digite o nome do grupo" className="ddsd" />

            <Button severity="info" type="submit" label="Criar grupo" size="large" />
          </form>
        </section>
      </main>
    </section>
  );
};
