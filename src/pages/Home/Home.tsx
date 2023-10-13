import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NewHeader } from "../../components/NewHeader/NewHeader";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const decoded: any = jwtDecode(token!);

  /* useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    if (decoded.roles.includes("USUARIO_READ" && "GRUPO_READ")) {
      navigate("/users");
    }

    if (decoded.roles.includes("USUARIO_READ")) {
      navigate("/users");
    }
    if (decoded.roles.includes("GRUPO_READ")) {
      navigate("/groups");
    }
  }, []); */

  return (
    <div className="container-home-page">
      <NewHeader title="Home" />

      <div className="container-welcome">
        <h1 className="animate__animated animate__backInLeft">Bem vindo : {decoded.name}</h1>
      </div>
    </div>
  );
};
