import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import ProjectList from "./ProjectList";
import DonationList from "./DonationList";
import VolunteerApplicationList from "./VolunteerApplicationList";

const DashboardTabs = ({
  projects,
  donations,
  volunteerApplications,
  onAccept,
  onReject,
}) => {
  return (
    <Tabs defaultValue="projects" className="space-y-6">
      <TabsList>
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="donations">Donations</TabsTrigger>
        <TabsTrigger value="volunteers">Volunteer Applications</TabsTrigger>
      </TabsList>

      <TabsContent value="projects" className="space-y-4">
        <ProjectList projects={projects} />
      </TabsContent>

      <TabsContent value="donations" className="space-y-4">
        <DonationList donations={donations} />
      </TabsContent>

      <TabsContent value="volunteers" className="space-y-4">
        <VolunteerApplicationList
          applications={volunteerApplications}
          onAccept={onAccept}
          onReject={onReject}
        />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
