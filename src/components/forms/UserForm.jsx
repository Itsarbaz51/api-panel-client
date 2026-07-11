"use client";

import React, { useEffect, useMemo, useState } from "react";

import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import { AlertCircle, Upload } from "lucide-react";

import { userValidation } from "@/validation/userValidation";
import { getValidationErrors } from "@/utils/validationErrors";
import SelectField from "../ui/SelectField";

const companyTypeOptions = [
  { label: "Private Limited", value: "PRIVATE_LIMITED" },
  { label: "Public Limited", value: "PUBLIC_LIMITED" },
  { label: "LLP", value: "LLP" },
];

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "IN_ACTIVE" },
  { label: "Deleted", value: "DELETED" },
];

export default function UserForm({
  packages = [],
  initialData,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    companyType: "PRIVATE_LIMITED",
    status: "ACTIVE",
    email: "",
    phoneNumber: "",
    packageId: "",
    profileImage: null,
  });

  const [packageSearch, setPackageSearch] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  /* EDIT DATA EFFECT */
  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        companyName: initialData.companyName || "",
        companyType: initialData.companyType || "PRIVATE_LIMITED",
        status: initialData.status || "ACTIVE",
        email: initialData.email || "",
        phoneNumber: initialData.phoneNumber || "",
        packageId: initialData.packageId || initialData.package?.id || "",
        profileImage: null,
      });

      setPackageSearch(
        initialData.package?.name || initialData.packageName || "",
      );

      if (initialData.profileImage) {
        setImagePreview(initialData.profileImage);
      } else {
        setImagePreview("");
      }
    } else {
      // Create mode ke liye states reset
      setFormData({
        fullName: "",
        companyName: "",
        companyType: "PRIVATE_LIMITED",
        status: "ACTIVE",
        email: "",
        phoneNumber: "",
        packageId: "",
        profileImage: null,
      });
      setPackageSearch("");
      setImagePreview("");
    }
  }, [initialData]);

  const clearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
    setFormError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = value;

    if (name === "phoneNumber") {
      updated = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updated,
    }));

    clearError(name);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));

      setImagePreview(URL.createObjectURL(file));
      clearError("profileImage");
    }
  };

  const packageList = packages?.data || [];

  const filteredPackages = useMemo(() => {
    if (!packageSearch.trim()) {
      return packageList;
    }

    return packageList.filter((pkg) =>
      pkg?.name?.toLowerCase().includes(packageSearch.toLowerCase()),
    );
  }, [packageList, packageSearch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setFormError("");

    const validation = userValidation.safeParse(formData);

    if (!validation.success) {
      setErrors(getValidationErrors(validation.error.issues));
      return;
    }

    try {
      if (initialData) {
        // --- EDIT MODE: Send multipart FormData ---
        const dataToSend = new FormData();

        Object.keys(validation.data).forEach((key) => {
          if (key !== "profileImage" && validation.data[key] !== undefined) {
            dataToSend.append(key, validation.data[key]);
          }
        });

        // Always append profileImage if it exists (new file or keep existing)
        if (formData.profileImage instanceof File) {
          dataToSend.append("profileImage", formData.profileImage);
        }

        await onSubmit(dataToSend);
      } else {
        // --- CREATE MODE: Send JSON payload ---
        const { profileImage, ...cleanPayload } = validation.data;
        await onSubmit(cleanPayload);
      }

      // Reset Form after successful submit
      setFormData({
        fullName: "",
        companyName: "",
        companyType: "PRIVATE_LIMITED",
        status: "ACTIVE",
        email: "",
        phoneNumber: "",
        packageId: "",
        profileImage: null,
      });
      setPackageSearch("");
      setImagePreview("");
    } catch {
      setFormError("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-h-[75vh]">
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        {formError && (
          <Alert type="error" title="Error" icon={<AlertCircle />}>
            {formError}
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-5">
          {/* FIX: Yeh section ab sirf Edit mode (initialData) hone par hi render hoga */}
          {initialData && (
            <div className="col-span-2 flex items-center gap-4 p-4 border rounded-xl bg-gray-50/50">
              <div className="relative h-16 w-16 rounded-full border bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Upload className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-700">
                  Update Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {errors.profileImage && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.profileImage}
                  </p>
                )}
              </div>
            </div>
          )}

          <InputField
            label="FULL NAME"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <InputField
            label="COMPANY NAME"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
          />

          <div>
            <SelectField
              label="COMPANY TYPE"
              value={formData.companyType}
              options={companyTypeOptions}
              onChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  companyType: value,
                }));
                clearError("companyType");
              }}
              placeholder="Select company type"
            />
          </div>

          <div>
            <SelectField
              label="STATUS"
              value={formData.status}
              options={statusOptions}
              onChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  status: value,
                }));
                clearError("status");
              }}
              placeholder="Select status"
            />
          </div>

          <InputField
            label="EMAIL"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="PHONE"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
          />

          <div className="relative">
            <InputField
              label="SEARCH PACKAGE"
              value={packageSearch}
              placeholder="Search package"
              onFocus={() => setPackageSearch("")}
              onChange={(e) => {
                setPackageSearch(e.target.value);

                setFormData((prev) => ({
                  ...prev,
                  packageId: "",
                }));
              }}
            />

            <div className="absolute w-full bg-white border rounded-xl mt-1 z-50 max-h-48 overflow-y-auto shadow-lg">
              {filteredPackages.length ? (
                filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="p-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setPackageSearch(pkg.name);

                      setFormData((prev) => ({
                        ...prev,
                        packageId: pkg.id,
                      }));
                    }}
                  >
                    {pkg.name}
                  </div>
                ))
              ) : (
                <div className="p-3 text-sm text-gray-500">
                  No Package Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t pt-5 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
}
