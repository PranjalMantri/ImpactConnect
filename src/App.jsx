import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { Route, Routes, BrowserRouter } from "react-router";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import DonatePage from "./pages/DonatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DonorDashboard from "./pages/DonorDashboard.jsx";
import Messages from "./pages/Messages.jsx";
import NGODashboard from "./pages/NGODashboard.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import NGOOnboarding from "./pages/NGOOnboarding.jsx";
import VolunteerDashboard from "./pages/VolunteerDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useState, useEffect } from "react";
import supabase from "./supabase/client.js";
import AdminDashboard from "./pages/AdminDashboard.jsx";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={session ? <HomePage /> : <LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/ngo-onboarding" element={<NGOOnboarding />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/ngo/create-project" element={<CreateProject />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
