"use client";

import DocsConfigurationForm from "../forms/DocsConfigurationForm";

export default function DocsConfigurationModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[85vh] flex flex-col rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-300 scale-100">
        
        {/* Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
              {initialData ? "Edit API Reference" : "Create API Reference"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure endpoints, request schemas, and mock data for documentation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors duration-150 focus:outline-none"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar">
          <DocsConfigurationForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}