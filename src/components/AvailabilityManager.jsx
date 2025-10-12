import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const AvailabilityManager = ({ availability, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [form, setForm] = useState({
    hours_per_week: availability?.hours_per_week || "",
    available_from: availability?.available_from || "",
    available_until: availability?.available_until || "",
  });

  const handleEditClick = () => {
    setForm({
      hours_per_week: availability?.hours_per_week || "",
      available_from: availability?.available_from || "",
      available_until: availability?.available_until || "",
    });
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = async () => {
    setIsUpdating(true);
    const success = await onUpdate(form);
    if (success) {
      setIsEditing(false);
    }
    setIsUpdating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing ? (
          <div className="space-y-4">
            {availability && availability.hours_per_week ? (
              <div>
                <p>
                  <span className="font-medium">Hours per week:</span>{" "}
                  {availability.hours_per_week}
                </p>
                <p>
                  <span className="font-medium">Available from:</span>{" "}
                  {new Date(availability.available_from).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Available until:</span>{" "}
                  {new Date(availability.available_until).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Set your availability to help NGOs find you.
              </p>
            )}
            <Button variant="outline" onClick={handleEditClick}>
              {availability ? "Edit" : "Set"} Availability
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="hours_per_week"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Hours per Week
                </label>
                <Input
                  id="hours_per_week"
                  name="hours_per_week"
                  type="number"
                  placeholder="e.g., 10"
                  value={form.hours_per_week}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label
                  htmlFor="available_from"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  From
                </label>
                <Input
                  id="available_from"
                  name="available_from"
                  type="date"
                  value={form.available_from}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label
                  htmlFor="available_until"
                  className="block text-sm font-medium text-muted-foreground mb-1"
                >
                  Until
                </label>
                <Input
                  id="available_until"
                  name="available_until"
                  type="date"
                  value={form.available_until}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdateClick} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilityManager;
