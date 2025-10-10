import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { Route, Routes, BrowserRouter } from "react-router";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import DonatePage from "./pages/DonatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import DonorDashboard from "./pages/DonorDashboard.jsx";
import Messages from "./pages/Messages.jsx";
import NGODashboard from "./pages/NGODashboard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
