import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Chartspage } from "./components/Chartspage.tsx";

function App() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/chartspage"); // URL da página de exemplo
  };

  return (
    <div className="bg-green-100 h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl flex justify-center items-center animate-fade-in mb-2">
        Bem-vindo ao FinanceView
        {/* <img alt="financeviewlogo" src="./images/financeview.png" /> TODO: fix the image path or something like this*/}
      </h1>
      <button
        onClick={handleButtonClick}
        className="bg-white text-black font-semibold border border-gray-400 rounded shadow hover:bg-gray-100 animate-fade-in delay-150 duration-100 transform hover:scale-125 transition ease-linear px-6 py-2 m-4 inline"
      >
        Ir para os gráficos
      </button>
    </div>
  );
}

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chartspage" element={<Chartspage />} />
      </Routes>
    </Router>
  );
}

export default Main;
