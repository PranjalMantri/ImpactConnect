import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { DollarSign, Calendar, TrendingUp, Award } from "lucide-react";

const DUMMY_PROFILE = {
  full_name: "Leslie Knope",
  user_type: "donor",
  // ... other profile fields
};

const DUMMY_DONATIONS = [
  {
    id: "d-001",
    amount: 100.0,
    donated_at: "2025-10-05T10:30:00Z",
    frequency: "one_time",
    message: "Keep up the great work helping the local parks!",
    ngo_organizations: { organization_name: "Pawnee Parks Dept" },
    projects: { title: "New Swingset Fund" },
  },
  {
    id: "d-002",
    amount: 50.0,
    donated_at: "2025-09-20T14:00:00Z",
    frequency: "one_time",
    message: null,
    ngo_organizations: { organization_name: "Second Chance Animal Rescue" },
    projects: null,
  },
  {
    id: "d-003",
    amount: 25.0,
    donated_at: "2025-09-01T08:15:00Z",
    frequency: "monthly",
    message: "Monthly support for clean water projects.",
    ngo_organizations: { organization_name: "Global Water Initiative" },
    projects: { title: "Kenya Well Project" },
  },
];

const DUMMY_RECURRING_DONATIONS = [
  {
    id: "r-001",
    amount: 25.0,
    frequency: "Monthly",
    next_donation_date: "2025-11-01T00:00:00Z",
    active: true,
    ngo_organizations: { organization_name: "Global Water Initiative" },
    projects: { title: "Kenya Well Project" },
  },
  {
    id: "r-002",
    amount: 10.0,
    frequency: "Weekly",
    next_donation_date: "2025-10-17T00:00:00Z",
    active: true,
    ngo_organizations: { organization_name: "Local Food Bank" },
    projects: null,
  },
];

const DUMMY_USER_POINTS = { total_points: 1245 };

const DUMMY_USER_BADGES = [
  {
    id: "b-001",
    earned_at: "2025-09-01T08:15:00Z",
    badges: {
      name: "First Responder",
      description: "Made your first donation.",
      icon_url: null,
    },
  },
  {
    id: "b-002",
    earned_at: "2025-10-05T10:30:00Z",
    badges: {
      name: "Century Club",
      description: "Donated over $100 total.",
      icon_url: null,
    },
  },
];

// --- Component ---

const DonorDashboard = () => {
  const navigate = useNavigate();

  // Replace useQuery hooks with dummy data
  const profile = DUMMY_PROFILE;
  const donations = DUMMY_DONATIONS;
  const recurringDonations = DUMMY_RECURRING_DONATIONS;
  const userPoints = DUMMY_USER_POINTS;
  const userBadges = DUMMY_USER_BADGES;

  // Calculate total donated amount from dummy data
  const totalDonated =
    donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-8 flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Donor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name}!
          </p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Donated
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalDonated.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {donations?.length} donations
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Details */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">Donation History</TabsTrigger>
            <TabsTrigger value="recurring">Recurring Donations</TabsTrigger>
          </TabsList>

          {/* Donation History Tab */}
          <TabsContent value="history" className="space-y-4">
            {donations?.length > 0 ? (
              donations.map((donation) => (
                <Card key={donation.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {donation.ngo_organizations?.organization_name}
                        </h3>
                        {donation.projects?.title && (
                          <p className="text-sm text-muted-foreground">
                            {donation.projects.title}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">
                          <Calendar className="inline h-3 w-3 mr-1" />
                          {new Date(donation.donated_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          ${Number(donation.amount).toFixed(2)}
                        </p>
                        <Badge
                          variant={
                            donation.frequency === "one_time"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {donation.frequency.replace("_", "-")}
                        </Badge>
                      </div>
                    </div>
                    {donation.message && (
                      <p className="text-sm mt-4 p-3 bg-muted rounded">
                        {donation.message}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    No donation history found. Time to make your first impact!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Recurring Donations Tab */}
          <TabsContent value="recurring" className="space-y-4">
            {recurringDonations?.length > 0 ? (
              recurringDonations.map((recurring) => (
                <Card key={recurring.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {recurring.ngo_organizations?.organization_name}
                        </h3>
                        {recurring.projects?.title && (
                          <p className="text-sm text-muted-foreground">
                            {recurring.projects.title}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">
                          Next payment:{" "}
                          <span className="font-medium">
                            {new Date(
                              recurring.next_donation_date
                            ).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          ${Number(recurring.amount).toFixed(2)}
                        </p>
                        <Badge>{recurring.frequency}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4" size="sm">
                      Manage Subscription
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    You currently have no active recurring donations.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DonorDashboard;
