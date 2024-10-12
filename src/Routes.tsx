import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { App } from "./App";
import { Chartspage } from "./components/Chartspage";

export function DOMRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chartspage" element={<Chartspage />} />
      </Routes>
    </Router>
  );
}

export default DOMRoutes;
