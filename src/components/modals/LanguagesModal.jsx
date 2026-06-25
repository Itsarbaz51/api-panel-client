"use client";

import LanguagesForm from "../forms/LanguagesForm";

export default function LanguagesModal({
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
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {initialData
              ? "Edit Language"
              : "Create Language"}
          </h2>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <LanguagesForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}