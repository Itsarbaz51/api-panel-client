"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import { AlertCircle } from "lucide-react";

import { useGetAllServices } from "@/hooks/useService";
import { useGetAllProviders } from "@/hooks/useProvider";

import { serviceProviderValidation } from "@/validation/serviceProviderValidation";
import { getValidationErrors } from "@/utils/validationErrors";

export default function ServiceProviderForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    serviceId: "",
    providerId: "",
    baseUrl: "",
    handlePath: "",

    category: "",
    operator: "",
    operatorCode: "",
    paymentMethod: "",
    network: "",
    bankCode: "",
    transactionType: "",

    minAmount: "",
    maxAmount: "",

    mode: "NONE",
    pricingValueType: "NONE",

    value: 0,
    providerCost: 0,

    supportsSlab: false,
    supportPaymentMethod: false,
    isActive: true,

    applyGST: false,
    gstPercent: 0,

    applyTDS: false,
    tdsPercent: 0,

    config: "{}",
  });

  const { data: servicesResponse } = useGetAllServices({
    page: 1,
    limit: 100,
    search: "",
  });

  const { data: providersResponse } = useGetAllProviders({
    page: 1,
    limit: 100,
    search: "",
  });

  const services = servicesResponse?.data?.data || [];
  const providers = providersResponse?.data?.data || [];

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      ...initialData,

      config: JSON.stringify(initialData.config || {}, null, 2),
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,

        minAmount: Number(formData.minAmount || 0),
        maxAmount: Number(formData.maxAmount || 0),

        value: Number(formData.value || 0),
        providerCost: Number(formData.providerCost || 0),

        gstPercent: Number(formData.gstPercent || 0),
        tdsPercent: Number(formData.tdsPercent || 0),

        config: JSON.parse(formData.config || "{}"),
      };

      const validation = serviceProviderValidation.safeParse(payload);

      if (!validation.success) {
        setErrors(getValidationErrors(validation.error.issues));
        return;
      }

      await onSubmit(validation.data);
    } catch {
      setFormError("Invalid JSON Config");
    }
  };

  return (
    <form onSubmit={submitForm} className="space-y-6">
      {formError && (
        <Alert type="error" title="Error" icon={<AlertCircle />}>
          {formError}
        </Alert>
      )}

      <div className="grid grid-cols-2 gap-5">
        <SelectField
          label="Service"
          value={formData.serviceId}
          options={services.map((x) => ({
            label: x.name,
            value: x.id,
          }))}
          onChange={(value) =>
            setFormData((p) => ({
              ...p,
              serviceId: value,
            }))
          }
        />

        <SelectField
          label="Provider"
          value={formData.providerId}
          options={providers.map((x) => ({
            label: x.name,
            value: x.id,
          }))}
          onChange={(value) =>
            setFormData((p) => ({
              ...p,
              providerId: value,
            }))
          }
        />

        <InputField
          label="Base URL"
          name="baseUrl"
          value={formData.baseUrl}
          onChange={handleChange}
        />

        <InputField
          label="Handle Path"
          name="handlePath"
          value={formData.handlePath}
          onChange={handleChange}
        />

        <InputField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <InputField
          label="Operator"
          name="operator"
          value={formData.operator}
          onChange={handleChange}
        />

        <InputField
          label="Operator Code"
          name="operatorCode"
          value={formData.operatorCode}
          onChange={handleChange}
        />

        <InputField
          label="Payment Method"
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
        />

        <InputField
          label="Network"
          name="network"
          value={formData.network}
          onChange={handleChange}
        />

        <InputField
          label="Bank Code"
          name="bankCode"
          value={formData.bankCode}
          onChange={handleChange}
        />

        <InputField
          label="Transaction Type"
          name="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
        />

        <InputField
          label="Min Amount"
          name="minAmount"
          value={formData.minAmount}
          onChange={handleChange}
        />

        <InputField
          label="Max Amount"
          name="maxAmount"
          value={formData.maxAmount}
          onChange={handleChange}
        />

        <InputField
          label="Value"
          name="value"
          value={formData.value}
          onChange={handleChange}
        />

        <InputField
          label="Provider Cost"
          name="providerCost"
          value={formData.providerCost}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Config JSON</label>

        <div className="border rounded-xl overflow-hidden">
          <Editor
            height="400px"
            defaultLanguage="json"
            theme="vs-dark"
            value={formData.config}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                config: value || "{}",
              }))
            }
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 14,
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        <label>
          <input
            type="checkbox"
            name="supportsSlab"
            checked={formData.supportsSlab}
            onChange={handleChange}
          />
          Supports Slab
        </label>

        <label>
          <input
            type="checkbox"
            name="applyGST"
            checked={formData.applyGST}
            onChange={handleChange}
          />
          Apply GST
        </label>

        <label>
          <input
            type="checkbox"
            name="applyTDS"
            checked={formData.applyTDS}
            onChange={handleChange}
          />
          Apply TDS
        </label>
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">
          {initialData ? "Update Service Provider" : "Create Service Provider"}
        </Button>
      </div>
    </form>
  );
}
