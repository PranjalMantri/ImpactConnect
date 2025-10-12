import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
  Outlet,
} from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import DonatePage from "./pages/DonatePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Messages from "./pages/Messages.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import NGOOnboarding from "./pages/NGOOnboarding.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useState, useEffect } from "react";
import supabase from "./supabase/client.js";
import AdminDashboard from "./pages/AdminDashboard.jsx";

// Standard private route for authenticated users
const PrivateRoutes = ({ session }) => {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const AdminRoutes = ({ session }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setLoading(false);
      return;
    }

    const userId = session.user?.id;
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchAdminStatus = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("isAdmin")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching admin status:", error.message);
        setIsAdmin(false);
      } else if (data) {
        setIsAdmin(data.isAdmin);
      }
      setLoading(false);
    };

    fetchAdminStatus();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listener for auth state changes
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
        {/* == Public Routes == */}
        <Route path="/" element={session ? <HomePage /> : <LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* == Protected Routes == */}
        <Route element={<PrivateRoutes session={session} />}>
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/donate/:projectId" element={<DonatePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ngo-onboarding" element={<NGOOnboarding />} />
          <Route path="/ngo/create-project" element={<CreateProject />} />
          <Route path="/messages" element={<Messages />} />

          {/* == Nested Protected Route for Admin Only == */}
          <Route element={<AdminRoutes session={session} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* == Catch-all Route == */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
