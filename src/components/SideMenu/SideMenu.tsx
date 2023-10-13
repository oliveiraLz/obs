import React from "react";

import { PanelMenuComponent } from "../PanelMenu/PanelMenu";

import Logo from "../../assets/ObsiusSideBar.svg";

export const SideMenu: React.FC = () => {
  return (
    <nav className="container-sidemenu">
      <div className="sidemenu-left">b</div>
      <div className="sidemenu-right">
        <div className="image-sidemenu">
          <img src={Logo} alt="Logo Obsius" />
        </div>
        <br />

        <div className="options-sidemenu">
          <PanelMenuComponent />
        </div>
      </div>
    </nav>
  );
};
