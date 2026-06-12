"use client";

import React from "react";
import { Eye, EyeOff, X, Key } from "lucide-react";

// --- Import your custom UI components ---
import Input from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

export default function ResetPasswordModal({
  open,
  onClose,
  passwordForm,
  showPassword,
  handleInputChange,
  toggleVisibility,
  handleSubmit, 
  loading,
}) {
  // If the modal is not open, don't render anything
  if (!open) return null;

  const fields = [
    {
      label: "Current Password",
      name: "oldPassword",
      key: "old",
      placeholder: "Enter current password",
    },
    {
      label: "New Password",
      name: "newPassword",
      key: "new",
      placeholder: "Enter new password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      key: "confirm",
      placeholder: "Confirm password",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* --- Modal Header --- */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100  rounded-xl flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Reset Password</h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- Modal Form Body --- */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {fields.map((item) => (
            <div key={item.name} className="relative">
              {/* Custom Input Component */}
              <Input
                type={showPassword[item.key] ? "text" : "password"}
                name={item.name}
                label={item.label}
                placeholder={item.placeholder}
                value={passwordForm[item.name]}
                onChange={handleInputChange}
                // error={errors[item.name]} // <-- Uncomment if you add validation errors later
              />

              {/* Visibility Toggle Button */}
              {/* Note: top-[34px] accounts for standard label height. Adjust slightly if your Input label has different padding */}
              <button
                type="button"
                onClick={() => toggleVisibility(item.key)}
                className="absolute right-3 top-[34px] p-1 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword[item.key] ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          ))}

          {/* --- Action Buttons using Custom UI Component --- */}
          <div className="flex gap-3 pt-4">
            <div className="flex-1">
              <Button
                type="button"
                variant="outline" // Use "text" or "outline" depending on what your Button.jsx supports for secondary actions
                onClick={onClose}
                fullWidth
              >
                Cancel
              </Button>
            </div>

            <div className="flex-1">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                fullWidth
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  );
}