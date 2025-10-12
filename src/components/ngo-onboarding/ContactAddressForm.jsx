import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

export const ContactAddressForm = ({
  formData,
  handleChange,
  onNext,
  onBack,
  isValid,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Step 2/3: Contact & Address</CardTitle>
      <CardDescription>
        Provide contact details for official communication.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-4 p-4 border rounded-md">
        <h3 className="font-semibold">Contact Person Details</h3>
        <div>
          <Label htmlFor="contactPerson.name">Full Name *</Label>
          <Input
            id="contactPerson.name"
            value={formData.contactPerson.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactPerson.email">Email Address *</Label>
            <Input
              id="contactPerson.email"
              type="email"
              value={formData.contactPerson.email}
              onChange={handleChange}
              placeholder="contact@example.com"
            />
          </div>
          <div>
            <Label htmlFor="contactPerson.phone">Phone Number</Label>
            <Input
              id="contactPerson.phone"
              type="tel"
              value={formData.contactPerson.phone}
              onChange={handleChange}
              placeholder="+91 12345 67890"
            />
          </div>
        </div>
      </div>
      <div className="space-y-4 p-4 border rounded-md">
        <h3 className="font-semibold">Organization Address</h3>
        <div>
          <Label htmlFor="address.street">Street Address</Label>
          <Input
            id="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="address.city">City *</Label>
            <Input
              id="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="address.state">State / Province</Label>
            <Input
              id="address.state"
              value={formData.address.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="address.postalCode">Postal Code</Label>
            <Input
              id="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="address.country">Country *</Label>
            <Input
              id="address.country"
              value={formData.address.country}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="flex-1">
          Next: Verification
        </Button>
      </div>
    </CardContent>
  </Card>
);
