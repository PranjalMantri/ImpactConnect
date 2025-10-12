import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabase/client";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      let query = supabase.from("projects").select("*");

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, [searchQuery]);

  const filteredProjects = projects.filter(
    (project) => project.status === "open"
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Projects</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find projects that match your interests and skills.
          </p>

          <div className="relative max-w-2xl mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search projects by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Projects</h2>
          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <Badge className="mb-3">{project.cause}</Badge>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <Button className="w-full" asChild>
                      <Link to={`/project/${project.id}`}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Projects;
