"use client";

import { useEffect, useState } from "react";

import Button from "../ui/Button";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Alert from "../ui/Alert";

import { AlertCircle } from "lucide-react";

import { apiKeyProviderMappingValidation } from "@/validation/apiKeyProviderMappingValidation";
import { getValidationErrors } from "@/utils/validationErrors";

export default function ApiKeyProviderMappingForm({
  initialData,
  onSubmit,
  onCancel,
  apiKeys = [],
  services = [],
  providers = [],
}) {
  const [formData, setFormData] = useState({
    apiKeyId: "",
    serviceId: "",
    providerId: "",
    priority: 1,
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        apiKeyId: initialData.apiKeyId || "",
        serviceId: initialData.serviceId || "",
        providerId: initialData.providerId || "",
        priority: initialData.priority || 1,
        isActive: typeof initialData.isActive === "boolean" ? initialData.isActive : true,
      });
    }
  }, [initialData]);

  const clearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setFormError("");

    const validation = apiKeyProviderMappingValidation.safeParse({
      ...formData,
      priority: Number(formData.priority),
    });

    if (!validation.success) {
      setErrors(getValidationErrors(validation.error.issues));
      return;
    }

    try {
      // The API call is succeeding, but something inside or after this call throws an exception
      await onSubmit(validation.data);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      console.error("Form submission failed client-side:", error);
      setFormError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-h-[75vh] flex-col"
    >
      <div className="flex-1 space-y-6 overflow-y-auto">
        {formError && (
          <Alert type="error" title="Error" icon={<AlertCircle />}>
            {formError}
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-5">

          <div>
            <SelectField
              label="API KEY"
              value={formData.apiKeyId}
              error={errors.apiKeyId}
              options={apiKeys.map((item) => {
                const title = item.name || item.user?.fullName || item.apiKey || item.id || "Unknown";
                const subtitle = item.user?.fullName ? ` (${item.user.fullName})` : "";

                return {
                  label: item.name ? `${item.name}${subtitle}` : title,
                  value: item.id,
                };
              })}
              searchable
              onChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  apiKeyId: value,
                }));
                clearError("apiKeyId");
              }}
              placeholder="Select API Key"
            />
          </div>

          <div>
            <SelectField
              label="SERVICE"
              value={formData.serviceId}
              error={errors.serviceId}
              options={services.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              searchable
              onChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  serviceId: value,
                }));
                clearError("serviceId");
              }}
              placeholder="Select Service"
            />
          </div>

          <div>
            <SelectField
              label="PROVIDER"
              value={formData.providerId}
              error={errors.providerId}
              options={providers.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              searchable
              onChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  providerId: value,
                }));
                clearError("providerId");
              }}
              placeholder="Select Provider"
            />
          </div>

          <InputField
            label="PRIORITY"
            type="number"
            name="priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                priority: e.target.value,
              }))
            }
          />

          <div className="col-span-2">
            <SelectField
              label="STATUS"
              value={formData.isActive ? "true" : "false"}
              options={[
                {
                  label: "Active",
                  value: "true",
                },
                {
                  label: "Inactive",
                  value: "false",
                },
              ]}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  isActive: value === "true",
                }))
              }
            />
          </div>

        </div>
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {initialData ? "Update Mapping" : "Create Mapping"}
        </Button>

      </div>
    </form>
  );
}