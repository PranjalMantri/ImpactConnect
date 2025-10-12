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
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const VolunteerDashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [volunteerData, setVolunteerData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [matchedProjects, setMatchedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);

  const fetchDashboardData = useCallback(async () => {
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

      const { data: applicationsData, error: applicationsError } =
        await supabase
          .from("applications")
          .select(
            `id, status, applied_at:created_at, projects:project_id(title, ngo_organizations:ngo_id(organization_name))`
          )
          .eq("profile_id", user.id);
      if (applicationsError) throw applicationsError;
      setApplications(applicationsData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleAddSkill = async (newSkill, skillLevel) => {
    if (!newSkill.trim() || !skillLevel.trim() || !profile) return;
    setIsMutating(true);

    const newSkillObject = {
      id: `s-${Date.now()}`,
      skill_name: newSkill,
      proficiency_level: skillLevel,
    };
    const currentSkills = volunteerData?.skills || [];
    const updatedSkills = [...currentSkills, newSkillObject];

    const { error } = await supabase
      .from("volunteers")
      .update({ skills: updatedSkills })
      .eq("profile_id", profile.id);

    if (error) {
      console.error("Error adding skill:", error);
    } else {
      setVolunteerData({ ...volunteerData, skills: updatedSkills });
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
          impactPoints={volunteerData?.total_points || 0}
        />

        <Tabs defaultValue="profile" className="space-y-6 mt-8">
          <TabsList>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="matched">Matched Projects</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="portfolio">Impact Portfolio</TabsTrigger>
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
            {/* You can create a component for this too if it becomes complex */}
            <Card>
              <CardContent className="pt-6 text-muted-foreground">
                No projects matched your skills yet. Add more skills to improve
                matching!
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <ApplicationsList applications={applications} />
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Your impact portfolio and completed projects will appear here.
                </p>
                <Button
                  variant="link"
                  className="px-0 mt-2"
                  onClick={() => navigate(`/profile/${profile?.id}`)}
                >
                  View Your Public Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VolunteerDashboard;
