"use client";

import ForgotVerifyPasswordForm from "@/components/forms/ForgotVerifyPasswordForm";

export default function ForgotPasswordVerifyModal({ loading, onSubmit }) {
  return (
    <div className="w-full max-w-md rounded-3xl border bg-card p-10 shadow-xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Forgot Password</h2>

        <p className="mt-2 text-muted-foreground">Create your new password.</p>
      </div>

      <ForgotVerifyPasswordForm loading={loading} onSubmit={onSubmit} />
    </div>
  );
}
