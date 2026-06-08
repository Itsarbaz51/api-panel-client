"use client";

import { useEffect, useState } from "react";

import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Button from "@/components/ui/Button";

export default function CommissionSettingForm({
  initialData,
  users = [],
  packages = [],
  providers = [],
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    scope: "USER",

    targetUserId: "",
    packageId: "",
    serviceProviderId: "",

    mode: "COMMISSION",
    type: "FIXED",

    value: 0,

    minAmount: 0,
    maxAmount: 0,

    isActive: true,

    supportsSlab: false,

    applyGST: false,
    gstPercent: 0,

    applyTDS: false,
    tdsPercent: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...formData,
        ...initialData,
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    await onSubmit(formData);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        <SelectField
          label="Scope"
          value={formData.scope}
          options={[
            {
              label: "User",
              value: "USER",
            },
            {
              label: "Package",
              value: "PACKAGE",
            },
          ]}
          onChange={(v) => handleChange("scope", v)}
        />

        <SelectField
          label="Service Provider"
          value={formData.serviceProviderId}
          options={providers.map((x) => ({
            label: x.name,
            value: x.id,
          }))}
          onChange={(v) => handleChange("serviceProviderId", v)}
        />

        {formData.scope === "USER" && (
          <SelectField
            label="User"
            value={formData.targetUserId}
            options={users.map((x) => ({
              label: x.fullName,
              value: x.id,
            }))}
            onChange={(v) => handleChange("targetUserId", v)}
          />
        )}

        {formData.scope === "PACKAGE" && (
          <SelectField
            label="Package"
            value={formData.packageId}
            options={packages.map((x) => ({
              label: x.name,
              value: x.id,
            }))}
            onChange={(v) => handleChange("packageId", v)}
          />
        )}

        <SelectField
          label="Mode"
          value={formData.mode}
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

        <SelectField
          label="Type"
          value={formData.type}
          options={[
            {
              label: "Fixed",
              value: "FIXED",
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

        <InputField
          label="Value"
          value={formData.value}
          onChange={(e) => handleChange("value", Number(e.target.value))}
        />

        <InputField
          label="Min Amount"
          value={formData.minAmount}
          onChange={(e) => handleChange("minAmount", Number(e.target.value))}
        />

        <InputField
          label="Max Amount"
          value={formData.maxAmount}
          onChange={(e) => handleChange("maxAmount", Number(e.target.value))}
        />

        <InputField
          label="GST %"
          value={formData.gstPercent}
          onChange={(e) => handleChange("gstPercent", Number(e.target.value))}
        />

        <InputField
          label="TDS %"
          value={formData.tdsPercent}
          onChange={(e) => handleChange("tdsPercent", Number(e.target.value))}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
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
