import React from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

import ForbiddenImage from "../../assets/403.svg";

interface ILink {
  link: string;
}

export const Forbidden: React.FC<ILink> = ({ link }) => {
  const navigate = useNavigate();
  return (
    <section className="container-forbidden">
      <div>
        <img src={ForbiddenImage} alt="Imagem erro 403" className="container-image-error" />
      </div>

      <div className="container-text">
        <h1 className="text-descritive">
          Ooops... Parece que você não possui <br />
          permissão para acessar essa página!
        </h1>

        <Link className="link-back" to={link}>
          Retornar para página principal
        </Link>
      </div>
    </section>
  );
};
