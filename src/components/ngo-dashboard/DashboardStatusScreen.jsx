import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

const statusConfig = {
  unregistered: {
    title: "Register Your NGO",
    message:
      "You need to register your NGO before you can access the dashboard.",
    buttonText: "Start Registration",
    buttonAction: (navigate) => navigate("/ngo-onboarding"),
  },
  pending: {
    title: "Application Pending",
    message:
      "Your NGO registration is under review. Please be patient, we will notify you once the process is complete.",
  },
  rejected: {
    title: "Registration Rejected",
    message:
      "We're sorry, but your NGO registration could not be approved. You cannot register or access the dashboard.",
  },
};

const DashboardStatusScreen = ({ status }) => {
  const navigate = useNavigate();
  const config = statusConfig[status];

  if (!config) return null;

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={config.buttonText ? "mb-4" : ""}>{config.message}</p>
        {config.buttonText && (
          <Button onClick={() => config.buttonAction(navigate)}>
            {config.buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardStatusScreen;
