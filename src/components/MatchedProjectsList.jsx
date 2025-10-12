import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

const MatchedProjectsList = ({ projects }) => {
  const navigate = useNavigate();

  if (!projects || projects.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-muted-foreground">
          No projects matched your skills yet. Add more skills to improve
          matching!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>
              {project.ngo_organizations.organization_name}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.skills_required.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              View Project
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MatchedProjectsList;
