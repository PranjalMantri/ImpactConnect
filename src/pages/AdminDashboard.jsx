import { useEffect, useState, useCallback } from "react";
import supabase from "../supabase/client";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  Building,
  FileText,
} from "lucide-react";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allNGOs, setAllNGOs] = useState([]);

  const fetchAdminAndNgos = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user logged in.");

      const { data: profile } = await supabase
        .from("profiles")
        .select("isAdmin")
        .eq("id", user.id)
        .single();

      if (!profile?.isAdmin) {
        setIsAdmin(false);
        return;
      }
      setIsAdmin(true);

      const { data: ngosData, error: ngosError } = await supabase
        .from("ngos")
        .select("*");

      if (ngosError) throw ngosError;

      const formattedNgos = await Promise.all(
        ngosData.map(async (ngo) => {
          // --- Start of Changes ---

          // Generate public URL for the registration proof

          console.log(ngo.verification_documents);
          const registrationPath =
            ngo.verification_documents?.registrationCertificatePath;
          let proofUrl = null;

          if (registrationPath) {
            const { data } = supabase.storage
              .from("ngo-verification-docs") // Replace with your bucket name
              .getPublicUrl(registrationPath);

            console.log("Registration Proof URL:", data.publicUrl);
            proofUrl = data.publicUrl;
          }

          // Generate public URL for the financial statement/tax document
          const financialPath = ngo.verification_documents?.taxExemptionPath;
          let financialUrl = null;

          if (financialPath) {
            const { data } = supabase.storage
              .from("ngo-verification-docs") // Replace with your bucket name
              .getPublicUrl(financialPath);
            console.log("Financial Statement URL:", data.publicUrl);
            financialUrl = data.publicUrl;
          }

          return {
            id: ngo.id,
            organization_name: ngo.organization_name,
            description: ngo.description,
            mission: ngo.mission,
            website: ngo.website_url,

            proof_of_registration_url: proofUrl,
            financial_statement_url: financialUrl,
            verification_status: ngo.status,
            created_at: ngo.created_at,
          };
          // --- End of Changes ---
        })
      );
      setAllNGOs(formattedNgos);
    } catch (error) {
      console.error("Error loading dashboard data:", error.message);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminAndNgos();
  }, [fetchAdminAndNgos]);

  const handleVerification = async (ngoId, status) => {
    setAllNGOs((currentNGOs) =>
      currentNGOs.map((ngo) =>
        ngo.id === ngoId ? { ...ngo, verification_status: status } : ngo
      )
    );

    const { error } = await supabase
      .from("ngos")
      .update({ status: status, updated_at: new Date().toISOString() })
      .eq("id", ngoId);

    if (error) {
      console.error("Failed to update status:", error);
      fetchAdminAndNgos();
    }
  };

  // Corrected filtering logic to use 'verification_status'
  const pendingNGOs = allNGOs.filter(
    (ngo) => ngo.verification_status === "pending"
  );
  const verifiedNGOs = allNGOs.filter(
    (ngo) => ngo.verification_status === "verified"
  );
  const rejectedNGOs = allNGOs.filter(
    (ngo) => ngo.verification_status === "rejected"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold text-destructive">Access Denied</h2>
          <p className="text-muted-foreground">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  const NGOCard = ({ ngo, showActions = false }) => {
    return (
      <Card key={ngo.id}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                {ngo.organization_name}
              </CardTitle>
              <Badge
                variant={
                  ngo.verification_status === "verified"
                    ? "default"
                    : ngo.verification_status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
                className="mt-2"
              >
                {ngo.verification_status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {ngo.mission && (
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Mission
              </p>
              <p className="text-foreground">{ngo.mission}</p>
            </div>
          )}
          {ngo.description && (
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Description
              </p>
              <p className="text-foreground">{ngo.description}</p>
            </div>
          )}

          {ngo.website && (
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Website
              </p>
              <a
                href={ngo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                {ngo.website}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

          <div>
            <p className="text-sm font-semibold text-muted-foreground">
              Documents
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {ngo.proof_of_registration_url ? (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={ngo.proof_of_registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Registration Proof
                  </a>
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No registration proof submitted.
                </p>
              )}
              {ngo.financial_statement_url ? (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={ngo.financial_statement_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Financial Statement
                  </a>
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground">
                  No financial statement submitted.
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-muted-foreground">
              Applied On
            </p>
            <p className="text-foreground">
              {new Date(ngo.created_at).toLocaleDateString()}
            </p>
          </div>

          {showActions && (
            <div className="flex gap-2 pt-4 border-t">
              <Button
                onClick={() => handleVerification(ngo.id, "verified")}
                className="flex-1"
                variant="default"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify
              </Button>
              <Button
                onClick={() => handleVerification(ngo.id, "rejected")}
                className="flex-1"
                variant="destructive"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-warning">
                {pendingNGOs.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Verified NGOs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">
                {verifiedNGOs.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-destructive">
                {rejectedNGOs.length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">
              Pending ({pendingNGOs.length})
            </TabsTrigger>
            <TabsTrigger value="verified">
              Verified ({verifiedNGOs.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedNGOs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 pt-4">
            {pendingNGOs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No pending verifications
                </CardContent>
              </Card>
            ) : (
              pendingNGOs.map((ngo) => (
                <NGOCard key={ngo.id} ngo={ngo} showActions />
              ))
            )}
          </TabsContent>

          <TabsContent value="verified" className="space-y-4 pt-4">
            {verifiedNGOs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No verified NGOs yet
                </CardContent>
              </Card>
            ) : (
              verifiedNGOs.map((ngo) => <NGOCard key={ngo.id} ngo={ngo} />)
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 pt-4">
            {rejectedNGOs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No rejected applications
                </CardContent>
              </Card>
            ) : (
              rejectedNGOs.map((ngo) => (
                <NGOCard key={ngo.id} ngo={ngo} showActions />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
