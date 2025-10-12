import { Card, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";

const DonationList = ({ donations }) => {
  if (!donations || donations.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          No donations recorded yet. Share your mission!
        </CardContent>
      </Card>
    );
  }

  return donations.map((donation) => (
    <Card key={donation.id}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-xl">
              ${Number(donation.amount).toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(donation.created_at).toLocaleDateString()}
            </p>
            {donation.message && (
              <p className="text-sm mt-2 italic p-2 bg-muted rounded">
                "{donation.message}"
              </p>
            )}
          </div>
          <Badge
            variant={donation.frequency === "monthly" ? "default" : "secondary"}
          >
            {donation.frequency}
          </Badge>
        </div>
      </CardContent>
    </Card>
  ));
};

export default DonationList;
