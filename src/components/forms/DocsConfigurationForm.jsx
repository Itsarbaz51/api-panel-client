"use client";

import { useState } from "react";
import Button from "../ui/Button";

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const METHOD_COLORS = {
  GET: "bg-emerald-50 text-emerald-700 border-emerald-200 check:bg-emerald-600",
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
    requestFields: JSON.stringify(initialData?.requestFields || [], null, 2),
    sampleRequest: JSON.stringify(initialData?.sampleRequest || {}, null, 2),
    sampleResponse: JSON.stringify(initialData?.sampleResponse || {}, null, 2),
    sortOrder: initialData?.sortOrder || 1,
    isActive: initialData?.isActive !== undefined ? initialData.isActive : true,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        requestFields: JSON.parse(formData.requestFields),
        sampleRequest: JSON.parse(formData.sampleRequest),
        sampleResponse: JSON.parse(formData.sampleResponse),
        sortOrder: Number(formData.sortOrder),
      };
      onSubmit(payload);
    } catch (err) {
      alert("Invalid JSON format. Please verify your code blocks.");
    }
  };

  const labelStyles = "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2";
  const inputStyles = "w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-150 bg-slate-50/30";
  
  
  const monoStyles = "w-full border border-slate-700 rounded-xl p-4 font-mono text-xs bg-slate-900 text-green-400 caret-white focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-150";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Section 1: Route Definition */}
      <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm space-y-6">
        <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
          <span className="w-1.5 h-4 bg-indigo-500 rounded-full" />
          Endpoint Information
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelStyles}>API Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={inputStyles}
              placeholder="e.g., PAN Verify"
              required
            />
          </div>

          <div>
            <label className={labelStyles}>Module / Category</label>
            <input
              type="text"
              value={formData.module}
              onChange={(e) => handleChange("module", e.target.value)}
              className={inputStyles}
              placeholder="e.g., VERIFICATION"
              required
            />
          </div>
        </div>

        {/* Interactive Method Selector & Endpoint Path */}
        <div className="grid md:grid-cols-3 gap-5 items-start">
          <div className="md:col-span-1">
            <label className={labelStyles}>HTTP Method</label>
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/60">
              {HTTP_METHODS.map((m) => {
                const isSelected = formData.method === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleChange("method", m)}
                    className={`flex-1 text-center py-1.5 px-2 text-xs font-bold rounded-lg transition-all duration-150 focus:outline-none ${
                      isSelected
                        ? `${METHOD_COLORS[m]} shadow-sm border border-current font-extrabold scale-[1.02]`
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={labelStyles}>Endpoint Path</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={formData.endpoint}
                onChange={(e) => handleChange("endpoint", e.target.value)}
                className={inputStyles}
                placeholder="/api/v1/verification/pan"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className={labelStyles}>Description</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={`${inputStyles} resize-none`}
            placeholder="Provide a clean description of what this API accomplishes..."
          />
        </div>
      </div>

      {/* Section 2: JSON Payload Structures */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Request Fields */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm flex flex-col">
          <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
            <span className="w-1.5 h-4 bg-violet-500 rounded-full" />
            Request Field Parameter Schema (JSON)
          </h3>
          <textarea
            rows={6}
            value={formData.requestFields}
            onChange={(e) => handleChange("requestFields", e.target.value)}
            className={monoStyles}
          />
        </div>

        {/* Configurations/Settings */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100 mb-5">
              <span className="w-1.5 h-4 bg-amber-500 rounded-full" />
              Metadata & Settings
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className={labelStyles}>Sort Index Order</label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => handleChange("sortOrder", e.target.value)}
                  className={inputStyles}
                />
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100/50 transition-colors">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => handleChange("isActive", e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 focus:ring-offset-0"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
                  Publish to Live Docs <span className="text-xs font-normal text-slate-400 ml-1">(Visible to users)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Mock Payloads */}
      <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm space-y-6">
        <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
          <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
          Payload Sandboxing & Examples
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelStyles}>Sample Body Request</label>
            <textarea
              rows={8}
              value={formData.sampleRequest}
              onChange={(e) => handleChange("sampleRequest", e.target.value)}
              className={monoStyles}
            />
          </div>

          <div>
            <label className={labelStyles}>Sample System Response</label>
            <textarea
              rows={8}
              value={formData.sampleResponse}
              onChange={(e) => handleChange("sampleResponse", e.target.value)}
              className={monoStyles}
            />
          </div>
        </div>
      </div>

      {/* Action Tray */}
      <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-100">
        <Button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 focus:outline-none transition-colors"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-slate-900/10 transition-all"
        >
          Save Route Structure
        </Button>
      </div>
    </form>
  );
}