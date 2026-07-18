"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/InputField";
import TextareaField from "../ui/TextareaField";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const METHOD_COLORS = {
  GET: "bg-emerald-50 text-emerald-700 border-emerald-200",
  POST: "bg-blue-50 text-blue-700 border-blue-200",
  PUT: "bg-amber-50 text-amber-700 border-amber-200",
  PATCH: "bg-violet-50 text-violet-700 border-violet-200",
  DELETE: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function DocsConfigurationForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",

    module: initialData?.module || "",

    method: initialData?.method || "POST",

    endpoint: initialData?.endpoint || "",

    description: initialData?.description || "",

    // AUTH

    authType: initialData?.authType || "API_KEY",

    headers: JSON.stringify(initialData?.headers || [], null, 2),

    // REQUEST

    queryParams: JSON.stringify(initialData?.queryParams || [], null, 2),

    pathParams: JSON.stringify(initialData?.pathParams || [], null, 2),

    requestFields: JSON.stringify(initialData?.requestFields || [], null, 2),

    sampleRequest: JSON.stringify(initialData?.sampleRequest || {}, null, 2),

    // RESPONSE

    sampleResponse: JSON.stringify(initialData?.sampleResponse || {}, null, 2),

    responseFields: JSON.stringify(initialData?.responseFields || [], null, 2),

    errorResponses: JSON.stringify(initialData?.errorResponses || [], null, 2),

    // META

    tags: JSON.stringify(initialData?.tags || [], null, 2),

    version: initialData?.version || "v1",

    baseUrl: initialData?.baseUrl || "",

    contentType: initialData?.contentType || "application/json",

    sortOrder: initialData?.sortOrder || 1,

    isActive: initialData?.isActive ?? true,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,

        headers: JSON.parse(formData.headers),

        queryParams: JSON.parse(formData.queryParams),

        pathParams: JSON.parse(formData.pathParams),

        requestFields: JSON.parse(formData.requestFields),

        sampleRequest: JSON.parse(formData.sampleRequest),

        sampleResponse: JSON.parse(formData.sampleResponse),

        responseFields: JSON.parse(formData.responseFields),

        errorResponses: JSON.parse(formData.errorResponses),

        tags: JSON.parse(formData.tags),

        sortOrder: Number(formData.sortOrder),
      };

      onSubmit(payload);
    } catch (error) {
      alert("Invalid JSON format");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ================= ENDPOINT ================= */}

      <div
        className="
bg-white
border
rounded-xl
p-6
space-y-6
"
      >
        <h3 className="font-semibold text-slate-900">Endpoint Information</h3>

        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="API Name"
            required
            value={formData.name}
            placeholder="PAN Verify"
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <Input
            label="Module"
            required
            value={formData.module}
            placeholder="VERIFICATION"
            onChange={(e) => handleChange("module", e.target.value)}
          />
        </div>

        <label
          className="
block text-xs font-semibold
"
        >
          HTTP METHOD
        </label>

        <div className="flex gap-2 flex-wrap">
          {HTTP_METHODS.map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => handleChange("method", method)}
              className={`
px-4 py-2 rounded-lg border text-sm font-bold
${
  formData.method === method
    ? METHOD_COLORS[method]
    : "bg-slate-50 text-slate-500"
}
`}
            >
              {method}
            </button>
          ))}
        </div>

        <Input
          label="Endpoint"
          required
          value={formData.endpoint}
          placeholder="/api/v1/pan"
          onChange={(e) => handleChange("endpoint", e.target.value)}
        />

        <TextareaField
          label="Description"
          rows={3}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* ================= AUTH ================= */}

      <div
        className="
bg-white
border
rounded-xl
p-6
space-y-5
"
      >
        <h3 className="font-semibold text-slate-900">Authentication</h3>

        <Input
          label="Auth Type"
          value={formData.authType}
          placeholder="API_KEY"
          onChange={(e) => handleChange("authType", e.target.value)}
        />

        <TextareaField
          label="Headers JSON"
          rows={8}
          value={formData.headers}
          onChange={(e) => handleChange("headers", e.target.value)}
        />
      </div>
      {/* ================= REQUEST ================= */}

      <div
        className="
bg-white
border
rounded-xl
p-6
space-y-6
"
      >
        <h3 className="font-semibold text-slate-900">Request Configuration</h3>

        <div className="grid md:grid-cols-2 gap-5">
          <TextareaField
            label="Query Parameters JSON"
            rows={8}
            value={formData.queryParams}
            onChange={(e) => handleChange("queryParams", e.target.value)}
          />

          <TextareaField
            label="Path Parameters JSON"
            rows={8}
            value={formData.pathParams}
            onChange={(e) => handleChange("pathParams", e.target.value)}
          />
        </div>

        <TextareaField
          label="Request Fields Schema JSON"
          rows={12}
          value={formData.requestFields}
          onChange={(e) => handleChange("requestFields", e.target.value)}
        />

        <TextareaField
          label="Sample Request JSON"
          rows={12}
          value={formData.sampleRequest}
          onChange={(e) => handleChange("sampleRequest", e.target.value)}
        />
      </div>

      {/* ================= RESPONSE ================= */}

      <div
        className="
bg-white
border
rounded-xl
p-6
space-y-6
"
      >
        <h3 className="font-semibold text-slate-900">Response Configuration</h3>

        <TextareaField
          label="Response Fields Schema JSON"
          rows={10}
          value={formData.responseFields}
          onChange={(e) => handleChange("responseFields", e.target.value)}
        />

        <TextareaField
          label="Sample Response JSON"
          rows={12}
          value={formData.sampleResponse}
          onChange={(e) => handleChange("sampleResponse", e.target.value)}
        />

        <TextareaField
          label="Error Responses JSON"
          rows={8}
          value={formData.errorResponses}
          onChange={(e) => handleChange("errorResponses", e.target.value)}
        />
      </div>
      {/* ================= METADATA ================= */}

      <div
        className="
bg-white
border
rounded-xl
p-6
space-y-6
"
      >
        <h3 className="font-semibold text-slate-900">Metadata & Settings</h3>

        <div className="grid md:grid-cols-2 gap-5">
          <Input
            label="Version"
            value={formData.version}
            placeholder="v1"
            onChange={(e) => handleChange("version", e.target.value)}
          />

          <Input
            label="Base URL"
            value={formData.baseUrl}
            placeholder="https://api.example.com"
            onChange={(e) => handleChange("baseUrl", e.target.value)}
          />

          <Input
            label="Content Type"
            value={formData.contentType}
            placeholder="application/json"
            onChange={(e) => handleChange("contentType", e.target.value)}
          />

          <Input
            label="Sort Order"
            type="number"
            value={formData.sortOrder}
            onChange={(e) => handleChange("sortOrder", e.target.value)}
          />
        </div>

        <TextareaField
          label="Tags JSON"
          rows={5}
          value={formData.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
        />

        <div
          className="
flex
items-center
gap-3
bg-slate-50
border
rounded-lg
p-4
"
        >
          <input
            type="checkbox"
            id="active"
            checked={formData.isActive}
            onChange={(e) => handleChange("isActive", e.target.checked)}
            className="
w-4 h-4
accent-indigo-600
"
          />

          <label
            htmlFor="active"
            className="
text-sm
font-medium
cursor-pointer
"
          >
            Publish API Documentation
          </label>
        </div>
      </div>

      {/* ================= ACTION BUTTONS ================= */}

      <div
        className="
flex
justify-end
gap-3
border-t
pt-5
"
      >
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" variant="dark">
          Save API Documentation
        </Button>
      </div>
    </form>
  );
}
