import React from "react";

import { useNavigate } from "react-router-dom";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useForm } from "react-hook-form";

import { ILogin } from "../../interface/IAuth";

import Logo from "../../assets/Login.svg";

import { useRequests } from "../../requisicao/hooks/useRequests";

export const Login: React.FC = () => {
  const { authRequest, loading } = useRequests();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit = async (data: ILogin) => {
    const { email, password } = data;

    authRequest({
      email,
      password,
    });
  };

  return (
    <section className="container-togin-page">
      <div className="left-side-togin">
        <div className="container-logo-title">
          <img src={Logo} alt="Logo Obsius" />
          <div>
            <h1>LOGIN</h1>
          </div>
        </div>

        <div className="container-input">
          <label htmlFor="a">E-mail</label>
          <div className="p-input-icon-right">
            <i className="pi pi-envelope" />
            <InputText
              className={errors?.email ? "p-invalid" : "p-inputtext-lg"}
              placeholder="Digite seu e-mail"
              {...register("email", { required: true })}
            />
          </div>
          <div className="container-message-error">
            {errors?.email?.type === "required" && (
              <p className="message-error">
                <i className="pi pi-info-circle" />
                Campo obrigatório!
              </p>
            )}
          </div>

          <label htmlFor="a">Senha</label>
          <div className="p-input-icon-right">
            <i className="pi pi-lock" />
            <InputText
              className={errors?.password ? "p-invalid" : "p-inputtext-lg"}
              placeholder="Digite sua senha"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="container-message-error">
            {errors?.password?.type === "required" && (
              <p className="message-error">
                <i className="pi pi-info-circle" />
                Campo obrigatório!
              </p>
            )}
          </div>
        </div>

        <div className="container-button">
          <Button label="Entrar" severity="info" size="large" onClick={handleSubmit(onSubmit)} loading={loading} />
        </div>
        <div className="container-link">
          <span>
            Não possui uma conta? <Button label="Criar conta" link onClick={() => navigate("/register")} />
          </span>
          <span>
            Esqueceu a sua senha? <Button label="Recuperar senha" link />
          </span>
        </div>
      </div>
      <div className="right-side-togin">
        <h2>
          O ERP que seu <br /> instituto precisa!
        </h2>
      </div>
    </section>
  );
};
