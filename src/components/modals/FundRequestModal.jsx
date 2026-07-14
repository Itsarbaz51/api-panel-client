"use client";

import { useEffect, useState } from "react";

import FundRequestForm from "@/components/forms/FundRequestForm";
import { defaultValues } from "@/validation/fundRequestSchema";
import { v4 as uuidv4 } from "uuid";

export default function FundRequestModal({
  open,
  onClose,
  loading,
  initialData,
  onSubmit,
}) {
  const [formData, setFormData] = useState(defaultValues);
  const [idempotencyKey] = useState(uuidv4());

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount,
        rrn: initialData.rrn || "",
        transactionDate: initialData.transactionDate
          ? new Date(initialData.transactionDate).toISOString().slice(0, 16)
          : "",
        paymentImage: null,
        idempotencyKey: initialData.idempotencyKey,
      });
    } else {
      setFormData({
        ...defaultValues,
        idempotencyKey: idempotencyKey,
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (payload) => {
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-2xl rounded-3xl border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">
              {initialData ? "Update Fund Request" : "Create Fund Request"}
            </h2>

            <p className="text-sm text-muted-foreground">
              Submit bank transfer fund request
            </p>
          </div>

          <button onClick={onClose} className="h-10 w-10 rounded-xl">
            ✕
          </button>
        </div>

        <div className="p-6">
          <FundRequestForm
            data={formData}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
