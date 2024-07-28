import { Avatar, Box, Card, IconButton, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar.tsx";
import { Header } from "./Header.tsx";
import { setDelay, TokenManager } from "../helpers.ts";
import { jwtDecode } from "jwt-decode";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUser, getUserImage, putUserInfo } from "../api.ts";
import { ErrorDialog } from "./ErrorDialog.tsx";
import { useAsyncCallback } from "react-async-hook";

export function AccountSettings() {
  const [loading, setLoading] = useState<boolean>(false);
  const [screenLoading, setScreenLoading] = useState<boolean>(true);
  const [newName, setNewName] = useState<string | null | undefined>(undefined);
  const [newEmail, setNewEmail] = useState<string | null>();
  const [newMedia, setNewMedia] = useState<string | ArrayBuffer | null>(null);
  const [media, setMedia] = useState<string | ArrayBuffer | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const tokenManager = new TokenManager();

  let user;
  if (tokenManager.getCurrentToken()) {
    user = jwtDecode(tokenManager.getCurrentToken() || "") as any;
  }

  useEffect(() => {
    const fn = async () => {
      await setDelay(2000);
      setScreenLoading(false);
    };
    fn();
  });

  let img;

  useEffect(() => {
    const fn = async () => {
      if (user) {
        img = await getUserImage(user.user_id, tokenManager.getCurrentToken());
        setNewName(user.name);
        setNewEmail(user.email);
        setMedia(img.url_image);
        console.log("test ", img);
      }
    };

    fn();
  }, []);

  const isWideScreen = useMediaQuery("(min-width: 1519px)");
  const isMobileScreen = useMediaQuery("(max-width: 1012px)");

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMedia(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById("imageUpload")?.click();
  };

  if (!user) {
    return (
      <Box
        className="bg-gradient-to-b from-white to-black h-screen w-screen flex flex-col justify-center items-center"
        sx={{
          padding: 2,
        }}
      >
        <Card
          sx={
            !isMobileScreen
              ? !isWideScreen
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
              : {
                  width: "100%",
                  marginTop: "auto",
                  height: "60%",
                  marginBottom: "auto",
                  overflow: "auto",
                }
          }
        >
          <Box className="flex flex-col justify-center items-center">
            <h1 className="text-4xl mb-2 text-center mt-6">
              Você não está autenticado
            </h1>
            <img
              src={"/images/4882464.jpg"}
              className="w-[300px] h-[300px] object-cover"
            />
            <p className="text-xl text-center">
              Para prosseguir nesta página, você precisa estar autenticado no
              nosso sistema. <br /> <br />
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-7">
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
  let submitCount = 0;
  const handleSubmit = async (e) => {
    if (newName || newEmail || media) {
      e.preventDefault();
      setLoading(true);

      const response = await putUserInfo(
        user.user_id,
        {
          name: newName || user.name,
          email: newEmail || user.email,
          url_image: newMedia || media,
        },
        tokenManager.getCurrentToken()
      );

      console.log("res", response);
      submitCount++;
      if (response && response >= 400) {
        setHasError(true);
        setLoading(false);
        return;
      }

      window.location.reload();
      setLoading(false);
    }
  };

  const hasNoChanges =
    (user.name === newName && user.email === newEmail && newMedia === media) ||
    (newMedia === null && media === null && submitCount > 0);

  return (
    <Box
      className="bg-gradient-to-b from-white to-black h-screen w-screen flex flex-col justify-center items-center "
      sx={{
        padding: 2,
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
      {screenLoading ? (
        <div className={`${isMobileScreen && "mb-auto flex"}`}>
          <div className="p-4 bg-white rounded shadow w-[400px]">
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
        <Card
          sx={
            !isMobileScreen
              ? !isWideScreen
                ? {
                    width: {
                      xs: "90%",
                      sm: 1000,
                    },
                    padding: 4,
                    height: 550,
                    marginBottom: "auto",
                  }
                : {
                    width: {
                      xs: "90%",
                      sm: 1000,
                    },
                    padding: 4,
                    height: 550,
                  }
              : {
                  width: "100%",
                  marginTop: "auto",
                  marginBottom: "auto",
                  height: "80%",
                  overflow: "auto",
                }
          }
        >
          <h2
            className={`flex font-semibold text-2xl justify-center align-center mb-4 mt-2 ${
              isMobileScreen && "mt-8"
            }`}
          >
            Informações da conta
          </h2>
          <Box
            className="flex justify-between items-center "
            sx={{
              flexDirection: isMobileScreen ? "column" : "row",
            }}
          >
            <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
              <Avatar
                // @ts-ignore
                src={newMedia ?? media}
                sx={
                  isMobileScreen
                    ? {
                        width: 200,
                        height: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                      }
                    : { width: 400, height: 400 }
                }
              />
              <input
                type="file"
                id="imageUpload"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
              <Box
                mt={2}
                display={`${isMobileScreen ? "flex-column" : undefined}`}
                justifyContent="space-between"
              >
                <button
                  type="button"
                  className={`max-w-[240px] py-2 px-4 flex justify-center align-center  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mr-auto ${
                    isMobileScreen && "mb-2 w-[280px] mt-4"
                  }`}
                  style={
                    isMobileScreen
                      ? { marginLeft: "auto", marginRight: "auto" }
                      : undefined
                  }
                  onClick={handleUploadClick}
                  disabled={loading}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="mr-2"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"></path>
                  </svg>
                  {media || newMedia ? "Alterar" : "Selecionar"} imagem
                </button>
                <button
                  className={`middle none center mr-3 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-2 px-6 font-sans text-base font-bold  text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-4 w-[80%] ${
                    isMobileScreen && "ml-0 mb-4"
                  }`}
                  data-ripple-light="true"
                  onClick={(e) => {
                    e.preventDefault();
                    setNewMedia(null);
                    setMedia(null);
                  }}
                  disabled={(!media && !newMedia) || loading}
                >
                  <DeleteIcon sx={{ marginBottom: 0.2 }} />
                </button>
              </Box>
            </div>
            <form
              className={`w-full ml-20 mb-auto mt-auto ${
                isMobileScreen && "w-[50%] mr-20"
              }`}
            >
              <label className="flex flex-col mb-4">
                Nome:
                <input
                  value={newName || user.name}
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setNewName(e.target.value)}
                  disabled={loading}
                />
              </label>
              <label className="flex flex-col ">
                E-mail
                <input
                  value={newEmail || user.email}
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setNewEmail(e.target.value)}
                  disabled={loading}
                />
              </label>

              {loading ? (
                <div className="mr-8 mt-4 float-right">
                  <div className="w-8 h-8 rounded-full absolute border-8 border-solid border-gray-200"></div>
                  <div className="w-8 h-8 rounded-full animate-spin absolute border-8 border-solid border-green-500 border-t-transparent shadow-md"></div>
                </div>
              ) : (
                <button
                  className={
                    hasNoChanges
                      ? `bg-gray-500 border-gray-700 text-white py-2 px-4 float-right mt-4 ${
                          isMobileScreen && "w-[100%]"
                        }`
                      : `bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 mt-4 float-right  ${
                          isMobileScreen && "w-[100%]"
                        }`
                  }
                  onClick={handleSubmit}
                  disabled={hasNoChanges}
                >
                  Enviar alterações
                </button>
              )}
            </form>
          </Box>
        </Card>
      )}
      {hasError && (
        <ErrorDialog open={hasError} onClick={() => setHasError(false)} />
      )}
    </Box>
  );
}
