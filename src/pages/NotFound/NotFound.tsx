import React from "react";

import { Link } from "react-router-dom";

import { INotFound } from "../../interface/IComponents";

import Error404 from "../../assets/404.svg";

export const NotFound: React.FC<INotFound> = ({ link, text }) => {
  return (
    <section className="container-notfound-page">
      <div className="container-img-link">
        <div>
          <img src={Error404} alt="Imagem erro 404" />
        </div>
        <div className="container-text-404">
          <h1>Ooops... Página não encontrada!</h1>
          <Link to={link}>{text}</Link>
        </div>
      </div>
    </section>
  );
};
