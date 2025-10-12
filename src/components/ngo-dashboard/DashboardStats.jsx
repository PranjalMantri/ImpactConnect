import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { DollarSign, FolderOpen, Users } from "lucide-react";

const DashboardStats = ({ projects, donations, volunteerApplications }) => {
  const totalDonations =
    donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;
  const activeProjects =
    projects?.filter((p) => p.status === "open").length || 0;
  const pendingApplications =
    volunteerApplications?.filter((a) => a.status === "pending").length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalDonations.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {donations?.length} donations
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeProjects}</div>
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
  );
};

export default DashboardStats;
