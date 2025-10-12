import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";

const ProjectList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          No projects created yet. Start one now!
        </CardContent>
      </Card>
    );
  }

  return projects.map((project) => (
    <Card key={project.id}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{project.title}</h3>
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
                ₹{Number(project.funding_received).toFixed(0)} / ₹
                {Number(project.funding_goal).toFixed(0)} Goal
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
};

export default ProjectList;
