import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";

import Navbar from "../components/Navbar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import DashboardSummary from "../components/DashboardSummary";
import SkillsManager from "../components/SkillsManager";
import AvailabilityManager from "../components/AvailabilityManager";
import ApplicationsList from "../components/ApplicationsList";
import MatchedProjectsList from "../components/MatchedProjectsList";

const VolunteerDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [volunteerData, setVolunteerData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [matchedProjects, setMatchedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const fetchMatchedProjects = useCallback(async (skills) => {
    if (!skills || skills.length === 0) {
      setMatchedProjects([]);
      return;
    }
    try {
      const skillNames = skills.map((skill) => skill.skill_name.toLowerCase());
      const { data, error } = await supabase
        .from("projects")
        .select("*, ngo_organizations:ngo_id(organization_name)")
        .overlaps("skills_required", skillNames);

      if (error) throw error;
      setMatchedProjects(data || []);
    } catch (error) {
      console.error("Error fetching matched projects:", error);
    }
  }, []);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError || new Error("User not found.");

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, volunteers(*)")
        .eq("id", user.id)
        .single();
      if (profileError) throw profileError;

      setProfile(profileData);
      setVolunteerData(profileData.volunteers);
      fetchMatchedProjects(profileData.volunteers?.skills);

      const { data: applicationsData, error: applicationsError } =
        await supabase
          .from("applications")
          .select(
            "id, status, applied_at:created_at, projects:project_id(title, ngo_organizations:ngo_id(organization_name))"
          )
          .eq("profile_id", user.id);
      if (applicationsError) throw applicationsError;

      setApplications(applicationsData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchMatchedProjects]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleAddSkill = async (newSkill, skillLevel) => {
    if (!newSkill.trim() || !skillLevel.trim() || !profile) return;
    setIsMutating(true);

    const newSkillObject = {
      id: `s-${Date.now()}`,
      skill_name: newSkill,
      proficiency_level: skillLevel,
    };
    const updatedSkills = [...(volunteerData?.skills || []), newSkillObject];

    const { error } = await supabase
      .from("volunteers")
      .update({ skills: updatedSkills })
      .eq("profile_id", profile.id);

    if (error) {
      console.error("Error adding skill:", error);
    } else {
      setVolunteerData({ ...volunteerData, skills: updatedSkills });
      fetchMatchedProjects(updatedSkills);
    }
    setIsMutating(false);
  };

  const handleRemoveSkill = async (skillIdToRemove) => {
    if (!profile) return;
    setIsMutating(true);

    const updatedSkills = volunteerData.skills.filter(
      (s) => s.id !== skillIdToRemove
    );
    const { error } = await supabase
      .from("volunteers")
      .update({ skills: updatedSkills })
      .eq("profile_id", profile.id);

    if (error) {
      console.error("Error removing skill:", error);
    } else {
      setVolunteerData({ ...volunteerData, skills: updatedSkills });
      fetchMatchedProjects(updatedSkills);
    }
    setIsMutating(false);
  };

  const handleUpdateAvailability = async (availabilityForm) => {
    if (!profile) return false;
    const { data, error } = await supabase
      .from("volunteers")
      .update({ availability: availabilityForm })
      .eq("profile_id", profile.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating availability:", error);
      return false;
    } else {
      setVolunteerData(data);
      return true;
    }
  };

  if (loading) {
    return <div>Loading your dashboard...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-10 flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Volunteer Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name}!
          </p>
        </div>

        <DashboardSummary
          skillCount={volunteerData?.skills?.length || 0}
          applicationCount={applications.length}
        />

        <Tabs defaultValue="profile" className="space-y-6 mt-8">
          <TabsList>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="matched">Matched Projects</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <SkillsManager
              skills={volunteerData?.skills || []}
              onAddSkill={handleAddSkill}
              onRemoveSkill={handleRemoveSkill}
              isMutating={isMutating}
            />
            <AvailabilityManager
              availability={volunteerData?.availability}
              onUpdate={handleUpdateAvailability}
            />
          </TabsContent>

          <TabsContent value="matched">
            <MatchedProjectsList projects={matchedProjects} />
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsList applications={applications} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VolunteerDashboard;
