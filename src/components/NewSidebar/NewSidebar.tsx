import React from "react";

import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { Sidebar } from "primereact/sidebar";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { MenuItem } from "primereact/menuitem";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import Logo from "../../assets/ObsiusSideBar.svg";

interface INewSidebarProps {
  showSidebar: boolean | undefined;
  setShowSidebar: () => void;
}

export const NewSidebar: React.FC<INewSidebarProps> = ({ showSidebar, setShowSidebar }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const decoded: any = jwtDecode(token!);

  const items: MenuItem[] = [
    {
      label: "Controle de Acesso",
      icon: "pi pi-fw pi-lock",
      expanded: true,
      items: [
        {
          label: "Usuários",
          icon: "pi pi-fw pi-users",
          command: () => navigate("/users"),
        },
        {
          label: "Grupos",
          icon: "pi pi-fw pi-eye",
          command: () => navigate("/groups"),
        },
      ],
    },
  ];

  const confirm1 = () => {
    confirmDialog({
      message: "Deseja encerrar sua sessão?",
      header: "Encerrar sessão",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
    });
  };

  return (
    <Sidebar visible={showSidebar} onHide={setShowSidebar} className="p-sidebar">
      <ConfirmDialog />
      <div>
        <img src={Logo} alt="Logo Obsius " />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{decoded.name}</h2>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <Button icon="pi pi-sign-out" severity="info" text rounded onClick={confirm1} />
      </div>

      <div style={{ marginTop: "1.5em", display: "flex" }}>
        <PanelMenu model={items} multiple className="w-full md:w-25rem" />
      </div>
    </Sidebar>
  );
};
