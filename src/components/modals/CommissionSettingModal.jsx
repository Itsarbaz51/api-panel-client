"use client";

import { useEffect } from "react";
import CommissionSettingForm from "../forms/CommissionSettingForm";

export default function CommissionSettingModal({
  open,
  onClose,
  onSubmit,
  initialData,
  users,
  packages,
  providers,
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
        <div className="border-b px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {initialData ? "Edit Commission" : "Create Commission"}
            </h2>

            <p className="text-sm text-slate-500">Manage commission settings</p>
          </div>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="p-6">
          <CommissionSettingForm
            initialData={initialData}
            users={users}
            packages={packages}
            providers={providers}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
