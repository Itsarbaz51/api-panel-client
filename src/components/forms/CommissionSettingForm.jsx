"use client";

import { useEffect, useState } from "react";

import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Button from "@/components/ui/Button";
import Checkbox from "../ui/Checkbox";
import { getValidationErrors } from "@/utils/validationErrors";
import { commissionSettingValidation } from "@/validation/commissionSettingValidation";
import Alert from "../ui/Alert";
import { AlertCircle } from "lucide-react";

export default function CommissionSettingForm({
  initialData,
  users = [],
  packages = [],
  providers = [],
  onSubmit,
  onCancel,
}) {
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    scope: "USER",

    targetUserId: "",
    packageId: "",
    serviceProviderId: "",

    isActive: true,
    supportsSlab: false,
    supportPaymentMethod: false,

    paymentMethod: "",
    network: "",

    category: "",
    operator: "",
    operatorCode: "",

    bankCode: "",
    transactionType: "",

    mode: "COMMISSION",
    type: "FLAT",

    value: 0,

    minAmount: 0,
    maxAmount: 0,

    applyGST: false,
    gstPercent: 0,

    applyTDS: false,
    tdsPercent: 0,
  });

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      scope: initialData.targetUserId
        ? "USER"
        : initialData.packageId
          ? "PACKAGE"
          : initialData.scope || "USER",

      targetUserId: initialData.targetUserId || "",
      packageId: initialData.packageId || "",
      serviceProviderId: initialData.serviceProviderId || "",

      isActive: initialData.isActive ?? true,
      supportsSlab: initialData.supportsSlab ?? false,
      supportPaymentMethod: initialData.supportPaymentMethod ?? false,

      paymentMethod: initialData.paymentMethod || "",
      network: initialData.network || "",

      category: initialData.category || "",
      operator: initialData.operator || "",
      operatorCode: initialData.operatorCode || "",

      bankCode: initialData.bankCode || "",
      transactionType: initialData.transactionType || "",

      mode: initialData.mode || "COMMISSION",
      type: initialData.type || "FLAT",

      value: initialData.value ?? 0,

      minAmount: initialData.minAmount ?? 0,
      maxAmount: initialData.maxAmount ?? 0,

      applyGST: initialData.applyGST ?? false,
      gstPercent: initialData.gstPercent ?? 0,

      applyTDS: initialData.applyTDS ?? false,
      tdsPercent: initialData.tdsPercent ?? 0,
    });
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setErrors({});
    setFormError("");

    const payload = {
      ...formData,
      value: Number(formData.value),
      minAmount: Number(formData.minAmount),
      maxAmount: Number(formData.maxAmount),
      gstPercent: Number(formData.gstPercent),
      tdsPercent: Number(formData.tdsPercent),
    };

    if (!payload.targetUserId) {
      delete payload.targetUserId;
    }

    if (!payload.packageId) {
      delete payload.packageId;
    }

    const validation = commissionSettingValidation.safeParse(payload);

    if (!validation.success) {
      setErrors(getValidationErrors(validation.error.issues));

      return;
    }

    const result = await onSubmit(validation.data);

    if (!result?.success) {
      setFormError(result?.message || "Failed to save");
    }
  };
  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid grid-cols-2 gap-5">
        {formError && (
          <Alert type="error" title="Error" icon={<AlertCircle />}>
            {formError}
          </Alert>
        )}
        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">{formError}</p>
          </div>
        )}
        {/* Scope */}

        <div>
          <label className="text-sm font-medium mb-2 block">Scope</label>

          <SelectField
            value={formData.scope}
            options={[
              { label: "User", value: "USER" },
              { label: "Package", value: "PACKAGE" },
            ]}
            onChange={(v) => {
              setFormData((prev) => ({
                ...prev,
                scope: v,
                targetUserId: v === "PACKAGE" ? "" : prev.targetUserId,
                packageId: v === "USER" ? "" : prev.packageId,
              }));
            }}
          />
        </div>

        {/* Service Provider */}

        <div>
          <label className="text-sm font-medium mb-2 block">
            Service Provider
          </label>

          <SelectField
            searchable
            value={formData.serviceProviderId}
            error={errors.serviceProviderId}
            options={providers?.map((sp) => ({
              label: `${sp.service?.name || ""} • ${sp.provider?.name || ""}`,
              value: sp.id,
            }))}
            onChange={(v) => handleChange("serviceProviderId", v)}
          />
        </div>

        {/* User */}

        {formData.scope === "USER" && (
          <div>
            <label className="text-sm font-medium mb-2 block">User</label>

            <SelectField
              searchable
              value={formData.targetUserId}
              error={errors.targetUserId}
              options={users?.map((u) => ({
                label: `${u.fullName} (${u.registrationNumber})`,
                value: u.id,
              }))}
              onChange={(v) => handleChange("targetUserId", v)}
            />
          </div>
        )}

        {/* Package */}

        {formData.scope === "PACKAGE" && (
          <div>
            <label className="text-sm font-medium mb-2 block">Package</label>

            <SelectField
              searchable
              value={formData.packageId}
              error={errors.packageId}
              options={packages?.map((p) => ({
                label: p.name,
                value: p.id,
              }))}
              onChange={(v) => handleChange("packageId", v)}
            />
          </div>
        )}

        {/* Mode */}

        <div>
          <label className="text-sm font-medium mb-2 block">Mode</label>

          <SelectField
            value={formData.mode}
            error={errors.mode}
            options={[
              {
                label: "Commission",
                value: "COMMISSION",
              },
              {
                label: "Surcharge",
                value: "SURCHARGE",
              },
              {
                label: "None",
                value: "NONE",
              },
            ]}
            onChange={(v) => handleChange("mode", v)}
          />
        </div>

        {/* Type */}

        <div>
          <label className="text-sm font-medium mb-2 block">Type</label>

          <SelectField
            value={formData.type}
            error={errors.type}
            options={[
              {
                label: "Flat",
                value: "FLAT",
              },
              {
                label: "Percentage",
                value: "PERCENTAGE",
              },
              {
                label: "None",
                value: "NONE",
              },
            ]}
            onChange={(v) => handleChange("type", v)}
          />
        </div>

        <InputField
          label="Value"
          value={formData.value}
          error={errors.value}
          onChange={(e) => handleChange("value", e.target.value)}
        />

        {formData.supportsSlab && (
          <>
            <InputField
              label="Min Amount"
              value={formData.minAmount}
              error={errors.minAmount}
              onChange={(e) => handleChange("minAmount", e.target.value)}
            />

            <InputField
              label="Max Amount"
              value={formData.maxAmount}
              error={errors.maxAmount}
              onChange={(e) => handleChange("maxAmount", e.target.value)}
            />
          </>
        )}

        {formData.supportPaymentMethod && (
          <>
            <InputField
              label="Payment Method"
              value={formData.paymentMethod}
              error={errors.paymentMethod}
              onChange={(e) => handleChange("paymentMethod", e.target.value)}
            />

            <InputField
              label="Network"
              value={formData.network}
              error={errors.network}
              onChange={(e) => handleChange("network", e.target.value)}
            />

            <InputField
              label="Category"
              value={formData.category}
              error={errors.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />

            <InputField
              label="Operator"
              value={formData.operator}
              error={errors.operator}
              onChange={(e) => handleChange("operator", e.target.value)}
            />

            <InputField
              label="Operator Code"
              value={formData.operatorCode}
              error={errors.operatorCode}
              onChange={(e) => handleChange("operatorCode", e.target.value)}
            />

            <InputField
              label="Bank Code"
              value={formData.bankCode}
              error={errors.bankCode}
              onChange={(e) => handleChange("bankCode", e.target.value)}
            />
          </>
        )}

        <InputField
          label="Transaction Type"
          value={formData.transactionType}
          error={errors.transactionType}
          onChange={(e) => handleChange("transactionType", e.target.value)}
        />

        {formData.mode === "SURCHARGE" && formData.applyGST && (
          <InputField
            label="GST %"
            value={formData.gstPercent}
            error={errors.gstPercent}
            onChange={(e) => handleChange("gstPercent", e.target.value)}
          />
        )}

        {formData.mode === "COMMISSION" && formData.applyTDS && (
          <InputField
            label="TDS %"
            value={formData.tdsPercent}
            error={errors.tdsPercent}
            onChange={(e) => handleChange("tdsPercent", e.target.value)}
          />
        )}
      </div>

      {/* Checkboxes */}

      <div className="grid grid-cols-3 gap-4">
        <Checkbox
          label="Active"
          checked={formData.isActive}
          onChange={(e) => handleChange("isActive", e.target.checked)}
        />

        <Checkbox
          label="Support Payment Method"
          checked={formData.supportPaymentMethod}
          onChange={(e) =>
            handleChange("supportPaymentMethod", e.target.checked)
          }
        />

        <Checkbox
          label="Supports Slab"
          checked={formData.supportsSlab}
          onChange={(e) => handleChange("supportsSlab", e.target.checked)}
        />

        {formData.mode === "SURCHARGE" && (
          <>
            <Checkbox
              label="Apply GST"
              checked={formData.applyGST}
              onChange={(e) => handleChange("applyGST", e.target.checked)}
            />
          </>
        )}

        {formData.mode === "COMMISSION" && (
          <>
            <Checkbox
              label="Apply TDS"
              checked={formData.applyTDS}
              onChange={(e) => handleChange("applyTDS", e.target.checked)}
            />
          </>
        )}
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">
          {initialData ? "Update Commission" : "Create Commission"}
        </Button>
      </div>
    </form>
  );
}
