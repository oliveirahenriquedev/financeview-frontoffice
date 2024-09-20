import { zodResolver } from "@hookform/resolvers/zod";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Avatar, Card, Rating, useMediaQuery } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { defaultDevsInfo, TokenManager } from "../helpers.ts";
import { sendReview } from "../service/api.ts";
import DefaultAlert from "./DefaultAlert.tsx";
import { ErrorDialog } from "./ErrorDialog.tsx";
import { Header } from "./Header.tsx";
import { NotAuthenticatedDialog } from "./NotAuthenticatedDialog.tsx";
import { Sidebar } from "./Sidebar.tsx";

const tokenManager = new TokenManager();

const reviewSchema = z.object({
  rating: z.string().min(0.5, "Selecione uma avaliação"),
  description: z.string().min(1, "A descrição deve estar preenchida."),
});

export function AboutUs() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [notAuthenticated, setNotAuthenticated] = useState<boolean>(false);
  const isWideScreen = useMediaQuery("(min-width: 1628px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 1201px) and (max-width: 1627px)"
  );
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  const onSubmit = async (data) => {
    if (!tokenManager.getCurrentToken()) {
      setNotAuthenticated(true);
      return;
    }
    const user = jwtDecode(tokenManager.getCurrentToken() || "") as any;
    if (user) {
      setLoading(true);
      const response = await sendReview(
        {
          user_id: user.user_id,
          description: data.description,
          rating: data.rating,
        },
        tokenManager.getCurrentToken()
      );

      if (response && response < 400) {
        setHasError(true);
      }
      setLoading(false);
      setAlertOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {isWideScreen ? (
        <div className="mr-20 flex">
          <Sidebar />
        </div>
      ) : (
        <div className="flex justify-center">
          <Header />
        </div>
      )}
      <div
        className={`bg-gradient-to-b from-white to-black flex ${
          isSmallScreen ? "flex-col items-center" : "flex-row justify-center"
        }`}
      >
        <Card
          sx={{
            height: !isSmallScreen ? "800px" : "auto",
            width: isWideScreen ? "40%" : isMediumScreen ? "60%" : "80%",
            marginTop: 8,
            marginLeft: isMediumScreen ? "24px" : isWideScreen ? 40 : "auto",
            marginRight: isWideScreen ? "0px" : "auto",
          }}
          className="animate-fade-in"
        >
          <p
            className={`flex justify-center font-inter ${
              isSmallScreen ? "text-3xl" : "text-6xl"
            } mt-2`}
          >
            Sobre a <span className="text-yellow-500 ml-4">FinanceView</span>
          </p>
          <p className="flex mt-4 text-xl p-4 font-inter">
            FinanceView é uma startup criada com o objetivo de facilitar o
            acesso dos usuários ao mercado de ações. <br />
            <br /> Oferecendo uma plataforma intuitiva e gratuita, a FinanceView
            permite que os usuários acompanhem as variações de preços e
            tendências de mercado de forma rápida e eficiente. <br />
            <br />
            Através de ferramentas avançadas e uma interface amigável, os
            usuários podem entender melhor os movimentos do mercado e tomar
            decisões informadas sobre seus investimentos. FinanceView se dedica
            a democratizar o conhecimento financeiro, tornando-o acessível para
            todos.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center align-center p-2 ml-2 font-inter">
              <p>
                Envie uma avaliação! Seu feedback nos ajuda a melhorar o sistema
              </p>
            </div>
            <div className="flex justify-center align-center">
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating {...field} precision={0.5} disabled={loading} />
                )}
              />
            </div>
            {errors.rating && (
              <p className="text-red-500 text-center mt-2">
                <>{errors.rating.message}</>
              </p>
            )}
            <div>
              <label
                className={`flex flex-col mt-2 p-4 font-inter ${
                  errors.root && "mt-8"
                }`}
              >
                Diga um pouco mais da sua experiência
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className={`mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none ${
                        errors.description &&
                        "border-red-500 focus:ring-red-500"
                      }`}
                      rows={6}
                      placeholder="Digite aqui..."
                      disabled={loading}
                    />
                  )}
                />
              </label>
              {errors.description && (
                <p className="text-red-500 text-center mt-2">
                  <>{errors.description.message}</>
                </p>
              )}
              {loading ? (
                <div className="flex mr-4 mt-2 mb-4 float-right">
                  <div className="w-8 h-8 rounded-full absolute border-8 border-solid border-gray-200"></div>
                  <div className="w-8 h-8 rounded-full animate-spin border-8 border-solid border-green-500 border-t-transparent shadow-md"></div>
                </div>
              ) : (
                <button
                  className="flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-700 rounded transform transition duration-200 ease-in-out hover:-translate-y-1 hover:scale-110 mt-4 float-right mb-4 mr-4"
                  type="submit"
                  disabled={loading}
                  color={loading ? "gray" : undefined}
                >
                  Enviar avaliação
                </button>
              )}
            </div>
          </form>
        </Card>
        {alertOpen && isSmallScreen && (
          <DefaultAlert
            message="Sua avaliação foi registrada com sucesso"
            onClick={() => setAlertOpen(false)}
          />
        )}
        <Card
          sx={{
            height: !isSmallScreen ? "800px" : "auto",
            width: isWideScreen ? "35%" : isMediumScreen ? "60%" : "80%",
            marginTop: 8,
            marginLeft: isSmallScreen || isMediumScreen ? "24px" : "auto",
            marginRight: isWideScreen
              ? 10
              : isSmallScreen || isMediumScreen
              ? "24px"
              : "auto",
            marginBottom: 1,
          }}
          className="animate-fade-in"
        >
          <p
            className={`flex justify-center font-inter ${
              isSmallScreen ? "text-3xl" : "text-6xl"
            } mt-2`}
          >
            Desenvolvedores
          </p>
          <Carousel
            showArrows={false}
            autoPlay
            infiniteLoop
            showStatus={false}
            interval={10000}
            showThumbs={false}
            showIndicators={true}
          >
            {defaultDevsInfo.map((dev) => (
              <div className="flex flex-col justify-center align-center p-8">
                <Avatar
                  className="mb-5 mt-2"
                  src={dev.imagePath}
                  style={{
                    width: "30%",
                    height: "30%",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                />
                <p className="mb-1 text-xl font-inter">{dev.name}</p>
                <p className="mb-10">{dev.description}</p>
                <button
                  className="mb-2 flex flex-row justify-center text-gray-700"
                  onClick={() => window.open(dev.githubUrl, "_blank")}
                >
                  <GitHubIcon />
                  <p className="ml-2">Confira meu GitHub</p>
                </button>
                <button
                  className="mb-16 flex flex-row justify-center text-blue-500"
                  onClick={() => window.open(dev.linkedinUrl, "_blank")}
                >
                  <LinkedInIcon />
                  <p className="ml-2">Confira meu LinkedIn</p>
                </button>
              </div>
            ))}
          </Carousel>
        </Card>
      </div>
      {hasError && (
        <ErrorDialog open={hasError} onClick={() => setHasError(false)} />
      )}
      {notAuthenticated && (
        <NotAuthenticatedDialog
          open={notAuthenticated}
          onClose={() => setNotAuthenticated(false)}
          navigate={(path) => {
            setNotAuthenticated(false);
            navigate(path);
          }}
        />
      )}
      {alertOpen && !isSmallScreen && (
        <div className="w-[20%] ml-auto mr-[50%]">
          <DefaultAlert
            message="Sua avaliação foi registrada com sucesso"
            onClick={() => setAlertOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
