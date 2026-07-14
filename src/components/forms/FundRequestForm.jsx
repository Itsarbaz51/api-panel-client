"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

import InputField from "@/components/ui/InputField";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import { fundRequestSchema } from "@/validation/fundRequestSchema";
import { getValidationErrors } from "@/utils/validationErrors";

export default function FundRequestForm({
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

    const result = fundRequestSchema.safeParse(data);

    if (!result.success) {
      setErrors(getValidationErrors(result.error.issues));
      setFormError("Please fix validation errors.");
      return;
    }

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "paymentImage") return;

      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    if (data.paymentImage instanceof File) {
      formData.append("paymentImage", data.paymentImage);
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

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Amount"
          type="number"
          value={data.amount}
          placeholder="Enter Amount"
          onChange={(e) => onChange("amount", e.target.value)}
          error={errors.amount}
        />

        <InputField
          label="RRN Number"
          value={data.rrn}
          placeholder="Enter RRN"
          onChange={(e) => onChange("rrn", e.target.value)}
          error={errors.rrn}
        />
      </div>

      <InputField
        label="Transaction Date"
        type="datetime-local"
        value={data.transactionDate}
        onChange={(e) => onChange("transactionDate", e.target.value)}
        error={errors.transactionDate}
      />

      <FileUpload
        label="Payment Screenshot"
        accept="image/*,.pdf"
        value={data.paymentImage}
        onChange={(file) => onChange("paymentImage", file)}
        error={errors.paymentImage}
      />

      <Button className="w-full" loading={loading} onClick={submit}>
        Submit Fund Request
      </Button>
    </div>
  );
}
