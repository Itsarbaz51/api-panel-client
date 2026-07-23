"use client";

import ProfileVerificationForm from "../forms/ProfileVerificationForm";

export default function ProfileVerificationModal({ onSubmit, loading }) {
  return (
    <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
      {/* Header */}
      <div className="border-b bg-slate-50 px-8 py-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Profile Verification
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Complete your KYC to verify your profile. Please provide accurate
          personal, business, address, and document information.
        </p>
      </div>

      {/* Body */}
      <div className="p-8">
        <ProfileVerificationForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
}
