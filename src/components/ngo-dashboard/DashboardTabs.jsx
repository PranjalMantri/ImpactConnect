import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import ProjectList from "./ProjectList";
import DonationList from "./DonationList";
import VolunteerApplicationList from "./VolunteerApplicationList";

const DashboardTabs = ({ projects, donations, volunteerApplications }) => {
  return (
    <Tabs defaultValue="projects" className="space-y-6">
      <TabsList>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="donations">Donations</TabsTrigger>
        <TabsTrigger value="volunteers">Volunteer Applications</TabsTrigger>
        <TabsTrigger value="reports">Impact Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="projects" className="space-y-4">
        <ProjectList projects={projects} />
      </TabsContent>

      <TabsContent value="donations" className="space-y-4">
        <DonationList donations={donations} />
      </TabsContent>

      <TabsContent value="volunteers" className="space-y-4">
        <VolunteerApplicationList applications={volunteerApplications} />
      </TabsContent>

      <TabsContent value="reports">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              Create and share **impact reports** with your donors to build
              trust and show your progress.
            </p>
            <Button>Create New Report</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
