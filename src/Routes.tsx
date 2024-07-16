import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Chartspage } from "./components/Chartspage";
import { App } from "./App";

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
