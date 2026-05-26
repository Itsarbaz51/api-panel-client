"use client";

import React, { useEffect } from "react";
import UserForm from "../forms/UserForm";

export default function UserModal({
  open,
  onClose,
  onSubmit,
  initialData,
  packages,
  packageLoading,
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
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-xl font-semibold">
              {initialData ? "Edit User" : "Create User"}
            </h2>

            <p className="text-sm text-muted-foreground">
              Manage user account details
            </p>
          </div>

          <button onClick={onClose} className="h-10 w-10 rounded-xl">
            ✕
          </button>
        </div>

        <div className="p-6  overflow-y-auto max-h-[80vh]">
          <UserForm
            initialData={initialData}
            onSubmit={onSubmit}
            onCancel={onClose}
            packages={packages}
            packageLoading={packageLoading}
          />
        </div>
      </div>
    </div>
  );
}
