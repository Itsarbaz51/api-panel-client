"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Checkbox from "@/components/ui/Checkbox";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import { bankDetailSchema } from "@/validation/bankDetailSchema";

import { getValidationErrors } from "@/utils/validationErrors";

export default function BankDetailForm({
  data,
  loading = false,
  onChange,
  onSubmit,
}) {
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setErrors({});
    setFormError("");
  }, [data]);

  const submit = () => {
    setErrors({});
    setFormError("");

    const result = bankDetailSchema.safeParse(data);

    if (!result.success) {
      setErrors(getValidationErrors(result.error.issues));
      setFormError("Please fix validation errors");
      return;
    }

    const formData = new FormData();

    formData.append("accountHolder", data.accountHolder);
    formData.append("accountNumber", data.accountNumber);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("bankName", data.bankName);
    formData.append("ifscCode", data.ifscCode);
    formData.append("accountType", data.accountType);
    formData.append("isPrimary", data.isPrimary);

    if (data.bankProofFile instanceof File) {
      formData.append("bankProofFile", data.bankProofFile);
    }

    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      {formError && (
        <Alert type="error" title="Validation Error" icon={<AlertCircle />}>
          {formError}
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ACCOUNT HOLDER */}

        <InputField
          label="Account Holder"
          placeholder="Enter Account Holder"
          value={data.accountHolder}
          onChange={(e) => onChange("accountHolder", e.target.value)}
          error={errors.accountHolder}
        />

        {/* ACCOUNT NUMBER */}

        <InputField
          label="Account Number"
          placeholder="Enter Account Number"
          value={data.accountNumber}
          onChange={(e) => onChange("accountNumber", e.target.value)}
          error={errors.accountNumber}
          maxLength={18}
        />
      </div>

      {/* PHONE */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Phone Number"
          placeholder="Enter Phone Number"
          value={data.phoneNumber}
          onChange={(e) => onChange("phoneNumber", e.target.value)}
          error={errors.phoneNumber}
          maxLength={10}
        />

        {/* BANK NAME */}

        <InputField
          label="Bank Name"
          placeholder="Enter Bank Name"
          value={data.bankName}
          onChange={(e) => onChange("bankName", e.target.value)}
          error={errors.bankName}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IFSC */}
        <InputField
          label="IFSC Code"
          placeholder="Enter IFSC Code"
          value={data.ifscCode}
          onChange={(e) => onChange("ifscCode", e.target.value.toUpperCase())}
          error={errors.ifscCode}
        />

        {/* ACCOUNT TYPE */}
        <SelectField
          label="Account Type"
          value={data.accountType}
          onChange={(value) => onChange("accountType", value)}
          options={[
            {
              label: "Personal",
              value: "PERSONAL",
            },
            {
              label: "Business",
              value: "BUSINESS",
            },
          ]}
          error={errors.accountType}
        />
      </div>

      {/* PRIMARY */}
      <Checkbox
        label="Set As Primary Account"
        checked={data.isPrimary}
        onChange={(e) => onChange("isPrimary", e.target.checked)}
        error={errors.isPrimary}
      />

      {/* FILE */}

      <FileUpload
        label="Bank Proof"
        accept="image/*,.pdf"
        value={data.bankProofFile}
        onChange={(file) => onChange("bankProofFile", file)}
        error={errors.bankProofFile}
      />

      {/* BUTTON */}

      <Button loading={loading} onClick={submit} className="w-full">
        Save Bank Detail
      </Button>
    </div>
  );
}
