import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/TextArea";
import { Label } from "../components/ui/Label";

// --- Dummy Data and Functions for Frontend Development ---

// Simulate a verified NGO session
const DUMMY_NGO = {
  id: "ngo-456",
  organization_name: "Hope for the Future Foundation",
  verification_status: "verified", // Ensure this is 'verified' to show the form
};
const DUMMY_NGO_UNVERIFIED = {
  id: "ngo-789",
  organization_name: "Unverified Charity",
  verification_status: "pending",
};

// Use the verified NGO for the main component display
const ngo = DUMMY_NGO;

// --- Component ---

const CreateProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    fundingGoal: "",
    volunteersNeeded: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Dummy loading state

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    // Basic form validation check (required fields from your original code)
    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.location
    ) {
      console.error("Please fill out all required fields.");
      // In a real app, you would show a toast/error here
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      // Log the data instead of sending to Supabase
      console.log("--- New Project Data ---");
      console.log("NGO ID:", ngo.id);
      console.log("Title:", formData.title);
      console.log("Category:", formData.category);
      console.log("Funding Goal:", parseFloat(formData.fundingGoal) || 0);
      console.log("------------------------");

      setIsSubmitting(false);

      // Simulate successful toast and navigation
      console.log("Project created successfully! (Simulated)");
      navigate("/ngo-dashboard");
    }, 1500);
  };

  // Check 2: Verification Status (Simulate failure with DUMMY_NGO_UNVERIFIED if needed)
  if (ngo.verification_status !== "verified") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Verification Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Your NGO must be verified before creating projects.
              </p>
              <Button onClick={() => navigate("/")}>Return Home</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.category &&
    formData.location;

  return (
    <div className="mt-10 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Create New Project</h1>

          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Project Title */}
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter project title"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project"
                  rows={6}
                />
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Education, Health"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Project location"
                  />
                </div>
              </div>

              {/* Funding Goal & Volunteers Needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fundingGoal">Funding Goal ($)</Label>
                  <Input
                    id="fundingGoal"
                    type="number"
                    value={formData.fundingGoal}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="volunteersNeeded">Volunteers Needed</Label>
                  <Input
                    id="volunteersNeeded"
                    type="number"
                    value={formData.volunteersNeeded}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Start Date & End Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate("/ngo-dashboard")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;
