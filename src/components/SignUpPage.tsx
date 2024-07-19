import { Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CommonText } from "./CommonText.tsx";
import { createUser } from "../api.ts";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate } from "react-router-dom";

type SignUpPageProps = {
  wantToLogin: boolean;
};

export function SignUpPage({ wantToLogin = false }: SignUpPageProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [registering, setRegistering] = useState<boolean>(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && name && password) {
      await createUser({ name, email, password });
    }
  };

  useEffect(() => {
    if (wantToLogin) {
      setRegistering(false);
    }
  }, []);

  return (
    <div className="bg-green-100 h-screen w-screen flex flex-col justify-center items-center">
      <Card sx={{ width: 500, height: 500 }}>
        <div className="flex inline-flex justify-center items-center">
          <button
            title="Voltar para a página principal"
            onClick={() => navigate("/")}
          >
            <HomeRoundedIcon
              style={{ marginTop: 6, marginLeft: 12 }}
              color="success"
            />
          </button>
          <CommonText
            text={registering ? "Registrar" : "Entrar"}
            style={{ marginTop: 8, marginLeft: 160 }}
          />
        </div>
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
          {registering && (
            <label className="flex flex-col mt-2">
              Informe seu nome:
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <label className="flex flex-col mt-2">
            Informe seu email:
            <input
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col mt-2">
            Informe sua senha:
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="mt-2 text-green-500 hover:text-green-700"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? "Esconder" : "Mostrar"} senha
          </button>
          <button
            className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="submit"
          >
            Registrar
          </button>
          <button
            className={`${
              registering ? "mt-12" : "mt-32"
            } text-green-500 hover:text-green-700`}
            onClick={(e) => {
              e.preventDefault();
              setRegistering(!registering);
            }}
          >
            {registering ? "Já possuo uma conta" : "Gostaria de me registrar"}
          </button>
        </form>
      </Card>
    </div>
  );
}
