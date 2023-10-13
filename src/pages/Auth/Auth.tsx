import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { ProgressSpinner } from "primereact/progressspinner";

import { connectionAPIPost } from "../../shared/functions/connectionAPI";

export const Auth: React.FC = () => {
  const navigate = useNavigate();

  /* useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        await connectionAPIPost("/auth/me")
          .then(() => {
            navigate("/users");
          })
          .catch(() => {
            navigate("/login");
          });
      } else {
        navigate("/login");
      }
    };
    verifyToken();
  }); */

  return (
    <section className="container-auth-page">
      <ProgressSpinner />
    </section>
  );
};
