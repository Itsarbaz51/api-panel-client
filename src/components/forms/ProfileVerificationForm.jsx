"use client";

import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ConfirmDialog";

import { profileVerificationValidation } from "@/validation/profileVerificationValidation";
import { getValidationErrors } from "@/utils/validationErrors";

// Steps
import PersonalStep from "./kyc-steps/PersonalStep";
import BusinessStep from "./kyc-steps/BusinessStep";
import AddressStep from "./kyc-steps/AddressStep";
import DocumentStep from "./kyc-steps/DocumentStep";
import PreviewStep from "./kyc-steps/PreviewStep";

const STEPS = ["Personal", "Business", "Address", "Documents", "Preview"];

export default function ProfileVerificationForm({
  initialValues,
  onSubmit,
  loading,
}) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);
  const [declaration, setDeclaration] = useState(false);

  const defaultFormData = {
    fullName: "",
    dob: "",
    gender: "",

    email: "",
    phoneNumber: "",

    companyName: "",
    businessType: "",
    kycType: "MANUAL",

    remarks: "",
    metadata: {},

    addresses: [
      {
        type: "HOME",
        address: "",
        pinCode: "",
        state: "",
        city: "",
        landmark: "",
      },
      {
        type: "OFFICE",
        address: "",
        pinCode: "",
        state: "",
        city: "",
        landmark: "",
      },
    ],

    documents: [
      {
        type: "AADHAR",
        documentNumber: "",
        file: null,
        remarks: "",
      },
      {
        type: "PAN",
        documentNumber: "",
        file: null,
        remarks: "",
      },
      {
        type: "GST",
        documentNumber: "",
        file: null,
        remarks: "",
      },
      {
        type: "USER_PHOTO",
        file: null,
        remarks: "",
      },
      {
        type: "BUSINESS_PHOTO",
        file: null,
        remarks: "",
      },
    ],
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (!initialValues) return;

    setFormData((prev) => ({
      ...prev,

      fullName: initialValues.fullName || "",
      dob: initialValues.dob ? initialValues.dob.split("T")[0] : "",
      gender: initialValues.gender || "",

      email: initialValues.email || "",
      phoneNumber: initialValues.phoneNumber || "",

      companyName: initialValues.companyName || "",
      businessType: initialValues.businessType || "",
      kycType: initialValues.kycType || "MANUAL",

      remarks: initialValues.remarks || "",
      metadata: initialValues.metadata || {},

      addresses:
        initialValues.addresses?.length > 0
          ? initialValues.addresses
          : prev.addresses,

      documents: prev.documents.map((doc) => {
        const existing = initialValues.documents?.find(
          (d) => d.type === doc.type,
        );

        if (!existing) return doc;

        return {
          ...doc,
          documentNumber: existing.documentNumber || "",
          remarks: existing.remarks || "",
          fileUrl: existing.fileUrl || "",
          file: null,
        };
      }),
    }));

    if (
      initialValues.addresses?.length >= 2 &&
      JSON.stringify(initialValues.addresses[0]) ===
        JSON.stringify({
          ...initialValues.addresses[1],
          type: "HOME",
        })
    ) {
      setSameAddress(true);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleAddressChange = (index, field, value) => {
    setFormData((prev) => {
      const addresses = [...prev.addresses];

      addresses[index][field] = value;

      if (sameAddress && index === 0) {
        addresses[1] = {
          ...addresses[0],
          type: "OFFICE",
        };
      }

      return {
        ...prev,
        addresses,
      };
    });
  };

  const handleDocumentChange = (index, field, value) => {
    setFormData((prev) => {
      const docs = [...prev.documents];

      docs[index][field] = value;

      return {
        ...prev,
        documents: docs,
      };
    });
  };

  const handleSameAddress = (e) => {
    const checked = e.target.checked;

    setSameAddress(checked);

    setFormData((prev) => {
      const addresses = [...prev.addresses];

      if (checked) {
        addresses[1] = {
          ...addresses[0],
          type: "OFFICE",
        };
      } else {
        addresses[1] = {
          type: "OFFICE",
          address: "",
          pinCode: "",
          state: "",
          city: "",
          landmark: "",
        };
      }

      return {
        ...prev,
        addresses,
      };
    });
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!declaration) {
      alert("Please accept declaration.");
      return;
    }

    const result = profileVerificationValidation.safeParse(formData);

    if (!result.success) {
      setErrors(getValidationErrors(result.error.issues));
      return;
    }

    setConfirmOpen(true);
  };

  const confirmSubmit = () => {
    setConfirmOpen(false);

    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="flex items-center justify-between">
          {STEPS.map((item, index) => (
            <div key={item} className="flex flex-1 items-center">
              <div
                className={`
                  h-10
                  w-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                  ${index <= step ? "bg-theme text-white" : "bg-slate-200"}
                `}
              >
                {index + 1}
              </div>

              <div className="ml-3">
                <p className="text-sm font-medium">{item}</p>
              </div>

              {index !== STEPS.length - 1 && (
                <div
                  className={`
                    flex-1
                    h-1
                    mx-4
                    rounded-full
                    ${index < step ? "bg-theme" : "bg-slate-200"}
                  `}
                />
              )}
            </div>
          ))}
        </div>

        {step === 0 && (
          <PersonalStep
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        )}

        {step === 1 && (
          <BusinessStep
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        )}

        {step === 2 && (
          <AddressStep
            formData={formData}
            errors={errors}
            sameAddress={sameAddress}
            handleSameAddress={handleSameAddress}
            handleAddressChange={handleAddressChange}
          />
        )}

        {step === 3 && (
          <DocumentStep
            formData={formData}
            errors={errors}
            declaration={declaration}
            setDeclaration={setDeclaration}
            handleDocumentChange={handleDocumentChange}
          />
        )}

        {step === 4 && <PreviewStep formData={formData} />}

        <div className="flex justify-between border-t pt-6">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0}
            onClick={handleBack}
          >
            Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" loading={loading}>
              Submit KYC
            </Button>
          )}
        </div>
      </form>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmSubmit}
        title="Submit KYC?"
        description="Once submitted, you won't be able to edit the details until verification is completed."
        confirmText="Submit"
        cancelText="Cancel"
        variant="info"
        loading={loading}
      />
    </>
  );
}
