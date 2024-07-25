import { Avatar, Box, Card, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate } from "react-router-dom";
import { CommonText } from "./CommonText.tsx";
import { createUser, getUser } from "../api.ts";
import { Sidebar } from "./Sidebar.tsx";
import { Header } from "./Header.tsx";
import { TokenManager } from "../helpers.ts";
import { jwtDecode } from "jwt-decode";

export function AccountSettings() {
  const [newName, setNewName] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string | null>(null);
  const tokenManager = new TokenManager();

  let user;
  if (tokenManager.getCurrentToken()) {
    user = jwtDecode(tokenManager.getCurrentToken() || "") as any;
  }
  const [media, setMedia] = useState<string | ArrayBuffer | null>(null);

  const isWideScreen = useMediaQuery("(min-width: 1628px)");
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setMedia(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("imageUpload")?.click();
  };

  const handleSubmit = () => {
    // implementar logica
  };
  if (!user) {
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
        <Card sx={{ width: { xs: "90%", sm: 800 }, padding: 4, height: 500 }}>
          <Box className="flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-2">Você não está autenticado</h1>
            <img src={"/images/4882464.jpg"} className="w-[300px] h-[300px]" />
            <p className="text-xl">
              Para prosseguir nesta página, você precisa estar autenticado no
              nosso sistema. <br /> <br />{" "}
            </p>
            <div
              className="flex flex-row space-x-7"
              style={{ justifyContent: "space-between" }}
            >
              <button onClick={() => navigate("/")}>
                <p className="mr-2 text-teal-700">
                  Prefiro voltar para a página principal...
                </p>
              </button>
              <button onClick={() => navigate("/signup")}>
                <p className="mr-2 bg-green-600 text-white shadow focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  Quero me autenticar!
                </p>
              </button>
            </div>
          </Box>
        </Card>
      </Box>
    );
  }

  const hasNoChanges = user.name === newName && user.email === newEmail;

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
      <Card sx={{ width: { xs: "90%", sm: 1000 }, padding: 4, height: 500 }}>
        <Box className="flex justify-between items-center">
          <div className="flex flex-col">
            <Avatar
              src={
                user.user_url_image ? user.user_url_image : media ?? undefined
              }
              sx={{ width: 400, height: 400 }}
            />
            <input
              type="file"
              id="imageUpload"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />
            <Box mt={2} display="flex" justifyContent="center">
              <button
                className="bg-gradient-to-b from-green-100 into-green-400 to-green-500 rounded-lg p-2"
                onClick={handleUploadClick}
              >
                {user.user_url_image ? "Alterar" : "Selecionar"} imagem
              </button>
            </Box>
          </div>
          <form className="w-[50%] mb-auto mt-auto">
            <label className="flex flex-col mb-4">
              Nome:
              <input
                value={newName || user.name}
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setNewName(e.target.value)}
              />
            </label>
            <label className="flex flex-col ">
              E-mail
              <input
                value={newEmail || user.email}
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </label>
            <button
              className={`flex mt-4 ${
                hasNoChanges ? "bg-gray-300" : "bg-yellow-300"
              } text-black rounded-lg p-2 float-right`}
              disabled={hasNoChanges}
              onClick={handleSubmit}
            >
              Enviar alterações
            </button>
          </form>
        </Box>
      </Card>
    </Box>
  );
}
