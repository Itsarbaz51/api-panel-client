"use client";

import Input from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";

const businessTypeOptions = [
  {
    label: "Individual",
    value: "INDIVIDUAL",
  },
  {
    label: "Proprietorship",
    value: "PROPRIETORSHIP",
  },
  {
    label: "Partnership",
    value: "PARTNERSHIP",
  },
  {
    label: "Private Limited",
    value: "PRIVATE_LIMITED",
  },
  {
    label: "LLP",
    value: "LLP",
  },
];

export default function BusinessStep({
  formData,
  errors,
  handleChange,
  setFormData,
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Business Details</h2>

        <p className="text-slate-500 mt-1">Enter business information.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Company Name"
          required
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
        />

        <SelectField
          label="Business Type"
          value={formData.businessType}
          options={businessTypeOptions}
          error={errors.businessType}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              businessType: value,
            }))
          }
        />

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide mb-2">
            Remarks
          </label>

          <textarea
            rows={4}
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="
            w-full
            rounded-lg
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-theme
          "
            placeholder="Remarks..."
          />
        </div>
      </div>
    </div>
  );
}
