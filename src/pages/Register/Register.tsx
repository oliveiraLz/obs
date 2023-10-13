import React from "react";

import validator from "validator";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useRequests } from "../../shared/hooks/useRequests";
import { IRegister } from "../../interface/IAuth";

import Logo from "../../assets/Login.svg";

export const Register: React.FC = () => {
  const { postRequest, loading } = useRequests();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegister>();

  const watchPassword = watch("password");

  const onSubmit = (data: IRegister) => {
    const { name, email, password } = data;

    postRequest({
      name,
      email,
      password,
    });
  };

  return (
    <section className="container-begister-page">
      <div className="left-side-begister">
        <h2>
          O ERP que seu <br /> instituto precisa!
        </h2>
      </div>
      <div className="right-side-begister">
        <div className="container-logo-title">
          <img src={Logo} alt="Logo Obsius" />
          <div>
            <h1>CADASTRO</h1>
          </div>
        </div>
        <div className="container-input">
          <label htmlFor="a">Nome</label>
          <div className="p-input-icon-right">
            <i className="pi pi-user" />
            <InputText
              className={errors?.name ? "p-invalid" : "p-inputtext-lg"}
              placeholder="Digite seu nome"
              {...register("name", { required: true })}
            />
          </div>
          {errors?.name?.type === "required" && (
            <p className="message-error">
              <i className="pi pi-info-circle" />
              Campo obrigatório!
            </p>
          )}

          <label htmlFor="a">E-mail</label>
          <div className="p-input-icon-right">
            <i className="pi pi-envelope" />
            <InputText
              className={errors?.email ? "p-invalid" : "p-inputtext-lg"}
              placeholder="Digite seu e-mail"
              {...register("email", { required: true, validate: (value) => validator.isEmail(value) })}
            />
          </div>
          {errors?.email?.type === "required" && (
            <p className="message-error">
              <i className="pi pi-info-circle" />
              Campo obrigatório!
            </p>
          )}

          {errors?.email?.type === "validate" && (
            <p className="message-error">
              <i className="pi pi-info-circle" />
              E-mail inválido!
            </p>
          )}

          <label htmlFor="a">Senha</label>
          <div className="p-input-icon-right">
            <i className="pi pi-lock" />
            <InputText
              className={errors?.password ? "p-invalid" : "p-inputtext-lg"}
              type="password"
              placeholder="Digite sua senha"
              {...register("password", { required: true })}
            />
          </div>
          {errors?.password?.type === "required" && (
            <p className="message-error">
              <i className="pi pi-info-circle" />
              Campo obrigatório!
            </p>
          )}

          <label htmlFor="a">Repita sua senha</label>
          <div className="p-input-icon-right">
            <i className="pi pi-lock" />
            <InputText
              className={errors?.confirmPassword ? "p-invalid" : "p-inputtext-lg"}
              placeholder="Digite novamente sua senha"
              type="password"
              {...register("confirmPassword", { required: true, validate: (value) => value === watchPassword })}
            />
          </div>
          {errors?.confirmPassword?.type === "required" && (
            <p className="message-error">
              <i className="pi pi-info-circle" />
              Campo obrigatório!
            </p>
          )}

          {errors?.confirmPassword?.type === "validate" && (
            <p className="message-error">
              <i className="pi pi-info-circle" />
              As senhas não coincidem!
            </p>
          )}
        </div>
        <div className="container-button">
          <Button label="Criar conta" severity="info" size="large" onClick={handleSubmit(onSubmit)} type="submit" />
        </div>
        <div className="container-link">
          <span>
            Já possui uma conta?
            <Button label="Fazer login" link onClick={() => navigate("/login")} loading={loading} />
          </span>
        </div>
      </div>
    </section>
  );
};
