import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { RadioGroup, RadioGroupItem } from "../components/ui/RadioGroup";
import { Textarea } from "../components/ui/textarea";
import Navbar from "../components/Navbar";
import supabase from "../supabase/client";

const Donate = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const [donationFrequency, setDonationFrequency] = useState("one-time");
  const [amount, setAmount] = useState("50");
  const [donorName, setDonorName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProjectAndUser = async () => {
      setIsLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setUser(session.user);
      setDonorName(session.user.user_metadata?.full_name || "");

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error || !data) {
        console.error("Error fetching project:", error);
        setProject(null);
      } else {
        setProject(data);
      }

      setIsLoading(false);
    };

    fetchProjectAndUser();
  }, [projectId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !project) return;

    setIsSubmitting(true);

    const { error: donationError } = await supabase.from("donations").insert({
      project_id: project.id,
      user_id: user.id,
      amount: Number(amount),
      frequency: donationFrequency,
      donor_name: donorName,
      message: message || null,
    });

    if (donationError) {
      alert("Error processing donation: " + donationError.message);
      setIsSubmitting(false);
      return;
    }

    const { error: rpcError } = await supabase.rpc(
      "increment_project_funding",
      {
        project_id_to_update: project.id,
        amount_to_add: Number(amount),
      }
    );

    setIsSubmitting(false);

    if (rpcError) {
      alert(
        "Donation was recorded, but failed to update project total. " +
          rpcError.message
      );
    } else {
      alert("Thank you for your generous donation!");
      navigate("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-12 text-center">
          <h1 className="text-3xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground mt-2">
            The project you are trying to donate to does not exist.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-2">
              Donate to {project.title}
            </h1>
            <p className="text-muted-foreground mb-8">{project.description}</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="amount">Donation Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  required
                />
              </div>
              <div>
                <Label className="mb-3 block">Donation Frequency</Label>
                <RadioGroup
                  value={donationFrequency}
                  onValueChange={setDonationFrequency}
                  className="grid grid-cols-2 gap-4"
                >
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border ${
                      donationFrequency === "one-time"
                        ? "border-primary bg-secondary"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time" className="cursor-pointer flex-1">
                      One-time
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-2 p-3 rounded-lg border ${
                      donationFrequency === "monthly"
                        ? "border-primary bg-secondary"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="cursor-pointer flex-1">
                      Monthly
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="pt-6 border-t border-border">
                <h3 className="font-bold mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="donorName">Full Name</Label>
                    <Input
                      id="donorName"
                      placeholder="John Doe"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Your Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Leave a message of support..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Donate ₹${amount}`}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;
