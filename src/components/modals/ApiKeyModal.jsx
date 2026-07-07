"use client";

import ApiKeyForm from "@/components/forms/ApiKeyForm";

export default function ApiKeyModal({
  open,
  onClose,
  data,
  role,
  onChange,
  onRemoveIp,
  onAddIp,
  onSubmit,
  loading,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="w-full max-w-2xl h-full bg-white shadow-2xl overflow-y-auto">
        {/* HEADER */}
        <div className="px-8 py-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">API Credentials</h2>

            <p className="text-sm text-slate-500 mt-1">
              Manage API key configuration
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <div className="p-8">
          <ApiKeyForm
            data={data}
            role={role}
            loading={loading}
            onChange={onChange}
            onAddIp={onAddIp}
            onRemoveIp={onRemoveIp}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
