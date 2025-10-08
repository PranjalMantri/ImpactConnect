import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { Route, Routes, BrowserRouter } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import RegisterIndividual from "./pages/RegisterIndividual.jsx";
import RegisterNgo from "./pages/RegisterNgo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/individual" element={<RegisterIndividual />} />
        <Route path="/register/ngo" element={<RegisterNgo />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
