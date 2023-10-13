import React, { useState } from "react";

import { PanelMenu } from "primereact/panelmenu";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

interface IDecoded {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export const PanelMenuComponent: React.FC = () => {
  const navigate = useNavigate();

  const [state] = useState<boolean>(true);

  const token = localStorage.getItem("authToken");

  const decoded: IDecoded = jwtDecode<IDecoded>(token!);

  const items: MenuItem[] = [
    {
      label: "Controle de Acesso",
      style: { fontSize: "1.1rem" },
      icon: "pi pi-fw pi-lock",
      expanded: true,

      items: [
        decoded.roles.includes("USUARIO_READ")
          ? {
              label: "Usuários",
              icon: "pi pi-fw pi-users",
              command() {
                navigate("/users");
              },
            }
          : {},

        decoded.roles.includes("GRUPO_READ")
          ? {
              label: "Grupos",
              icon: "pi pi-fw pi-eye",
              command() {
                navigate("/groups");
              },
            }
          : {},
      ],
    },
  ];
  return (
    <PanelMenu
      model={items}
      className="p-panelmenu p-panelmenu-header p-panelmenu-content p-submenu-list p-menuitem p-menuitem-text p-menuitem-icon p-panelmenu-icon"
      multiple={state}
      style={{ width: "15vw", marginTop: "2.4rem", height: "auto" }}
    />
  );
};
