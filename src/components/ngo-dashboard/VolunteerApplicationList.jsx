import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const VolunteerApplicationList = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          No new volunteer applications at this time.
        </CardContent>
      </Card>
    );
  }

  return applications.map((app) => (
    <Card key={app.id}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{app.profile?.full_name}</h3>
            <p className="text-sm text-muted-foreground">
              {app.profile?.email}
            </p>
            <p className="text-sm mt-1">
              <span className="font-medium">Project:</span> {app.project?.title}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Applied {new Date(app.applied_at).toLocaleDateString()}
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
  ));
};

export default VolunteerApplicationList;
