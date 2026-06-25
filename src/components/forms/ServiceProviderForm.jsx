"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

import { AlertCircle } from "lucide-react";

import { useGetAllServices } from "@/hooks/useService";
import { useGetAllProviders } from "@/hooks/useProvider";

import { serviceProviderValidation } from "@/validation/serviceProviderValidation";
import { getValidationErrors } from "@/utils/validationErrors";
import Checkbox from "../ui/Checkbox";

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

    supportsSlab: false,
    supportPaymentMethod: false,
    isActive: true,

    applyGST: false,
    gstPercent: 0,

    applyTDS: false,
    tdsPercent: 0,

    config: [{ key: "", value: "" }],
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

    const configArray = Object.entries(initialData.config || {}).map(
      ([key, value]) => ({
        key,
        value: String(value),
      }),
    );

    setFormData({
      ...initialData,
      config: configArray.length > 0 ? configArray : [{ key: "", value: "" }],
    });
  }, [initialData]);

  const addConfigRow = () => {
    setFormData((prev) => ({
      ...prev,
      config: [...prev.config, { key: "", value: "" }],
    }));
  };

  const removeConfigRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      config: prev.config.filter((_, i) => i !== index),
    }));
  };

  const updateConfigRow = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      config: prev.config.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

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

        gstPercent: Number(formData.gstPercent || 0),
        tdsPercent: Number(formData.tdsPercent || 0),

        config: formData.config.reduce((acc, item) => {
          if (item.key?.trim()) {
            acc[item.key] = item.value;
          }

          return acc;
        }, {}),
      };

      const validation = serviceProviderValidation.safeParse(payload);
      if (!validation.success) {
        setErrors(getValidationErrors(validation.error.issues));
        return;
      }

      await onSubmit(validation.data);
    } catch (err) {
      console.error(err);

      setFormError(err?.message || "Something went wrong");
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
          error={errors.serviceId}
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
          error={errors.providerId}
        />

        <SelectField
          label="Mode"
          value={formData.mode}
          options={[
            {
              label: "None",
              value: "NONE",
            },
            {
              label: "Commission",
              value: "COMMISSION",
            },
            {
              label: "Surcharge",
              value: "SURCHARGE",
            },
          ]}
          onChange={(value) =>
            setFormData((p) => ({
              ...p,
              mode: value,
            }))
          }
          error={errors.mode}
        />

        <InputField
          label="Base URL"
          name="baseUrl"
          value={formData.baseUrl}
          onChange={handleChange}
          error={errors.baseUrl}
        />

        <InputField
          label="Handle Path"
          name="handlePath"
          value={formData.handlePath}
          onChange={handleChange}
        />

        <Checkbox
          name="isActive"
          label="Active"
          checked={formData.isActive}
          onChange={handleChange}
        />

        <Checkbox
          name="supportsSlab"
          label="Supports Slab"
          checked={formData.supportsSlab}
          onChange={handleChange}
        />

        <Checkbox
          name="supportPaymentMethod"
          label="Support Payment Method"
          checked={formData.supportPaymentMethod}
          onChange={handleChange}
        />

        {formData.mode === "COMMISSION" && (
          <>
            <Checkbox
              name="applyTDS"
              label="Apply TDS"
              checked={formData.applyTDS}
              onChange={handleChange}
            />

            {formData.applyTDS && (
              <InputField
                label="TDS Percent"
                name="tdsPercent"
                value={formData.tdsPercent}
                onChange={handleChange}
              />
            )}
          </>
        )}

        {formData.mode === "SURCHARGE" && (
          <>
            <Checkbox
              name="applyGST"
              label="Apply GST"
              checked={formData.applyGST}
              onChange={handleChange}
            />

            {formData.applyGST && (
              <InputField
                label="GST Percent"
                name="gstPercent"
                value={formData.gstPercent}
                onChange={handleChange}
              />
            )}
          </>
        )}

        {formData.supportPaymentMethod && (
          <>
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
          </>
        )}

        <InputField
          label="Transaction Type"
          name="transactionType"
          value={formData.transactionType}
          onChange={handleChange}
        />

        {formData.supportsSlab && (
          <>
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
          </>
        )}
      </div>

      <div className="border rounded-xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Configuration</h3>

          <Button type="button" onClick={addConfigRow}>
            Add Config
          </Button>
        </div>

        {formData.config.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-3">
            <div className="col-span-5">
              <InputField
                label="Key"
                value={item.key}
                onChange={(e) => updateConfigRow(index, "key", e.target.value)}
              />
            </div>

            <div className="col-span-5">
              <InputField
                label="Value"
                value={item.value}
                onChange={(e) =>
                  updateConfigRow(index, "value", e.target.value)
                }
              />
            </div>

            <div className="col-span-2 flex items-end">
              <Button
                type="button"
                variant="danger"
                onClick={() => removeConfigRow(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
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
