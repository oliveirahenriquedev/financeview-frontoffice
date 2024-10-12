import { zodResolver } from "@hookform/resolvers/zod";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Box, Card, IconButton, useMediaQuery } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { createUser, getUser } from "../api.ts";
import { setDelay, TokenManager } from "../helpers.ts";
import { CommonText } from "./CommonText.tsx";
import { ErrorDialog } from "./ErrorDialog.tsx";
import { Header } from "./Header.tsx";
import { PixelTracker } from "./PixelTracker.tsx";
import { Sidebar } from "./Sidebar.tsx";

type SignUpPageProps = {
  wantToLogin: boolean;
};

const tokenManager = new TokenManager();

const createSignUpSchema = (registering: boolean) =>
  z.object({
    name: registering
      ? z
          .string()
          .min(1, "Nome é obrigatório")
          .max(20, "O nome deve conter no máximo 20 caracteres")
      : z.string().optional(),
    email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  });

export function SignUpPage({ wantToLogin = false }: SignUpPageProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [registering, setRegistering] = useState<boolean>(true);
  const [screenLoading, setScreenLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const SignUpSchema = createSignUpSchema(registering);

  let user;
  if (tokenManager.getCurrentToken()) {
    user = jwtDecode(tokenManager.getCurrentToken() || "");
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  useEffect(() => {
    const fn = async () => {
      await setDelay(2500);
      setScreenLoading(false);
    };
    fn();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    if (!registering) {
      const response = await getUser({
        username: data.email,
        password: data.password,
      });
      setLoading(false);

      if (response && +response >= 400) {
        setHasError(true);
        setLoading(false);
        return;
      }

      navigate("/");
      return;
    }

    if (registering) {
      const response = await createUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response && +response >= 400) {
        setHasError(true);
        setLoading(false);
        return;
      }

      await getUser({ username: data.email, password: data.password });
      setLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (wantToLogin) {
      setRegistering(false);
    }
  }, [wantToLogin]);

  useEffect(() => {
    if (registering) {
      reset();
    }
  }, [registering, reset]);

  const isWideScreen = useMediaQuery("(min-width: 1628px)");

  if (user) {
    return (
      <Box
        className="bg-gradient-to-b from-white to-black h-screen w-screen flex flex-col justify-center items-center"
        sx={{
          padding: 2,
        }}
      >
        <Card
          sx={
            !isWideScreen
              ? {
                  width: {
                    xs: "90%",
                    sm: 1000,
                  },
                  padding: 4,
                  height: "50%",
                }
              : {
                  width: {
                    xs: "90%",
                    sm: 1000,
                  },
                  padding: 4,
                  height: 550,
                }
          }
        >
          <Box className="flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-2 text-center mt-6">
              Você já está autenticado!
            </h1>
            <img
              src={"/images/4882467.jpg"}
              className="w-[300px] h-[300px] object-cover"
            />
            <p className="text-xl text-center mb-">
              Você está acessando a Área de Login mesmo já estando
              registrado(a).
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-7">
              <button
                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 mt-4 float-right

                `}
                onClick={() => navigate("/")}
              >
                Voltar para a Home
              </button>
            </div>
          </Box>
        </Card>
      </Box>
    );
  }

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
      <PixelTracker trackedEvent={registering ? "registro" : "login"} />
      {isWideScreen ? (
        <div className="mr-20 flex">
          <Sidebar />
        </div>
      ) : (
        <div className="w-screen mb-auto -mt-4">
          <Header />
        </div>
      )}
      {screenLoading ? (
        <div className={`${!isWideScreen && "mb-auto flex"}`}>
          <div
            className={`p-4 bg-white rounded shadow w-[400px] ${
              !isWideScreen && "w-[200px]"
            }`}
          >
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-300 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
          <form className="flex flex-col p-4" onSubmit={handleSubmit(onSubmit)}>
            {registering && (
              <label className="flex flex-col mt-2">
                Informe seu nome:
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  )}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    <>{errors.name.message?.toString()}</>
                  </span>
                )}
              </label>
            )}
            <label className="flex flex-col mt-2">
              Informe seu email:
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  <>{errors.email.message?.toString()}</>
                </span>
              )}
            </label>
            <label className="flex flex-col mt-2">
              Informe sua senha:
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                )}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  <>{errors.password.message?.toString()}</>
                </span>
              )}
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
            {loading ? (
              <div className="mr-[50%] ml-[45%] mt-4 float-right">
                <div className="w-8 h-8 rounded-full absolute border-8 border-solid border-gray-200"></div>
                <div className="w-8 h-8 rounded-full animate-spin absolute border-8 border-solid border-green-500 border-t-transparent shadow-md"></div>
              </div>
            ) : (
              <button
                className="mt-4 p-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                type="submit"
              >
                {!registering ? "Entrar" : "Registrar"}
              </button>
            )}
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
      )}
      {hasError && (
        <ErrorDialog open={hasError} onClick={() => setHasError(false)} />
      )}
    </Box>
  );
}
