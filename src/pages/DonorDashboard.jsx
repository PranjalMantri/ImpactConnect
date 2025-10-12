import { useState, useEffect } from "react";
import { DollarSign, Calendar } from "lucide-react";
import supabase from "../supabase/client";
import { Button } from "../components/ui/Button";
import Navbar from "../components/Navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/Tabs";
import { Badge } from "../components/ui/Badge";

import { useNavigate } from "react-router-dom";

const DonorDashboard = () => {
  const navigate = useNavigate();

  // State for holding data, loading, and error status
  const [profile, setProfile] = useState(null);
  const [donations, setDonations] = useState([]);
  const [recurringDonations, setRecurringDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      // 1. Get the current user from Supabase auth
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      console.log(user.id);

      // 2. Fetch the user's profile from the 'profiles' table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, user_type") // Specify columns you need
        .eq("id", user.id)
        .single(); // Use .single() as each user has one profile

      if (profileError) {
        setError("Failed to fetch user profile.");
        console.error("Profile fetch error:", profileError.message);
        setLoading(false);
        return;
      }
      setProfile(profileData);

      // 3. Fetch the user's donations from the 'donations' table
      const { data: donationsData, error: donationsError } = await supabase
        .from("donations")
        .select(
          `
            id,
            created_at,
            amount,
            frequency,
            message,
            projects (
                title,
                ngos (
                    organization_name
                )
            )
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (donationsError) {
        setError("Failed to fetch donation history.");
        console.error("Donations fetch error:", donationsError.message);
      } else {
        // Map the data from Supabase to match the component's expected structure
        const formattedDonations = donationsData.map((d) => ({
          id: d.id,
          amount: d.amount,
          donated_at: d.created_at,
          frequency: d.frequency,
          message: d.message,
          ngo_organizations: d.projects?.ngos,
          projects: d.projects,
        }));

        const recuringDonations = formattedDonations.filter(
          (donation) => donation.frequency !== "one-time"
        );
        setRecurringDonations(recuringDonations);
        setDonations(formattedDonations);
      }

      setLoading(false);
    };

    fetchUserData();
  }, [navigate]);

  // Calculate total donated amount from the fetched data
  const totalDonated =
    donations?.reduce((sum, d) => sum + Number(d.amount), 0) || 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="mt-8 flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Donor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name || "Donor"}!
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
              <div className="text-2xl font-bold">₹{totalDonated}</div>
              <p className="text-xs text-muted-foreground">
                {donations?.length} donations
              </p>
            </CardContent>
          </Card>
          {/* Add other metric cards here (e.g., points, badges) */}
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
                        <h3 className="font-semibold text-lg">
                          {donation.ngo_organizations?.organization_name ||
                            "Organization"}
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
                          ₹{Number(donation.amount).toFixed(2)}
                        </p>
                        <Badge>{donation.frequency.replace("_", "-")}</Badge>
                      </div>
                    </div>
                    {donation.message && (
                      <p className="text-sm mt-4 p-3 bg-muted rounded">
                        "{donation.message}"
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
