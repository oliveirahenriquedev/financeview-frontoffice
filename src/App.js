import { Card } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa o CSS da biblioteca
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AboutUs } from "./components/AboutUs.tsx";
import { AccountSettings } from "./components/AccountSettings.tsx";
import { Chartspage } from "./components/Chartspage.tsx";
import { SignUpPage } from "./components/SignUpPage.tsx";
import { TokenManager } from "./helpers.ts";

const tokenManager = new TokenManager();
export function App() {
  let user = undefined;
  if (tokenManager.getCurrentToken()) {
    user = jwtDecode(tokenManager.getCurrentToken());
  }
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    navigate("/chartspage");
  };

  return (
    <div>
      <div className="relative min-h-screen flex flex-col md:flex-row justify-center align-center p-4 bg-black">
        <div className="absolute inset-0 bg-chart-pattern-3 bg-cover bg-center opacity-25 blur"></div>
        <Card className="relative z-10 p-6 bg-white shadow-md rounded-lg w-full md:w-1/2 lg:w-1/3 xl:h-[380px] lg:h-[400px] sm:h-[350px] md:min-h-[500px] flex flex-col md:mb-0 md:ml-24 lg:mt-64 md:mt-64 mr-20">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center animate-fade-in mb-4 font-inter">
            Boas-vindas ao <span className="text-yellow-500">FinanceView</span>
          </h1>
          <p className="flex justify-center text-sm sm:text-base md:text-lg lg:text-xl text-center animate-fade-in mb-4 font-inter w-full">
            Veja com facilidade a movimentação das maiores ações do mundo.{" "}
            <br />
            Compare ações.
            <br />
            <br />
            Mergulhe de vez no mundo financeiro.
          </p>
          <button
            onClick={handleButtonClick}
            className="bg-green-100 text-black font-semibold border-dotted rounded shadow hover:bg-green-300 animate-fade-in delay-150 duration-100 transform hover:scale-105 transition ease-linear px-4 py-2 mb-4 animate-fade-in font-inter"
          >
            Ir para os gráficos
          </button>
          <div
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full"
            style={{ justifyContent: "space-between" }}
          >
            <button onClick={() => navigate(user ? "/account" : "/signup")}>
              <p className="mr-2 text-teal-700 animate-fade-in font-inter">
                {user ? "Minha conta" : "Área de Login"}
              </p>
            </button>
            <button onClick={() => navigate("/aboutus")}>
              <p className="mr-2 text-teal-700 animate-fade-in font-inter">
                Sobre nós
              </p>
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
        <Route path="/account" element={<AccountSettings />} />
      </Routes>
    </Router>
  );
}

export default Main;
