import { Avatar, Card, Rating, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import { defaultDevsInfo, TokenManager } from "../helpers.ts";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Sidebar } from "./Sidebar.tsx";
import { Header } from "./Header.tsx";
import { getUser, sendReview } from "../api.ts";
import { jwtDecode } from "jwt-decode";

const tokenManager = new TokenManager();

export function AboutUs() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [description, setDescription] = useState<string>();

  const isWideScreen = useMediaQuery("(min-width: 1628px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 1201px) and (max-width: 1627px)"
  );
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  const handleSendReview = async () => {
    const user = jwtDecode(tokenManager.getCurrentToken() || "") as any;
    if (description && selectedRating && user) {
      console.log(user);
      setLoading(true);
      await sendReview({
        user_id: user.user_id,
        description,
        rating: selectedRating,
        token: tokenManager.getCurrentToken(),
      }).then(() => setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 overflow-hidden">
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
        className={`bg-gradient-to-t from-gray-500 via-gray-300 to-gray-100 flex ${
          isSmallScreen ? "flex-col items-center" : "flex-row justify-center"
        }`}
      >
        <Card
          sx={{
            height: "auto",
            width: isWideScreen ? "40%" : isMediumScreen ? "60%" : "80%",
            marginTop: 8,
            marginLeft: isMediumScreen ? "24px" : isWideScreen ? 40 : "auto",
            marginRight: isWideScreen ? "0px" : "auto",
            marginBottom: 8,
          }}
          className="animate-fade-in"
        >
          <p
            className={`flex justify-center font-astonpoliz ${
              isSmallScreen ? "text-3xl" : "text-6xl"
            } mt-2`}
          >
            Sobre a <span className="text-yellow-500 ml-4">FinanceView</span>
          </p>
          <p className="flex mt-4 text-2xl p-4">
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
          <div className="flex justify-center align-center p-2 ml-2">
            <p>
              Envie uma avaliação! Seu feedback nos ajuda a melhorar o sistema
            </p>
          </div>
          <div className="flex justify-center align-center">
            <Rating
              value={selectedRating}
              onChange={(_e, newValue) => setSelectedRating(newValue)}
              precision={0.5}
            />
          </div>
          {selectedRating !== null && (
            <div>
              <label className="flex flex-col mt-2 p-4 ">
                Diga um pouco mais da sua experiência
                <textarea
                  className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  rows={6}
                  placeholder="Digite aqui..."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <button
                className="flex float-right p-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-black dark:focus:ring-indigo-800 rounded-lg text-sm px-5 mb-2 mr-4 text-center text-black font-semibold"
                onClick={handleSendReview}
                disabled={loading}
                color={loading ? "gray" : undefined}
              >
                Enviar avaliação
              </button>
            </div>
          )}
        </Card>
        <Card
          sx={{
            height: "auto",
            width: isWideScreen ? "35%" : isMediumScreen ? "60%" : "80%",
            marginTop: 8,
            marginLeft: isSmallScreen || isMediumScreen ? "24px" : "auto",
            marginRight: isWideScreen
              ? 10
              : isSmallScreen || isMediumScreen
              ? "24px"
              : "auto",
            marginBottom: 8,
          }}
          className="animate-fade-in"
        >
          <p
            className={`flex justify-center font-astonpoliz ${
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
                <p className="mb-1 text-xl font-astonpoliz">{dev.name}</p>
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
    </div>
  );
}
