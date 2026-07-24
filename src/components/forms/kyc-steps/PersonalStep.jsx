"use client";

import Input from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";

const genderOptions = [
  {
    label: "Male",
    value: "MALE",
  },
  {
    label: "Female",
    value: "FEMALE",
  },
  {
    label: "Other",
    value: "OTHER",
  },
];

export default function PersonalStep({
  formData,
  errors,
  handleChange,
  setFormData,
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Personal Details</h2>

        <p className="text-slate-500 mt-1">Enter your personal information.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <Input
          label="Date Of Birth"
          type="date"
          name="dob"
          required
          value={formData.dob}
          onChange={handleChange}
          error={errors.dob}
        />

        <SelectField
          label="Gender"
          value={formData.gender}
          options={genderOptions}
          error={errors.gender}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              gender: value,
            }))
          }
        />

        <Input
          label="Email Address"
          type="email"
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Phone Number"
          required
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          maxLength={10}
        />
      </div>
    </div>
  );
}
