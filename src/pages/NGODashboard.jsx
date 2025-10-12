import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
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

          console.log("Fetched projects:", projectsData);
          setProjects(projectsData || []);
          const projectIds = projectsData?.map((p) => p.id) || [];

          if (projectIds.length > 0) {
            const { data: donationsData } = await supabase
              .from("donations")
              .select("*")
              .in("project_id", projectIds);

            console.log("Fetched donations:", donationsData);
            setDonations(donationsData || []);

            const { data: appsData } = await supabase
              .from("volunteer_applications")
              .select("*, profile:profiles(*), project:projects(title)")
              .in("project_id", projectIds);

            console.log("Fetched volunteer applications:", appsData);
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

  if (!ngo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>Register Your NGO</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                You need to register your NGO before you can access the
                dashboard.
              </p>
              <Button onClick={() => navigate("/ngo-onboarding")}>
                Start Registration
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (ngo.status === "pending") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>Application Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Your NGO registration is under review. Please be patient, we
                will notify you once the process is complete.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (ngo.status === "rejected") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>Registration Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We're sorry, but your NGO registration could not be approved.
                You cannot register or access the dashboard.
              </p>
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
                  ngo.status === "verified"
                    ? "default"
                    : ngo.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {ngo.status}
              </Badge>
            </div>
            <Button onClick={() => navigate("/ngo/create-project")}>
              Create New Project
            </Button>
          </div>
        </div>

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
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteer Applications</TabsTrigger>
            <TabsTrigger value="reports">Impact Reports</TabsTrigger>
          </TabsList>

          {/* The rest of your TabsContent JSX remains the same... */}
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
