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
import { Badge } from "../components/ui/Badge";
import { DollarSign, Users, FolderOpen, TrendingUp } from "lucide-react";

// --- Dummy Data for Frontend Development ---

const DUMMY_NGO = {
  id: "ngo-456",
  organization_name: "Hope for the Future Foundation",
  verification_status: "verified",
};

const DUMMY_PROJECTS = [
  {
    id: "proj-001",
    title: "School Supplies Drive 2025",
    category: "Education",
    status: "active",
    current_funding: 5200.0,
    funding_goal: 7500.0,
    created_at: "2025-08-10T00:00:00Z",
  },
  {
    id: "proj-002",
    title: "Community Garden Expansion",
    category: "Environment",
    status: "completed",
    current_funding: 1500.0,
    funding_goal: 1500.0,
    created_at: "2024-12-01T00:00:00Z",
  },
  {
    id: "proj-003",
    title: "Winter Coat Collection",
    category: "Social Welfare",
    status: "inactive",
    current_funding: 0.0,
    funding_goal: 3000.0,
    created_at: "2025-01-20T00:00:00Z",
  },
];

const DUMMY_DONATIONS = [
  {
    id: "d-001",
    amount: 250.0,
    donated_at: "2025-10-09T12:00:00Z",
    frequency: "one_time",
    message: "For the School Supplies Drive.",
  },
  {
    id: "d-002",
    amount: 50.0,
    donated_at: "2025-10-01T08:00:00Z",
    frequency: "monthly",
    message: null,
  },
  {
    id: "d-003",
    amount: 1000.0,
    donated_at: "2025-09-25T15:00:00Z",
    frequency: "one_time",
    message: "Anonymous major gift.",
  },
];

const DUMMY_VOLUNTEER_APPLICATIONS = [
  {
    id: "app-001",
    volunteer_id: "vol-1",
    project_id: "proj-001",
    status: "pending",
    applied_at: "2025-10-08T09:00:00Z",
    message: "I'm a teacher and would love to help organize!",
    profile: { full_name: "Maya Singh", email: "maya@example.com" },
    project: { title: "School Supplies Drive 2025" },
  },
  {
    id: "app-002",
    volunteer_id: "vol-2",
    project_id: "proj-002",
    status: "accepted",
    applied_at: "2025-07-20T14:30:00Z",
    message: null,
    profile: { full_name: "David Lee", email: "david@example.com" },
    project: { title: "Community Garden Expansion" },
  },
  {
    id: "app-003",
    volunteer_id: "vol-3",
    project_id: "proj-001",
    status: "rejected",
    applied_at: "2025-10-05T11:00:00Z",
    message: null,
    profile: { full_name: "Chris Evans", email: "chris@example.com" },
    project: { title: "School Supplies Drive 2025" },
  },
];

// --- Component ---

const NGODashboard = () => {
  const navigate = useNavigate();

  const ngo = DUMMY_NGO;
  const projects = DUMMY_PROJECTS;
  const donations = DUMMY_DONATIONS;
  const volunteerApplications = DUMMY_VOLUNTEER_APPLICATIONS;

  // NGO registration check simulation
  if (!ngo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>NGO Registration Required</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                You need to register your NGO before accessing this dashboard.
              </p>
              <Button onClick={() => navigate("/ngo-onboarding")}>
                Register NGO
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const totalDonations =
    donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
  const pendingApplications =
    volunteerApplications?.filter((a) => a.status === "pending").length || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-10 flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {ngo.organization_name}
              </h1>
              <Badge
                variant={
                  ngo.verification_status === "verified"
                    ? "default"
                    : ngo.verification_status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {ngo.verification_status}
              </Badge>
            </div>
            <Button onClick={() => navigate("/ngo/create-project")}>
              Create New Project
            </Button>
          </div>
        </div>

        {/* --- Key Metrics Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Donations
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalDonations.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {donations?.length} donations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Projects
              </CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects?.filter((p) => p.status === "active").length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {projects?.length} total projects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Volunteer Applications
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {volunteerApplications?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {pendingApplications} pending review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Impact Score
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85</div>
              <p className="text-xs text-muted-foreground">
                Based on engagement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* --- Tabs for Details --- */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteer Applications</TabsTrigger>
            <TabsTrigger value="reports">Impact Reports</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            {projects?.length > 0 ? (
              projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {project.category}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Badge
                            variant={
                              project.status === "active"
                                ? "default"
                                : project.status === "completed"
                                ? "success"
                                : "secondary"
                            }
                          >
                            {project.status.charAt(0).toUpperCase() +
                              project.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">
                            ${Number(project.current_funding).toFixed(0)} / $
                            {Number(project.funding_goal).toFixed(0)} Goal
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/project/${project.id}`)}
                      >
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  No projects created yet. Start one now!
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations" className="space-y-4">
            {donations?.length > 0 ? (
              donations.map((donation) => (
                <Card key={donation.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-xl">
                          ${Number(donation.amount).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(donation.donated_at).toLocaleDateString()}
                        </p>
                        {donation.message && (
                          <p className="text-sm mt-2 italic p-2 bg-muted rounded">
                            "{donation.message}"
                          </p>
                        )}
                      </div>
                      <Badge
                        variant={
                          donation.frequency === "monthly"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {donation.frequency}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  No donations recorded yet. Share your mission!
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Volunteer Applications Tab */}
          <TabsContent value="volunteers" className="space-y-4">
            {volunteerApplications?.length > 0 ? (
              volunteerApplications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {app.profile?.full_name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {app.profile?.email}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Project:</span>{" "}
                          {app.project?.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Applied{" "}
                          {new Date(app.applied_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
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
                        {app.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="success">
                              Accept
                            </Button>
                            <Button size="sm" variant="outline">
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    {app.message && (
                      <p className="text-sm mt-3 p-2 bg-secondary/50 rounded italic">
                        {app.message}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  No new volunteer applications at this time.
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Impact Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-4">
                  Create and share **impact reports** with your donors to build
                  trust and show your progress.
                </p>
                <Button>Create New Report</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default NGODashboard;
