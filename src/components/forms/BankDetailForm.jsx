"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Checkbox from "@/components/ui/Checkbox";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import { bankDetailSchema, defaultValues } from "@/validation/bankDetailSchema";

import { getValidationErrors } from "@/utils/validationErrors";

export default function BankDetailForm({
  data = defaultValues,
  users = [],
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

    Object.entries(data).forEach(([key, value]) => {
      if (key === "bankProofFile") return;

      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });

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

      {/* USER */}

      <SelectField
        label="User"
        value={data.userId}
        onChange={(value) => onChange("userId", value)}
        options={users.map((user) => ({
          label: user.fullName,
          value: user.id,
        }))}
        placeholder="Select User"
        error={errors.userId}
      />

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
      />

      {/* PHONE */}

      <InputField
        label="Phone Number"
        placeholder="Enter Phone Number"
        value={data.phoneNumber}
        onChange={(e) => onChange("phoneNumber", e.target.value)}
        error={errors.phoneNumber}
      />

      {/* BANK NAME */}

      <InputField
        label="Bank Name"
        placeholder="Enter Bank Name"
        value={data.bankName}
        onChange={(e) => onChange("bankName", e.target.value)}
        error={errors.bankName}
      />

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
            label: "Savings",
            value: "SAVINGS",
          },
          {
            label: "Current",
            value: "CURRENT",
          },
        ]}
        error={errors.accountType}
      />

      {/* PRIMARY */}

      <Checkbox
        label="Set As Primary Account"
        checked={data.isPrimary}
        onChange={(e) => onChange("isPrimary", e.target.checked)}
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
