"use client";

import BankDetailForm from "@/components/forms/BankDetailForm";

import { useEffect, useState } from "react";
import { defaultValues } from "@/validation/bankDetailSchema";

export default function BankDetailModal({
  open,
  onClose,
  initialData,
  loading,
  onSubmit,
}) {
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    if (initialData) {
      setFormData({
        accountHolder: initialData.accountHolder,
        accountNumber: initialData.accountNumber,
        phoneNumber: initialData.phoneNumber,
        bankName: initialData.bankName,
        ifscCode: initialData.ifscCode,
        accountType: initialData.accountType,
        isPrimary: initialData.isPrimary,
        bankProofFile: null,
      });
    } else {
      setFormData(defaultValues);
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
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-xl font-semibold">
              {initialData ? "Update Bank Detail" : "Add Bank Detail"}
            </h2>

            <p className="text-sm text-muted-foreground">Manage bank details</p>
          </div>

          <button onClick={onClose} className="h-10 w-10 rounded-xl">
            ✕
          </button>
        </div>

        <div className="p-6">
          <BankDetailForm
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
