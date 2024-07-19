import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Chartspage } from "./components/Chartspage.tsx";
import { SignUpPage } from "./components/SignUpPage.tsx";

function App() {
  const [surfingWithoutAccount, setSurfingWithoutAccount] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/chartspage"); // URL da página de exemplo
  };

  return (
    <>
      <div className="bg-green-100 h-screen w-screen flex flex-col justify-center items-center ">
        <h1 className="text-3xl flex justify-center items-center animate-fade-in mb-2">
          Boas-vindas ao FinanceView
        </h1>
        <button
          onClick={handleButtonClick}
          className="bg-white text-black font-semibold border border-gray-400 rounded shadow hover:bg-gray-100 animate-fade-in delay-150 duration-100 transform hover:scale-125 transition ease-linear px-6 py-2 m-4 inline"
        >
          Ir para os gráficos
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-blue-100 text-black font-semibold border border-gray-400 rounded shadow hover:bg-gray-100 animate-fade-in delay-150 duration-100 transform hover:scale-125 transition ease-linear px-6 py-2 m-1 mt-2  inline-flex"
        >
          <p className="mr-2">Quero me registrar</p>
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white mt-0.5 ml-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
            />
          </svg>
        </button>
        <button
          onClick={() => navigate("/signin")}
          className="bg-blue-100 text-black font-semibold border border-gray-400 rounded shadow hover:bg-gray-100 animate-fade-in delay-150 duration-100 transform hover:scale-125 transition ease-linear px-6 py-2 inline-flex"
        >
          <p className="mr-2">Já possuo uma conta</p>
          <svg
            className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white mt-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
            />
          </svg>
        </button>
      </div>
    </>
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
      </Routes>
    </Router>
  );
}

export default Main;
