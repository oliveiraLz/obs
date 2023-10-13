import React from "react";

import LogoObsius from "../../assets/logoObsius.png";

interface ILogoComponentProps {
  className: string;
  children: React.ReactNode;
}

export const Logo: React.FC<ILogoComponentProps> = ({ className, children }) => {
  return (
    <div className={className}>
      <img src={LogoObsius} alt="Logotipo Obsius" />
      <h2>{children}</h2>
    </div>
  );
};
