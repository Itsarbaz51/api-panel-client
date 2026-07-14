"use client";

import { Copy, Globe, AlertCircle, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Alert from "@/components/ui/Alert";

import { apiKeyValidation } from "@/validation/apiKeyValidation";
import { getValidationErrors } from "@/utils/validationErrors";

export default function ApiKeyForm({
  data = {},
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

  const copy = async (text) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
  };

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
      {formError && (
        <Alert type="error" title="Validation Error" icon={<AlertCircle />}>
          {formError}
        </Alert>
      )}

      {/* API KEY */}
      <div>
        <label className="text-xs font-semibold uppercase">API Key</label>
        <div className="mt-2 flex items-center justify-between rounded-xl border p-3">
          <span className="break-all text-sm">{data?.apiKey || "-"}</span>

          <Copy
            size={18}
            className="cursor-pointer"
            onClick={() => copy(data?.apiKey)}
          />
        </div>
      </div>

      {/* SECRET */}
      <div>
        <label className="text-xs font-semibold uppercase">Secret Key</label>

        <div className="mt-2 flex items-center justify-between rounded-xl border p-3">
          <span className="break-all text-sm">{data?.secretKey || "-"}</span>

          <Copy
            size={18}
            className="cursor-pointer"
            onClick={() => copy(data?.secretKey)}
          />
        </div>
      </div>

      {isSuperAdmin && (
        <>
          <InputField
            label="Name"
            value={data?.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            error={errors.name}
          />

          <InputField
            type="number"
            label="Max IP Limit"
            value={data.maxIpLimit ?? 5}
            onChange={(e) => onChange("maxIpLimit", Number(e.target.value))}
            error={errors.maxIpLimit}
          />

          <InputField
            label="Remarks"
            value={data.remarks || ""}
            onChange={(e) => onChange("remarks", e.target.value)}
            error={errors.remarks}
          />
        </>
      )}

      {/* IPS */}

      <div className="rounded-2xl border p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <Globe size={18} />
            Allowed IPs
          </div>

          <button
            type="button"
            onClick={() => {
              onAddIp();
            }}
          >
            Add IP
          </button>
        </div>

        {(data.allowedIps ?? []).length === 0 ? (
          <div className="rounded-xl border border-dashed p-5 text-center text-sm text-gray-500">
            No IP Added
          </div>
        ) : (
          <div className="space-y-3">
            {(data.allowedIps ?? []).map((ip, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={ip}
                  placeholder="127.0.0.1"
                  onChange={(e) =>
                    onChange("allowedIps", e.target.value, index)
                  }
                  className="flex-1 rounded-xl border px-4 py-3 outline-none"
                />

                <Button
                  type="button"
                  variant="danger"
                  size="icon"
                  onClick={() => onRemoveIp(index)}
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}

            {errors.allowedIps && (
              <p className="text-sm text-red-500">{errors.allowedIps}</p>
            )}
          </div>
        )}
      </div>

      <Button loading={loading} onClick={handleSubmit} className="w-full">
        {isSuperAdmin ? "Update API Config" : "Update IPs"}
      </Button>
    </div>
  );
}
