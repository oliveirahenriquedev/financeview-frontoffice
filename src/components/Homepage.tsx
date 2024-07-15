import React from "react";

export function Homepage() {
  const handleButtonClick = () => {
    window.location.href = `https://${"devEnvironment"}/Chartspage.tsx`; // URL da página de exemplo
  };
  return (
    <div className="bg-green-100 h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl flex justify-center items-center animate-fade-in mb-2">
        Hello world!
      </h1>
      <button
        onClick={handleButtonClick}
        className="bg-white text-black font-semibold border border-gray-400 rounded shadow hover:bg-gray-100 animate-fade-in delay-150 duration-100 transform hover:scale-125 transition ease-linear px-6 py-2 m-4 inline"
      >
        Go to Example Page
      </button>
    </div>
  );
}
