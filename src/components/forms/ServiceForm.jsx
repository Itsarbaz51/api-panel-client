"use client";

import { useState } from "react";

import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Button from "@/components/ui/Button";

const statusOptions = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
];

export default function ServiceForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    code: initialData?.code || "",
    status: initialData?.status || "ACTIVE",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <InputField
        label="Service Name"
        name="name"
        placeholder="BBPS"
        value={formData.name}
        onChange={handleChange}
      />

      <InputField
        label="Service Code"
        name="code"
        placeholder="BBPS"
        value={formData.code}
        onChange={handleChange}
      />

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Status
        </label>

        <SelectField
          value={formData.status}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              status: value,
            }))
          }
          options={statusOptions}
        />

      </div>

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {initialData
            ? "Update Service"
            : "Create Service"}
        </Button>

      </div>

    </form>
  );
}