import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Briefcase, Calendar, Award } from "lucide-react";

const DashboardSummary = ({ skillCount, applicationCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Skills Listed</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{skillCount}</div>
          <p className="text-xs text-muted-foreground">Professional skills</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Applications</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{applicationCount}</div>
          <p className="text-xs text-muted-foreground">
            Total applications sent
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
