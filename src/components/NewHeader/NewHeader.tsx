import React, { useState } from "react";

import { Button } from "primereact/button";

import Logo from "../../assets/ObsiusSideBar.svg";
import { NewSidebar } from "../NewSidebar/NewSidebar";

interface INewHeaderProps {
  title: string;
}

export const NewHeader: React.FC<INewHeaderProps> = ({ title }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <header className="container">
      <NewSidebar showSidebar={showSidebar} setShowSidebar={() => setShowSidebar(false)} />
      <section className="first-section-header">
        <div>
          <img src={Logo} alt="Logo Obsius" />
        </div>

        <div>
          <Button icon="pi pi-bars" text size="small" rounded onClick={() => setShowSidebar(true)} />
        </div>
      </section>
      <section className="second-section-header">
        <h1>{title}</h1>
      </section>
    </header>
  );
};
