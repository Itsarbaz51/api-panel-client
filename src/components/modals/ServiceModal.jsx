"use client";

import ServiceForm from "../forms/ServiceForm";

export default function ServiceModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-xl rounded-3xl bg-card border border-border p-6 shadow-2xl">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-xl font-semibold">
              {initialData
                ? "Edit Service"
                : "Create Service"}
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Manage system services
            </p>
          </div>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <ServiceForm
          initialData={initialData}
          onSubmit={onSubmit}
          onCancel={onClose}
        />

      </div>
    </div>
  );
}