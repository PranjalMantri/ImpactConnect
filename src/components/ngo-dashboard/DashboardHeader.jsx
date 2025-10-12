import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const DashboardHeader = ({ ngo }) => {
  const navigate = useNavigate();

  const getBadgeVariant = (status) => {
    switch (status) {
      case "verified":
        return "default";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">{ngo.organization_name}</h1>
          <Badge variant={getBadgeVariant(ngo.status)}>{ngo.status}</Badge>
        </div>
        <Button onClick={() => navigate("/ngo/create-project")}>
          Create New Project
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
