import React from "react";

import { useNavigate } from "react-router-dom";

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import jwtDecode from "jwt-decode";

import { IDecoded, ITitle } from "../../interface/IComponents";

export const Header: React.FC<ITitle> = ({ title, children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const decoded: IDecoded = jwtDecode(token!);

  const logoutDialog = () => {
    confirmDialog({
      message: "Deseja encerrar sua sessão?",
      header: "Encerrar sessão",
      icon: "pi pi-info-circle",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept() {
        localStorage.removeItem("authToken");
        navigate("/login");
      },
    });
  };

  return (
    <header className="header-main">
      <div className="container-left-header">
        <div>
          <h1>{title}</h1>
          {children}
          <ConfirmDialog />
        </div>
      </div>
      <div className="container-right-header">
        <div className="data-right-header">
          <h2>{decoded.name}</h2>
          <h5>{decoded.email}</h5>
        </div>
        <div>
          <Avatar
            icon="pi pi-user"
            size="xlarge"
            shape="circle"
            style={{ background: "#2196F3", color: "#fff", border: "none" }}
          />
        </div>
        <div>
          <Button icon="pi pi-sign-out" rounded text severity="info" onClick={logoutDialog} />
        </div>
      </div>
    </header>
  );
};
