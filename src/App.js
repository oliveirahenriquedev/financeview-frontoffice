import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Avatar, Card, Rating } from "@mui/material";
import { Chartspage } from "./components/Chartspage.tsx";
import { SignUpPage } from "./components/SignUpPage.tsx";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa o CSS da biblioteca
import { AboutUs } from "./components/AboutUs.tsx";
import { Header } from "./components/Header.tsx";

function App() {
  const [surfingWithoutAccount, setSurfingWithoutAccount] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/chartspage"); // URL da página de exemplo
  };

  const feedbacks = [
    "Amei a interface do FinanceView!",
    "As atualizações diárias são super úteis.",
    "Excelente plataforma para acompanhar ações.",
    "FinanceView tornou minha vida financeira muito mais fácil.",
  ];

  function FeedbackCarousel() {
    return (
      <Carousel
        showArrows={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        interval={5000}
        className="animate-fade-in"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          "& .control-arrow": {
            "&::before": {
              fontSize: "2rem",
              color: "#333",
            },
          },
          "& .carousel .slide": {
            backgroundColor: "transparent",
          },
        }}
      >
        {feedbacks.map((feedback, index) => (
          <div key={index} className="p-4 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <div className="flex items-center mb-4">
                <Avatar className="mb-2" />
                <p className="ml-4 mt-2 font-semibold">Nome</p>
              </div>
              <p className="text-lg font-semibold text-center mb-4">
                {feedback}
              </p>
              <Rating
                sx={{ marginLeft: -1.5 }}
                name="read-only"
                value={4}
                readOnly
                className="mb-2"
              />
              {/* TODO: Ajustar esse value para ser o valor do rating do usuário na API, implementar lógica para mostrar apenas valores > 4 */}
            </div>
          </div>
        ))}
      </Carousel>
    );
  }

  return (
    <div>
      <div className="relative min-h-screen flex flex-col md:flex-row justify-center p-4 bg-green-100">
        <div className="absolute inset-0 bg-chart-pattern bg-cover bg-center opacity-10"></div>
        <Card className="relative z-10 p-6 bg-white shadow-md rounded-lg w-full md:w-1/2 lg:w-1/3 h-[480px] flex flex-col md:mb-0 md:ml-24 lg:mt-64 md:mt-64 ml-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center animate-fade-in mb-4 font-astonpoliz">
            Boas-vindas ao <span className="text-yellow-500">FinanceView</span>
          </h1>
          <p className="flex justify-center text-sm sm:text-base md:text-lg lg:text-xl text-center animate-fade-in mb-4 font-astonpoliz w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac
            efficitur arcu. Nam sit amet nulla vestibulum, condimentum purus
            vitae, tincidunt dui. Phasellus pharetra accumsan orci et molestie.
            Praesent porttitor sagittis ultricies. Nulla pulvinar ut elit eget
            posuere.
          </p>
          <button
            onClick={handleButtonClick}
            className="bg-green-100 text-black font-semibold border-dotted rounded shadow hover:bg-green-300 animate-fade-in delay-150 duration-100 transform hover:scale-105 transition ease-linear px-4 py-2 mb-4 animate-fade-in"
          >
            Ir para os gráficos
          </button>
          <div
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full"
            style={{ justifyContent: "space-between" }}
          >
            <button onClick={() => navigate("/signup")}>
              <p className="mr-2 text-teal-700 animate-fade-in">
                Quero me registrar
              </p>
            </button>
            <button onClick={() => navigate("/aboutus")}>
              <p className="mr-2 text-teal-700 animate-fade-in">Sobre nós</p>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chartspage" element={<Chartspage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignUpPage wantToLogin />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default Main;

{
  /*<Card
          className="relative shadow-md rounded-lg md:w-1/2 lg:w-1/3 flex flex-col md:ml-8 lg:ml-12 mt-8 md:mt-72 mx-auto max-w-[350px] opacity-80"
          sx={{ marginLeft: "auto" }}
        >
          <FeedbackCarousel />
        </Card> */
}
