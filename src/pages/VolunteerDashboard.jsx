import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Briefcase, Calendar, Award, Plus, X } from "lucide-react";

// --- Dummy Data for Frontend Development ---

const DUMMY_PROFILE = { full_name: "Maya Chen", user_type: "volunteer" };

const DUMMY_SKILLS = [
  {
    id: "s-001",
    skill_name: "Graphic Design",
    proficiency_level: "Intermediate",
  },
  { id: "s-002", skill_name: "Social Media", proficiency_level: "Expert" },
  { id: "s-003", skill_name: "Teaching", proficiency_level: "Beginner" },
];

const DUMMY_APPLICATIONS = [
  {
    id: "app-001",
    status: "accepted",
    applied_at: "2025-09-15T10:00:00Z",
    projects: {
      title: "Community Clean-up Day",
      ngo_organizations: { organization_name: "Green Earth Foundation" },
    },
  },
  {
    id: "app-002",
    status: "pending",
    applied_at: "2025-10-01T15:00:00Z",
    projects: {
      title: "Website Redesign",
      ngo_organizations: { organization_name: "Local Food Bank" },
    },
  },
  {
    id: "app-003",
    status: "rejected",
    applied_at: "2025-08-20T12:00:00Z",
    projects: {
      title: "Winter Coat Drive",
      ngo_organizations: { organization_name: "Hope Center" },
    },
  },
];

const DUMMY_AVAILABILITY = {
  hours_per_week: 10,
  available_from: "2025-11-01",
  available_until: "2026-03-30",
};

const DUMMY_USER_POINTS = { total_points: 750 };

// Matched projects based on DUMMY_SKILLS
const DUMMY_MATCHED_PROJECTS = [
  {
    id: "m-001",
    skill_name: "Graphic Design",
    project_id: "proj-web",
    projects: {
      title: "Logo Creation for New Initiative",
      ngo_organizations: { organization_name: "Arts & Culture Center" },
    },
  },
  {
    id: "m-002",
    skill_name: "Social Media",
    project_id: "proj-camp",
    projects: {
      title: "Holiday Fundraising Campaign",
      ngo_organizations: { organization_name: "Green Earth Foundation" },
    },
  },
];

// --- Component ---

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const [skills, setSkills] = useState(DUMMY_SKILLS); // State for skills

  // Replace hooks with static dummy data
  const profile = DUMMY_PROFILE;
  const applications = DUMMY_APPLICATIONS;
  const availability = DUMMY_AVAILABILITY;
  const userPoints = DUMMY_USER_POINTS;
  const matchedProjects = DUMMY_MATCHED_PROJECTS;

  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  // Simulated add skill mutation
  const handleAddSkill = () => {
    if (!newSkill.trim() || !skillLevel.trim()) return;

    setIsAdding(true);

    setTimeout(() => {
      const newId = `s-${Date.now()}`;
      const newSkillObject = {
        id: newId,
        skill_name: newSkill,
        proficiency_level: skillLevel,
      };
      setSkills([...skills, newSkillObject]);
      setNewSkill("");
      setSkillLevel("");
      setIsAdding(false);
      console.log("Skill added:", newSkillObject);
      // In a real app: toast({ title: "Skill added successfully!" });
    }, 500);
  };

  // Simulated remove skill mutation
  const handleRemoveSkill = (skillId) => {
    setIsRemoving(true); // Simplified: apply to all actions globally for demo
    setTimeout(() => {
      setSkills(skills.filter((s) => s.id !== skillId));
      setIsRemoving(false);
      console.log(`Skill ${skillId} removed.`);
      // In a real app: toast({ title: "Skill removed" });
    }, 500);
  };

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

        {/* --- Key Metrics Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Skills Listed
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{skills.length}</div>
              <p className="text-xs text-muted-foreground">
                Professional skills
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Applications
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-xs text-muted-foreground">
                Total applications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Impact Points
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userPoints?.total_points || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Keep volunteering!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* --- Tabs for Details --- */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="matched">Matched Projects</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="portfolio">Impact Portfolio</TabsTrigger>
          </TabsList>

          {/* Profile Tab: Skills & Availability */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {skill.skill_name} ({skill.proficiency_level})
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveSkill(skill.id)}
                        disabled={isRemoving}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Skill name"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <Input
                    placeholder="Level (e.g., Expert)"
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                  />
                  <Button
                    onClick={handleAddSkill}
                    disabled={isAdding || !newSkill || !skillLevel}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {availability ? (
                  <div>
                    <p>
                      <span className="font-medium">Hours per week:</span>{" "}
                      {availability.hours_per_week}
                    </p>
                    <p>
                      <span className="font-medium">Available period:</span>{" "}
                      {availability.available_from} to{" "}
                      {availability.available_until}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Set your availability to help NGOs find you.
                  </p>
                )}
                <Button variant="outline">Update Availability</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matched Projects Tab */}
          <TabsContent value="matched" className="space-y-4">
            {matchedProjects.length > 0 ? (
              matchedProjects.map((projectSkill) => (
                <Card key={projectSkill.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {projectSkill.projects?.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {
                            projectSkill.projects?.ngo_organizations
                              ?.organization_name
                          }
                        </p>
                        <Badge className="mt-2">
                          {projectSkill.skill_name} Match
                        </Badge>
                      </div>
                      <Button
                        onClick={() =>
                          navigate(`/project/${projectSkill.project_id}`)
                        }
                      >
                        View Project
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-muted-foreground">
                  No projects matched your skills yet. Add more skills to
                  improve matching!
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{app.projects?.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {app.projects?.ngo_organizations?.organization_name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Applied {new Date(app.applied_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        app.status === "accepted"
                          ? "default"
                          : app.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Your impact portfolio and completed projects will appear here.
                </p>
                <Button variant="link" className="px-0 mt-2">
                  View Your Profile
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
