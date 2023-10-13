/* eslint-disable no-undef */
import React from "react";

import { useNavigate } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

import { Header } from "../../components/Header/Header";
import { SideMenu } from "../../components/SideMenu/SideMenu";

export const NewJob: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = () => {};

  const items: MenuItem[] = [{ label: "Vagas", command: () => navigate("/job") }, { label: "Nova vaga" }];
  const home: MenuItem = { icon: "pi pi-home", command: () => navigate("/") };
  return (
    <section className="container-newjob-page">
      <SideMenu />
      <main className="container-main-newjob-page">
        <Header title="Nova vaga">
          <BreadCrumb
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>

        <section className="section-main" style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <div className="title-main">
              <h1>Dados da vaga</h1> <Divider type="solid" align="right" />
            </div>

            <form className="container-form-new-job">
              <label htmlFor="a">Título</label>
              <InputText placeholder="Digite o título" className="input-form" />

              <label htmlFor="a">Subtítulo</label>
              <InputText placeholder="Digite o subtítulo" className="input-form" />

              <label htmlFor="a">Descrição</label>
              <InputTextarea
                autoResize
                rows={7}
                className="p-inputtextarea"
                style={{ background: "#f1f5f9", border: "none", marginTop: "0.5rem", borderRadius: "0.7rem" }}
                placeholder="Digite a descrição"
              />

              <div className="container-details">
                <span>Imagem da vaga</span>
                <ul>
                  A imagem deve possuir:
                  <li>Resolução igual ou maior que A x B;</li>
                  <li>Proporção Y x Z;</li>
                  <li>Menos de X kb;</li>
                </ul>
              </div>

              <div className="container-buttons">
                <Button label="Adicionar imagem" icon="pi pi-upload" outlined className="btn-upload" severity="info" />
                <br />
                <Button
                  icon="pi pi-plus"
                  label="Adicionar vaga"
                  className="btn-add"
                  severity="info"
                  onClick={onSubmit}
                />
              </div>
            </form>
          </div>
        </section>
      </main>
    </section>
  );
};
