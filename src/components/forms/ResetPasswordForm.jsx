"use client";

import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordForm({
  passwordForm,
  showPassword,
  handleInputChange,
  toggleVisibility,
  onSubmit,
  loading,
  onCancel,
}) {
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
    <form onSubmit={onSubmit} className="space-y-5">

      {fields.map((item) => (
        <div key={item.name}>
          <label className="block text-sm font-semibold mb-2">
            {item.label}
          </label>

          <div className="relative">
            <input
              type={showPassword[item.key] ? "text" : "password"}
              name={item.name}
              value={passwordForm[item.name]}
              onChange={handleInputChange}
              required
              placeholder={item.placeholder}
              className="w-full rounded-xl border bg-slate-50 px-4 py-3 pr-12"
            />

            <button
              type="button"
              onClick={() => toggleVisibility(item.key)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword[item.key]
                ? <EyeOff size={18} />
                : <Eye size={18} />}
            </button>
          </div>
        </div>
      ))}

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border rounded-xl py-3"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-emerald-600 text-white rounded-xl py-3"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}