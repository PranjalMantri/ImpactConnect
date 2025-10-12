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

export const VerificationFinancialsForm = ({
  formData,
  handleChange,
  handleFileChange,
  onSubmit,
  onBack,
  isValid,
  isSubmitting,
  error,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Step 3/3: Verification & Financials</CardTitle>
      <CardDescription>
        Upload verification documents and provide payment details.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="space-y-4 p-4 border rounded-md">
        <h3 className="font-semibold">Verification Documents</h3>
        <div>
          <Label htmlFor="registrationCertificate">
            Registration Certificate (e.g., 80G, 12A) *
          </Label>
          <Input
            id="registrationCertificate"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.png"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
        <div>
          <Label htmlFor="taxExemption">Tax Exemption Certificate</Label>
          <Input
            id="taxExemption"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.png"
            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
      </div>
      <div className="space-y-4 p-4 border rounded-md">
        <h3 className="font-semibold">Payment Information</h3>
        <p className="text-sm text-muted-foreground">
          This information will be used to transfer donations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="paymentInfo.accountNumber">
              Bank Account Number *
            </Label>
            <Input
              id="paymentInfo.accountNumber"
              value={formData.paymentInfo.accountNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="paymentInfo.ifscCode">IFSC Code *</Label>
            <Input
              id="paymentInfo.ifscCode"
              value={formData.paymentInfo.ifscCode}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="paymentInfo.bankName">Bank Name</Label>
          <Input
            id="paymentInfo.bankName"
            value={formData.paymentInfo.bankName}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="paymentInfo.upiId">UPI ID (Optional)</Label>
          <Input
            id="paymentInfo.upiId"
            value={formData.paymentInfo.upiId}
            onChange={handleChange}
            placeholder="yourngo@upi"
          />
        </div>
      </div>
      {error && (
        <p className="text-sm font-medium text-red-500 text-center">{error}</p>
      )}
      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? "Submitting..." : "Submit for Review"}
        </Button>
      </div>
    </CardContent>
  </Card>
);
