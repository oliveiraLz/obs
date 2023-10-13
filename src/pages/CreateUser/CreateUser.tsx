import React, { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";

import { useForm } from "react-hook-form";

import { Header } from "../../components/Header/Header";
import { SideMenu } from "../../components/SideMenu/SideMenu";
import { IUserCreate } from "../../interface/IUpdate";
import { api } from "../../service/api";
import { useToast } from "../../shared/hooks/toast";

export const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const items: MenuItem[] = [{ label: "Usuários", command: () => navigate("/users") }, { label: "Criar usuário" }];
  const home: MenuItem = { icon: "pi pi-home", command: () => navigate("/") };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreate>();

  const handleCreateUser = useCallback(
    async (data: IUserCreate) => {
      const { name, email, password } = data;

      await api
        .post("/user", {
          name,
          email,
          password,
        })
        .then(() => {
          showToast({
            title: "Sucesso",
            type: "success",
            description: "Usuário criado!",
          });
          navigate("/users");
        })
        .catch(() => {
          showToast({
            title: "Erro",
            type: "error",
            description: "Não foi possível criar o usuário!",
          });
        });
    },
    [navigate, showToast]
  );

  return (
    <section className="container-creategroup-page">
      <SideMenu />
      <main className="container-main-creategroup-page">
        <Header title="Novo Usuário">
          <BreadCrumb
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>

        <section className="section-main">
          <div className="create-user-bar-buttons-action">
            <div className="container-buttons">
              <Button
                label="Voltar"
                icon="pi pi-arrow-left"
                outlined
                severity="info"
                onClick={() => navigate("/users")}
                size="small"
              />
              <Button
                severity="info"
                type="submit"
                label="Salvar"
                icon="pi pi-save"
                onClick={handleSubmit(handleCreateUser)}
                size="small"
              />
            </div>

            <Divider />
          </div>

          <div className="container-title">
            <h1>Criação de usuário</h1>
            <Divider align="right" />
          </div>
          <form className="container-form-data-creategroup">
            <label htmlFor="p-inputtext-lg">Nome do usuário</label>
            <InputText
              placeholder="Digite o nome do usuário"
              className={errors?.name ? "p-invalid" : "p-inputtext-lg"}
              {...register("name", { required: true })}
            />
            {errors?.name?.type === "required" && (
              <p className="message-error">
                <i className="pi pi-info-circle" />
                Campo obrigatório!
              </p>
            )}

            <label htmlFor="p-inputtext-lg">E-mail do usuário</label>
            <InputText
              placeholder="Digite o e-mail do usuário"
              className={errors?.email ? "p-invalid" : "p-inputtext-lg"}
              {...register("email", { required: true })}
            />
            {errors?.email?.type === "required" && (
              <p className="message-error">
                <i className="pi pi-info-circle" />
                Campo obrigatório!
              </p>
            )}

            <label htmlFor="p-inputtext-lg">Senha do usuário</label>
            <InputText
              placeholder="Digite a senha do usuário"
              className={errors?.password ? "p-invalid" : "p-inputtext-lg"}
              {...register("password", { required: true })}
              type="password"
            />
            {errors?.password?.type === "required" && (
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
