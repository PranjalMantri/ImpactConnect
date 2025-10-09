import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredProjects = [
    {
      id: 1,
      title: "Community Garden Initiative",
      description: "Help us create a sustainable community garden.",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
      category: "Environment",
    },
    {
      id: 2,
      title: "Youth Mentorship Program",
      description: "Mentor at-risk youth and help them achieve their goals.",
      image:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800",
      category: "Education",
    },
    {
      id: 3,
      title: "Environmental Cleanup Drive",
      description: "Join our team to clean up local parks and beaches.",
      image:
        "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800",
      category: "Environment",
    },
  ];

  const allProjects = [
    {
      id: 4,
      name: "Animal Shelter Support",
      cause: "Animal Welfare",
      location: "San Francisco, CA",
      skills: "Animal Care",
      status: "Open",
    },
    {
      id: 5,
      name: "Elderly Care Assistance",
      cause: "Elderly Care",
      location: "New York, NY",
      skills: "Companionship",
      status: "Open",
    },
    {
      id: 6,
      name: "Homeless Shelter Volunteering",
      cause: "Homelessness",
      location: "Los Angeles, CA",
      skills: "Food Service",
      status: "Open",
    },
    {
      id: 7,
      name: "Environmental Conservation",
      cause: "Environment",
      location: "Seattle, WA",
      skills: "Cleanup",
      status: "Open",
    },
    {
      id: 8,
      name: "Youth Education Program",
      cause: "Education",
      location: "Chicago, IL",
      skills: "Tutoring",
      status: "Open",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Explore Projects</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find projects that match your interests and skills.
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search projects by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Cause
            </Button>
            <Button variant="outline" size="sm">
              Location
            </Button>
            <Button variant="outline" size="sm">
              Skills
            </Button>
          </div>
        </div>

        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Badge className="mb-3">{project.category}</Badge>
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
        </section>

        {/* All Projects */}
        <section>
          <h2 className="text-3xl font-bold mb-8">All Projects</h2>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Cause
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Skills Needed
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <Link
                          to={`/project/${project.id}`}
                          className="font-medium hover:text-primary"
                        >
                          {project.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {project.cause}
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {project.location}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">{project.skills}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-success/10 text-success hover:bg-success/20">
                          {project.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Projects;
