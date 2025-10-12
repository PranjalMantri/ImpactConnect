import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import Navbar from "../components/Navbar";

import { OrganizationDetailsForm } from "../components/ngo-onboarding/OrganizationDetailsForm";
import { ContactAddressForm } from "../components/ngo-onboarding/ContactAddressForm";
import { VerificationFinancialsForm } from "../components/ngo-onboarding/VerificationFinancialsForm";
import { SubmissionSuccess } from "../components/ngo-onboarding/SubmissionSuccess";

const NGOOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    organizationName: "",
    establishmentDate: "",
    websiteUrl: "",
    socialUrl: "",
    mission: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
    contactPerson: { name: "", email: "", phone: "" },
    paymentInfo: { bankName: "", accountNumber: "", ifscCode: "", upiId: "" },
  });

  const [documents, setDocuments] = useState({
    logo: null,
    registrationCertificate: null,
    taxExemption: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id.includes(".")) {
      const [parentKey, childKey] = id.split(".");
      setFormData((prev) => ({
        ...prev,
        [parentKey]: { ...prev[parentKey], [childKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (files.length > 0) {
      setDocuments((prev) => ({ ...prev, [id]: files[0] }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw userError || new Error("User not found.");

      let logoUrl = null;
      if (documents.logo) {
        const filePath = `${user.id}/logo.${documents.logo.name
          .split(".")
          .pop()}`;
        const { error: uploadError } = await supabase.storage
          .from("ngo-logos")
          .upload(filePath, documents.logo, { upsert: true });
        if (uploadError) throw uploadError;
        const {
          data: { publicUrl },
        } = supabase.storage.from("ngo-logos").getPublicUrl(filePath);
        logoUrl = publicUrl;
      }

      let verificationDocsJson = {};
      if (documents.registrationCertificate) {
        const filePath = `${
          user.id
        }/registration_certificate.${documents.registrationCertificate.name
          .split(".")
          .pop()}`;
        const { error: uploadError } = await supabase.storage
          .from("ngo-verification-docs")
          .upload(filePath, documents.registrationCertificate, {
            upsert: true,
          });
        if (uploadError) throw uploadError;
        verificationDocsJson.registrationCertificatePath = filePath;
      }
      if (documents.taxExemption) {
        const filePath = `${user.id}/tax_exemption.${documents.taxExemption.name
          .split(".")
          .pop()}`;
        const { error: uploadError } = await supabase.storage
          .from("ngo-verification-docs")
          .upload(filePath, documents.taxExemption, { upsert: true });
        if (uploadError) throw uploadError;
        verificationDocsJson.taxExemptionPath = filePath;
      }

      const ngoDataToInsert = {
        id: user.id,
        organization_name: formData.organizationName,
        description: formData.description,
        mission: formData.mission,
        address: formData.address,
        contact_person: formData.contactPerson,
        payment_info: formData.paymentInfo,
        verification_documents: verificationDocsJson,
        logo_url: logoUrl,
        establishment_date: formData.establishmentDate,
        website_url: formData.websiteUrl,
        social_url: formData.socialUrl,
      };

      const { error: insertError } = await supabase
        .from("ngos")
        .insert(ngoDataToInsert);
      if (insertError) throw insertError;

      setStep(4);
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStep1Valid =
    formData.organizationName && formData.mission && formData.description;
  const isStep2Valid =
    formData.contactPerson.name &&
    formData.contactPerson.email &&
    formData.address.city &&
    formData.address.country;
  const isStep3Valid =
    documents.registrationCertificate &&
    formData.paymentInfo.accountNumber &&
    formData.paymentInfo.ifscCode;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OrganizationDetailsForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            onNext={() => setStep(2)}
            isValid={isStep1Valid}
          />
        );
      case 2:
        return (
          <ContactAddressForm
            formData={formData}
            handleChange={handleChange}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            isValid={isStep2Valid}
          />
        );
      case 3:
        return (
          <VerificationFinancialsForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            onSubmit={handleSubmit}
            onBack={() => setStep(2)}
            isValid={isStep3Valid}
            isSubmitting={isSubmitting}
            error={error}
          />
        );
      case 4:
        return <SubmissionSuccess onReturnHome={() => navigate("/")} />;
      default:
        return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="mt-10 flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Register Your NGO
          </h1>
          {renderStep()}
        </div>
      </main>
    </div>
  );
};

export default NGOOnboarding;
