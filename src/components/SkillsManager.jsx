import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Plus, X } from "lucide-react";

const SkillsManager = ({ skills, onAddSkill, onRemoveSkill, isMutating }) => {
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("");

  const handleAddClick = () => {
    onAddSkill(newSkill, skillLevel).then(() => {
      setNewSkill("");
      setSkillLevel("");
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Expertise</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {skill.skill_name} ({skill.proficiency_level})
              <button
                onClick={() => onRemoveSkill(skill.id)}
                disabled={isMutating}
              >
                <X className="h-3 w-3 cursor-pointer" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Skill name"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <Input
            placeholder="Level (e.g., Expert)"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          />
          <Button
            onClick={handleAddClick}
            disabled={isMutating || !newSkill || !skillLevel}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsManager;
