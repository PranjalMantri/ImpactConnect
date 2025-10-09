import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { RadioGroup, RadioGroupItem } from "../components/ui/RadioGroup";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import Navbar from "../components/Navbar";

const Donate = () => {
  const [donationFrequency, setDonationFrequency] = useState("one-time");
  const [amount, setAmount] = useState("50.00");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-2">Make a Donation</h1>
            <p className="text-muted-foreground mb-8">
              Your contribution makes a world of difference. Thank you for your
              support.
            </p>

            <div className="space-y-6">
              {/* Organization Select */}
              <div>
                <Label htmlFor="organization">Select Organization</Label>
                <Select>
                  <SelectTrigger id="organization">
                    <SelectValue placeholder="Choose an organization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="org1">
                      Helping Hands Foundation
                    </SelectItem>
                    <SelectItem value="org2">Hope for Tomorrow</SelectItem>
                    <SelectItem value="org3">Community Care Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Donation Amount */}
              <div>
                <Label htmlFor="amount">Donation Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="0.01"
                />
              </div>

              {/* Donation Frequency */}
              <div>
                <Label className="mb-3 block">Donation Frequency</Label>
                <RadioGroup
                  value={donationFrequency}
                  onValueChange={setDonationFrequency}
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-primary bg-secondary">
                    <RadioGroupItem value="one-time" id="one-time" />
                    <Label htmlFor="one-time" className="cursor-pointer flex-1">
                      One-time
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="cursor-pointer flex-1">
                      Monthly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                    <RadioGroupItem value="quarterly" id="quarterly" />
                    <Label
                      htmlFor="quarterly"
                      className="cursor-pointer flex-1"
                    >
                      Quarterly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                    <RadioGroupItem value="annually" id="annually" />
                    <Label htmlFor="annually" className="cursor-pointer flex-1">
                      Annually
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* How Your Donation Helps */}
              <div>
                <h3 className="font-bold mb-4">How Your Donation Helps</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Emergency Relief</span>
                      <span className="font-semibold">30%</span>
                    </div>
                    <Progress value={30} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Community Development</span>
                      <span className="font-semibold">40%</span>
                    </div>
                    <Progress value={40} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Education Programs</span>
                      <span className="font-semibold">30%</span>
                    </div>
                    <Progress value={30} />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-bold mb-4">Payment Information</h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="•••• •••• •••• ••••" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="•••" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-relaxed cursor-pointer"
                >
                  I agree to the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    terms and conditions
                  </a>
                </Label>
              </div>

              {/* Submit Button */}
              <Button className="w-full" size="lg">
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;
