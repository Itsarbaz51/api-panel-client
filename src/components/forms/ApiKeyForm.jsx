"use client";

import { Copy, Globe, AlertCircle } from "lucide-react";
import { useState } from "react";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Alert from "@/components/ui/Alert";

import { apiKeyValidation } from "@/validation/apiKeyValidation";
import { getValidationErrors } from "@/utils/validationErrors";

export default function ApiKeyForm({
  data,
  role,
  onChange,
  onAddIp,
  onRemoveIp,
  onSubmit,
  loading,
}) {
  const isSuperAdmin = role === "SUPER_ADMIN";

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  const copy = (text) => navigator.clipboard.writeText(text || "");

  const handleSubmit = () => {
    setErrors({});
    setFormError("");

    const result = apiKeyValidation.safeParse(data);

    if (!result.success) {
      setErrors(getValidationErrors(result.error.issues));
      setFormError("Please fix validation errors");

      return;
    }

    onSubmit();
  };

  return (
    <div className="space-y-6">
      {/* ERROR */}
      {formError && (
        <Alert type="error" title="Validation Error" icon={<AlertCircle />}>
          {formError}
          {errors}
        </Alert>
      )}

      {/* API KEY */}
      <div>
        <label className="text-xs font-semibold uppercase">API Key</label>

        <div className="border rounded-xl p-3 mt-2 flex justify-between items-center">
          <span className="break-all text-sm">{data?.apiKey || "-"}</span>

          <Copy
            size={16}
            className="cursor-pointer shrink-0"
            onClick={() => copy(data?.apiKey)}
          />
        </div>
      </div>

      {/* SECRET */}
      <div>
        <label className="text-xs font-semibold uppercase">Secret Key</label>

        <div className="border rounded-xl p-3 mt-2 flex justify-between items-center">
          <span className="break-all text-sm">{data?.secretKey || "-"}</span>

          <Copy
            size={16}
            className="cursor-pointer shrink-0"
            onClick={() => copy(data?.secretKey)}
          />
        </div>
      </div>

      {/* SUPER ADMIN */}
      {isSuperAdmin && (
        <>
          <InputField
            label="NAME"
            value={data?.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            error={errors.name}
          />

          <InputField
            type="number"
            label="MAX IP LIMIT"
            value={data?.maxIpLimit || 5}
            onChange={(e) => onChange("maxIpLimit", Number(e.target.value))}
            error={errors.maxIpLimit}
          />

          <InputField
            label="REMARKS"
            value={data?.remarks || ""}
            onChange={(e) => onChange("remarks", e.target.value)}
            error={errors.remarks}
          />
        </>
      )}

      {/* IPS */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs font-semibold uppercase flex gap-2">
            <Globe size={14} />
            Allowed IPs
          </label>

          <button
            type="button"
            onClick={onAddIp}
            className=" text-sm"
          >
            + Add
          </button>
        </div>

        <div className="space-y-2">
          {data?.allowedIps?.length ? (
            data.allowedIps.map((ip, i) => (
              <div key={i} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    value={ip}
                    onChange={(e) => onChange("allowedIps", e.target.value, i)}
                    className={`flex-1 border rounded-xl p-3 text-sm ${
                      errors.allowedIps ? "border-red-500" : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => onRemoveIp(i)}
                    className="px-3 border rounded-xl text-red-500"
                  >
                    Remove
                  </button>
                </div>

                {errors.allowedIps && (
                  <p className="text-red-500 text-xs">Invalid IP address</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No IP added</p>
          )}
        </div>
      </div>

      {/* SUBMIT */}
      <Button onClick={handleSubmit} className="w-full">
        {isSuperAdmin ? "Update API Config" : "Update IPs"}
      </Button>
    </div>
  );
}
