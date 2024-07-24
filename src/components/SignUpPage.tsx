import { Box, Card, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate } from "react-router-dom";
import { CommonText } from "./CommonText.tsx";
import { createUser, getUser } from "../api.ts";
import { Sidebar } from "./Sidebar.tsx";
import { Header } from "./Header.tsx";

type SignUpPageProps = {
  wantToLogin: boolean;
};

export function SignUpPage({ wantToLogin = false }: SignUpPageProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registering, setRegistering] = useState<boolean>(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!registering && email && password) {
      try {
        console.log("email:", email, "password:", password);
        const response = await getUser({ username: email, password });
        if (response && response < 400) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
      return;
    }

    if (registering && email && name && password) {
      try {
        await createUser({ name, email, password });
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  useEffect(() => {
    if (wantToLogin) {
      setRegistering(false);
    }
  }, [wantToLogin]);

  useEffect(() => {
    if (registering) {
      setEmail("");
      setName("");
      setPassword("");
    }
  }, [registering]);

  const isWideScreen = useMediaQuery("(min-width: 1628px)");

  return (
    <Box
      className="bg-gradient-to-t from-gray-500 via-gray-300 to-gray-100 h-screen w-screen flex flex-col justify-center items-center"
      sx={{
        padding: 2,
        "@media (max-width: 500px)": {
          justifyContent: "flex-start",
        },
      }}
    >
      {isWideScreen ? (
        <div className="mr-20 flex">
          <Sidebar />
        </div>
      ) : (
        <div className="w-screen mb-auto -mt-4">
          <Header />
        </div>
      )}
      <Card sx={{ width: { xs: "90%", sm: 500 }, padding: 4 }}>
        <Box className="flex justify-between items-center">
          <CommonText
            text={registering ? "Registrar" : "Entrar"}
            style={{ marginLeft: 14 }}
          />
          <IconButton
            title="Voltar para a página principal"
            onClick={() => navigate("/")}
          >
            <HomeRoundedIcon color="success" />
          </IconButton>
        </Box>
        <form className="flex flex-col p-4" onSubmit={handleSubmit}>
          {registering && (
            <label className="flex flex-col mt-2">
              Informe seu nome:
              <input
                value={name}
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <label className="flex flex-col mt-2">
            Informe seu email:
            <input
              value={email}
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col mt-2">
            Informe sua senha:
            <input
              value={password}
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
            {!registering ? "Entrar" : "Registrar"}
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
    </Box>
  );
}
