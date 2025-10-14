import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import Navbar from "../components/Navbar";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/TextArea";
import { Label } from "../components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import { X } from "lucide-react";

const CreateProject = () => {
  const navigate = useNavigate();

  const [ngo, setNgo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cause: "",
    skills_required: [],
    start_date: "",
    end_date: "",
    funding_goal: "",
    volunteers_needed: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNgoData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Assuming your table is named 'ngos' and the 'id' column matches the user's id
        const { data: ngoProfile, error } = await supabase
          .from("ngos")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching NGO profile:", error);
          setError("Could not load your organization's data.");
        } else {
          setNgo(ngoProfile);
        }
      } else {
        navigate("/login");
      }
      setIsLoading(false);
    };

    fetchNgoData();
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCauseChange = (value) => {
    setFormData({ ...formData, cause: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddSkill = () => {
    if (currentSkill && !formData.skills_required.includes(currentSkill)) {
      setFormData({
        ...formData,
        skills_required: [...formData.skills_required, currentSkill],
      });
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills_required: formData.skills_required.filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.cause) {
      setError("Please fill out all required fields.");
      return;
    }
    if (!ngo) {
      setError("Organization data not found. Cannot create project.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${ngo.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(filePath, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from("project-images")
          .getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      const projectData = {
        ...formData,
        ngo_id: ngo.id,
        image_url: imageUrl,
        funding_goal: formData.funding_goal
          ? parseFloat(formData.funding_goal)
          : null,
        volunteers_needed: formData.volunteers_needed
          ? parseInt(formData.volunteers_needed, 10)
          : null,
      };

      const { error: insertError } = await supabase
        .from("projects")
        .insert([projectData]);

      if (insertError) {
        throw insertError;
      }

      console.log("Project created successfully!", projectData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating project:", error.message);
      setError(`Failed to create project: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.title && formData.description && formData.cause;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Create New Project</h1>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Winter Clothing Drive for the Homeless"
                />
              </div>
              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of your project's goals, activities, and impact."
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cause">Project Cause *</Label>
                  <Select
                    onValueChange={handleCauseChange}
                    value={formData.cause}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a cause" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Environment">Environment</SelectItem>
                      <SelectItem value="Animal Welfare">
                        Animal Welfare
                      </SelectItem>
                      <SelectItem value="Human Rights">Human Rights</SelectItem>
                      <SelectItem value="Community Development">
                        Community Development
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image">Project Image</Label>
                  <Input
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/png, image/jpeg, image/webp"
                    className="file:text-primary-foreground"
                  />
                </div>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <Label>Image Preview</Label>
                  <div className="aspect-video w-full rounded-md overflow-hidden border relative mt-2">
                    <img
                      src={imagePreview}
                      alt="Project preview"
                      className="object-cover w-full h-full"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="skills">Skills Required</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="skills"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g., Marketing, Event Planning"
                  />
                  <Button type="button" onClick={handleAddSkill}>
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.skills_required.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                    >
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)}>
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="funding_goal">Funding Goal (₹)</Label>
                  <Input
                    id="funding_goal"
                    type="number"
                    value={formData.funding_goal}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="volunteers_needed">Volunteers Needed</Label>
                  <Input
                    id="volunteers_needed"
                    type="number"
                    value={formData.volunteers_needed}
                    onChange={handleChange}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

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
