import React from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Divider } from "primereact/divider";

import { useForm } from "react-hook-form";

import { Header } from "../../components/Header/Header";
import { SideMenu } from "../../components/SideMenu/SideMenu";

import { useRequests } from "../../shared/hooks/useRequests";

import { IGroupCreate } from "../../interface/IUpdate";

export const CreateGroup: React.FC = () => {
  const { loading, postGroupRequest } = useRequests();
  const navigate = useNavigate();

  const items: MenuItem[] = [{ label: "Grupo", command: () => navigate("/groups") }, { label: "Novo grupo" }];
  const home: MenuItem = { icon: "pi pi-home", command: () => navigate("/") };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGroupCreate>();

  const onSubmit = (data: IGroupCreate) => {
    const { name } = data;

    postGroupRequest({
      name,
    });
  };

  return (
    <section className="container-creategroup-page">
      <SideMenu />
      <main className="container-main-creategroup-page">
        <Header title="Novo Grupo">
          <BreadCrumb
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>

        <section className="section-main">
          <div className="create-group-bar-buttons-action">
            <div className="container-buttons">
              <Button
                icon="pi pi-arrow-left"
                label="Voltar"
                outlined
                severity="info"
                onClick={() => navigate("/groups")}
                size="small"
              />
              <Button
                onClick={handleSubmit(onSubmit)}
                icon="pi pi-save"
                severity="info"
                type="submit"
                label="Salvar"
                loading={loading}
                size="small"
              />
            </div>

            <Divider />
          </div>

          <div className="container-title">
            <h1>Criação de grupo</h1>
            <Divider align="right" />
          </div>
          <form className="container-form-data-creategroup">
            <label htmlFor="p-inputtext-lg">Nome do grupo</label>
            <InputText
              placeholder="Digite o nome do grupo"
              className={errors?.name ? "p-invalid" : "p-inputtext-lg"}
              {...register("name", { required: true })}
            />
            {errors?.name?.type === "required" && (
              <p className="message-error">
                <i className="pi pi-info-circle" />
                Campo obrigatório!
              </p>
            )}
          </form>
        </section>
      </main>
    </section>
  );
};
