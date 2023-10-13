/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { useForm } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Divider } from "primereact/divider";
import { Checkbox } from "primereact/checkbox";

import { SideMenu } from "../../components/SideMenu/SideMenu";
import { Header } from "../../components/Header/Header";

import { IUser, IUserData } from "../../interface/IUpdate";
import { IGroupsData } from "../../interface/IEditPages";

import { useRequests } from "../../shared/hooks/useRequests";
import { api } from "../../service/api";

export const EditUser: React.FC = () => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [groups, setGroups] = useState<IGroupsData[]>([]);
  const [dataUser, setDataUser] = useState<IUserData>({} as IUserData);

  const token = localStorage.getItem("authToken");
  const decoded: any = jwtDecode(token!);

  const { id } = useParams();
  const { loading, putUserRequest } = useRequests();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const items: MenuItem[] = [
    { label: "Usuários", command: () => navigate("/users") },
    { label: "Atualizar dados do usuário" },
  ];
  const home: MenuItem = { icon: "pi pi-home" };

  const handleCheckBoxChange = (e: any) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedCheckboxes([...selectedCheckboxes, id]);
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((value) => value !== id));
    }
  };

  const getGroupsData = async () => {
    await api.get<IGroupsData[]>("/groups").then(({ data }) => {
      setGroups(data);
    });
  };

  const getUserData = useCallback(() => {
    api.get(`/user/${id}`).then(({ data }) => {
      setDataUser(data);
      setSelectedCheckboxes(data.groups.map((i: any) => i.id));
    });
  }, [id]);

  const onSubmit = (data: IUser) => {
    const { name, email } = data;

    putUserRequest({
      name,
      email,
      groups: selectedCheckboxes,
    });

    navigate("/users");
  };

  useEffect(() => {
    getUserData();
    getGroupsData();
  }, [getUserData]);

  return (
    <section className="container-datauser-page">
      <SideMenu />
      <main className="container-main-datauser-page">
        <Header title="Atualizar Dados do Usuário">
          <BreadCrumb
            model={items}
            home={home}
            style={{ background: "transparent", border: "none", marginTop: "0.5rem" }}
          />
        </Header>

        <section className="section-main">
          <div className="bar-buttons-action">
            <div className="container-buttons">
              <Button
                label="Voltar"
                outlined
                icon="pi pi-arrow-left"
                severity="info"
                onClick={() => navigate("/users")}
                size="small"
              />
              {decoded.roles.includes("USUARIO_WRITE") ? (
                <Button
                  label="Salvar"
                  icon="pi pi-save"
                  severity="info"
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                  size="small"
                />
              ) : (
                ""
              )}
            </div>

            <Divider />
          </div>
          <div className="container-title">
            <h1>Dados do usuário</h1>
            <Divider align="right" />
          </div>
          <form className="container-data-form">
            <label htmlFor="p-inputtext-lg">Nome</label>
            <InputText
              placeholder="Nome"
              className={errors?.name ? "p-invalid" : "p-inputtext-lg"}
              defaultValue={dataUser.name}
              {...register("name", { required: true })}
            />
            <div>
              {errors?.name?.type === "required" && (
                <p className="message-error">
                  <i className="pi pi-info-circle" />
                  Campo obrigatório!
                </p>
              )}
            </div>
            <label htmlFor="p-inputtext-lg">E-mail</label>
            <InputText
              placeholder="Digite seu e-mail"
              className={errors?.email ? "p-invalid" : "p-inputtext-lg"}
              defaultValue={dataUser.email}
              {...register("email", { required: true })}
            />
            <div>
              {errors?.email?.type === "required" && (
                <p className="message-error">
                  <i className="pi pi-info-circle" />
                  Campo obrigatório!
                </p>
              )}
            </div>

            <div className="container-subti">
              <h1>Adicionar grupo</h1>
              <Divider align="right" />
            </div>

            <div className="section-select-groups">
              {groups.map(({ id, name }) => (
                <div className="container-group-label" key={id}>
                  <Checkbox
                    key={id}
                    id={id}
                    value={name}
                    onChange={handleCheckBoxChange}
                    checked={selectedCheckboxes.includes(id)}
                  />

                  <label htmlFor={id} className="label-groups">
                    {name}
                  </label>
                </div>
              ))}
            </div>
          </form>
        </section>
      </main>
    </section>
  );
};
