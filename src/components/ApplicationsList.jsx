import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

const ApplicationsList = ({ applications }) => {
  const navigate = useNavigate();

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          <p className="mb-2">You haven't applied to any projects yet.</p>
          <Button variant="link" onClick={() => navigate("/projects")}>
            Browse Projects to Get Started
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getBadgeVariant = (status) => {
    switch (status) {
      case "accepted":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-4">
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
              <Badge variant={getBadgeVariant(app.status)}>{app.status}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApplicationsList;
