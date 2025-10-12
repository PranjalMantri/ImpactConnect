import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../supabase/client";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Progress } from "../components/ui/progress";
import Navbar from "../components/Navbar";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const currentUser = session?.user;
        setUser(currentUser);

        console.log("Current User:", currentUser);

        let applicationCheckPromise = Promise.resolve({ data: [] });
        if (currentUser) {
          setIsVolunteer(currentUser.user_metadata?.user_type === "volunteer");
          applicationCheckPromise = supabase
            .from("applications")
            .select("id")
            .match({ profile_id: currentUser.id, project_id: id })
            .limit(1);
        }

        console.log("Application Check Promise:", applicationCheckPromise);

        const [projectResponse, applicationResponse] = await Promise.all([
          supabase.from("projects").select("*").eq("id", id).single(),
          applicationCheckPromise,
        ]);

        if (projectResponse.error) {
          console.error("Error fetching project:", projectResponse.error);
          throw projectResponse.error;
        }

        setProject(projectResponse.data);

        if (applicationResponse.error) {
          console.error(
            "Error checking application:",
            applicationResponse.error
          );
          throw applicationResponse.error;
        }
        if (applicationResponse.data.length > 0) {
          setHasApplied(true);
        }
      } catch (err) {
        console.error("Error fetching project data:", err);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleVolunteerApply = async () => {
    if (!user) {
      alert("You must be logged in to volunteer.");
      return;
    }
    setIsApplying(true);
    try {
      const { error: insertError } = await supabase
        .from("applications")
        .insert([
          {
            profile_id: user.id,
            project_id: id,
          },
        ]);

      if (insertError) throw insertError;

      setHasApplied(true);
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to submit application. You may have already applied.");
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Project not found.</p>
      </div>
    );
  }

  const fundingReceived = project.funding_received || 0;
  const fundingGoal = project.funding_goal || 1;
  const fundingProgress = (fundingReceived / fundingGoal) * 100;
  const fundsRemaining = fundingGoal - fundingReceived;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-4 uppercase">{project.cause}</Badge>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {project.description}
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
              {project.skills_required?.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Skill-Based Needs</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.skills_required.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 p-4 bg-secondary rounded-lg"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary font-bold">
                            {skill.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
            <div>
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Financial Needs</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="font-bold text-primary">
                      {formatCurrency(fundingReceived)}
                    </span>
                  </div>
                  <Progress value={fundingProgress} className="mb-1" />
                  <p className="text-xs text-muted-foreground">
                    of {formatCurrency(fundingGoal)} goal
                  </p>
                </div>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Budget</span>
                    <span className="font-semibold">
                      {formatCurrency(fundingGoal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funds Raised</span>
                    <span className="font-semibold">
                      {formatCurrency(fundingReceived)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-semibold">
                      {formatCurrency(fundsRemaining)}
                    </span>
                  </div>
                </div>
                <Button className="w-full mb-3" asChild>
                  <Link to={`/donate/${project.id}`}>Donate Now</Link>
                </Button>
                {isVolunteer ? (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={handleVolunteerApply}
                    disabled={hasApplied || isApplying}
                  >
                    {isApplying
                      ? "Submitting..."
                      : hasApplied
                      ? "Applied"
                      : "Volunteer"}
                  </Button>
                ) : (
                  <Button variant="secondary" className="w-full" disabled>
                    Login as Volunteer to Apply
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
