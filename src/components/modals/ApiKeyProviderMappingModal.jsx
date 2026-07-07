"use client";

import { useEffect } from "react";

import ApiKeyProviderMappingForm from "../forms/ApiKeyProviderMappingForm";

export default function ApiKeyProviderMappingModal({
  open,
  onClose,
  onSubmit,
  initialData,
  apiKeys = [],
  services = [],
  providers = [],
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

      <div className="relative w-full max-w-2xl rounded-3xl border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">
              {initialData
                ? "Edit API Key Provider Mapping"
                : "Create API Key Provider Mapping"}
            </h2>

            <p className="text-sm text-muted-foreground">
              Manage API Key Provider Mapping
            </p>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-xl hover:bg-muted"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          <ApiKeyProviderMappingForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
            apiKeys={apiKeys}
            services={services}
            providers={providers}
          />
        </div>
      </div>
    </div>
  );
}