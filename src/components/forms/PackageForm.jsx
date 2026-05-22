"use client";

import React, { useState } from "react";

import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

import { packageValidation } from "@/validation/packageValidation";
import { getValidationErrors } from "@/utils/validationErrors";

export default function PackageForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = packageValidation.safeParse(formData);

    // validation fail
    if (!result.success) {
      setErrors(getValidationErrors(result.error.errors));

      return;
    }

    // validation success
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* GRID */}
      <div className="grid gap-5">
        <InputField
          label="Package Name"
          name="name"
          placeholder="Package Name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">
          {initialData ? "Update Package" : "Create Package"}
        </Button>
      </div>
    </form>
  );
}
