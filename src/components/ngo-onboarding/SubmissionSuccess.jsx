import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { CheckCircle } from "lucide-react";

export const SubmissionSuccess = ({ onReturnHome }) => (
  <Card>
    <CardHeader>
      <div className="flex flex-col items-center text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <CardTitle>Application Submitted!</CardTitle>
        <CardDescription>
          Your NGO registration is under review.
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-center text-muted-foreground">
        Our team will review your application and documents. You'll receive an
        email once your organization is approved. This process typically takes
        2-3 business days.
      </p>
      <Button onClick={onReturnHome} className="w-full">
        Return to Home
      </Button>
    </CardContent>
  </Card>
);
