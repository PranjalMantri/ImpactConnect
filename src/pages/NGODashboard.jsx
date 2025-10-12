// src/pages/NGODashboard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import Navbar from "../components/Navbar";
import DashboardHeader from "../components/ngo-dashboard/DashboardHeader";
import DashboardStats from "../components/ngo-dashboard/DashboardStats";
import DashboardTabs from "../components/ngo-dashboard/DashboardTabs";
import DashboardStatusScreen from "../components/ngo-dashboard/DashboardStatusScreen";

const NGODashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ngo, setNgo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [donations, setDonations] = useState([]);
  const [volunteerApplications, setVolunteerApplications] = useState([]);

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/login");
        return;
      }
      const user = session.user;

      try {
        const { data: ngoData, error: ngoError } = await supabase
          .from("ngos")
          .select(`*`)
          .eq("id", user.id)
          .single();

        if (ngoError || !ngoData) {
          setNgo(null);
          setLoading(false);
          return;
        }

        setNgo(ngoData);

        if (ngoData.status === "verified") {
          const { data: projectsData } = await supabase
            .from("projects")
            .select("*")
            .eq("ngo_id", ngoData.id);
          setProjects(projectsData || []);

          const projectIds = projectsData?.map((p) => p.id) || [];
          if (projectIds.length > 0) {
            const { data: donationsData } = await supabase
              .from("donations")
              .select("*")
              .in("project_id", projectIds);
            setDonations(donationsData || []);

            const { data: appsData } = await supabase
              .from("volunteer_applications")
              .select("*, profile:profiles(*), project:projects(title)")
              .in("project_id", projectIds);
            setVolunteerApplications(appsData || []);
          }
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setNgo(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserAndFetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading your dashboard...</p>
        </main>
      </div>
    );
  }

  if (!ngo || ngo.status !== "verified") {
    const status = !ngo ? "unregistered" : ngo.status;
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <DashboardStatusScreen status={status} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-10 flex-1 container mx-auto px-4 py-8">
        <DashboardHeader ngo={ngo} />
        <DashboardStats
          projects={projects}
          donations={donations}
          volunteerApplications={volunteerApplications}
        />
        <DashboardTabs
          projects={projects}
          donations={donations}
          volunteerApplications={volunteerApplications}
        />
      </main>
    </div>
  );
};

export default NGODashboard;
