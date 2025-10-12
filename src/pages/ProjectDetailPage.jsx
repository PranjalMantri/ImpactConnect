import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../supabase/client";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Progress } from "../components/ui/progress";
import { FileText } from "lucide-react";
import Navbar from "../components/Navbar";

const ProjectDetail = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single(); // Fetch a single record

      if (error) {
        console.error("Error fetching project:", error);
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading project details...</p>
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

  const fundingProgress =
    project.funding_goal > 0
      ? (project.funding_received / project.funding_goal) * 100
      : 0;
  const fundsRemaining = project.funding_goal - project.funding_received;

  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

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

              {project.skills_required &&
                project.skills_required.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                      Skill-Based Needs
                    </h2>
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
                      {formatCurrency(project.funding_received)}
                    </span>
                  </div>
                  <Progress value={fundingProgress} className="mb-1" />
                  <p className="text-xs text-muted-foreground">
                    of {formatCurrency(project.funding_goal)} goal
                  </p>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Budget</span>
                    <span className="font-semibold">
                      {formatCurrency(project.funding_goal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funds Raised</span>
                    <span className="font-semibold">
                      {formatCurrency(project.funding_received)}
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
                <Button variant="secondary" className="w-full" asChild>
                  <Link to={`/volunteer/${project.id}`}>Volunteer</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
