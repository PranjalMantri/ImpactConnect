import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/TextArea";
import { Label } from "../components/ui/Label";
import { CheckCircle } from "lucide-react";

// --- Dummy Data and Functions for Frontend Development ---

// Mock function to simulate the submission and success flow
const mockCreateNGOMutation = (formData, setStep, setIsSubmitting) => {
  if (!formData.mission || !formData.description) return;

  setIsSubmitting(true);

  // Simulate API call delay
  setTimeout(() => {
    console.log("--- NGO Registration Data Submitted (Simulated) ---");
    console.log("Organization Name:", formData.organizationName);
    console.log("Mission:", formData.mission);
    console.log("-------------------------------------------------");

    setIsSubmitting(false);

    // Move to the success step
    setStep(3);
    // In a real app: toast({ title: "NGO registration submitted for verification!" });
  }, 1500);
};

// --- Component ---

const NGOOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false); // Dummy loading state
  const [formData, setFormData] = useState({
    organizationName: "",
    registrationNumber: "",
    description: "",
    mission: "",
    website: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    const keyMap = {
      orgName: "organizationName",
      regNumber: "registrationNumber",
      website: "website",
      mission: "mission",
      description: "description",
    };
    setFormData({ ...formData, [keyMap[id] || id]: value });
  };

  const isStep1Valid = formData.organizationName && formData.registrationNumber;
  const isStep2Valid = formData.mission && formData.description;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mt-10 flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            NGO Registration
          </h1>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 1/2: Basic Information</CardTitle>
                <CardDescription>
                  Tell us about your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="orgName">Organization Name *</Label>
                  <Input
                    id="orgName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                  />
                </div>
                <div>
                  <Label htmlFor="regNumber">Registration Number *</Label>
                  <Input
                    id="regNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    placeholder="Official registration number"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourorganization.org"
                  />
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                  className="w-full"
                >
                  Next Step
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Mission & Description */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Step 2/2: Mission & Description</CardTitle>
                <CardDescription>
                  Share your organization's purpose and impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="mission">Mission Statement *</Label>
                  <Textarea
                    id="mission"
                    value={formData.mission}
                    onChange={handleChange}
                    placeholder="What is your organization's mission?"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your organization's work and impact"
                    rows={4}
                  />
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() =>
                      mockCreateNGOMutation(formData, setStep, setIsSubmitting)
                    }
                    disabled={!isStep2Valid || isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? "Submitting..." : "Submit for Review"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <CardTitle>Application Submitted!</CardTitle>
                  <CardDescription>
                    Your NGO registration is under review
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Our team will review your application and verify your
                  organization's credentials. You'll receive an email once your
                  organization is approved.
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  This process typically takes 2-3 business days.
                </p>
                <Button onClick={() => navigate("/")} className="w-full">
                  Return to Home
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default NGOOnboarding;
