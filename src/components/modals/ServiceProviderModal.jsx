"use client";

import { useEffect } from "react";

import ServiceProviderForm from "../forms/ServiceProviderForm";

export default function ServiceProviderModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-5xl rounded-3xl border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">
              {initialData
                ? "Edit Service Provider"
                : "Create Service Provider"}
            </h2>

            <p className="text-sm text-muted-foreground">
              Manage service provider mapping
            </p>
          </div>

          <button onClick={onClose} className="h-10 w-10 rounded-xl">
            ✕
          </button>
        </div>

        <div className="max-h-[85vh] overflow-y-auto p-6">
          <ServiceProviderForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
