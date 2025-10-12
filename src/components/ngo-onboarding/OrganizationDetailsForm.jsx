import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/TextArea";
import { Label } from "../ui/Label";

export const OrganizationDetailsForm = ({
  formData,
  handleChange,
  handleFileChange,
  onNext,
  isValid,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Step 1/3: Organization Details</CardTitle>
      <CardDescription>
        Provide your organization's core information.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <Label htmlFor="organizationName">Organization Name *</Label>
        <Input
          id="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          placeholder="e.g., Hope Foundation"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="logo">Organization Logo</Label>
          <Input
            id="logo"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
        <div>
          <Label htmlFor="establishmentDate">Establishment Date</Label>
          <Input
            id="establishmentDate"
            type="date"
            value={formData.establishmentDate}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input
            id="websiteUrl"
            type="url"
            value={formData.websiteUrl}
            onChange={handleChange}
            placeholder="https://your-ngo.org"
          />
        </div>
        <div>
          <Label htmlFor="socialUrl">Social Media URL</Label>
          <Input
            id="socialUrl"
            type="url"
            value={formData.socialUrl}
            onChange={handleChange}
            placeholder="https://linkedin.com/company/your-ngo"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="mission">Mission Statement *</Label>
        <Textarea
          id="mission"
          value={formData.mission}
          onChange={handleChange}
          placeholder="What is your organization's primary goal?"
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="description">Detailed Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your work, impact, and activities."
          rows={6}
        />
      </div>
      <Button onClick={onNext} disabled={!isValid} className="w-full">
        Next: Contact & Address
      </Button>
    </CardContent>
  </Card>
);
