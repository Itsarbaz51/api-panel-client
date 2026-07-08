"use client";

import { useDispatch } from "react-redux";
import ProfileVerificationForm from "@/components/forms/ProfileVerificationForm";
import { useCreateKyc } from "@/hooks/useProfileVerification";
import { addKyc } from "@/store/profileVerificationSlice";

export default function ProfileVerificationApplyClient() {
  const dispatch = useDispatch();
  const createKyc = useCreateKyc();

  const handleSubmit = async (payload) => {
    try {
      const res = await createKyc.mutateAsync(payload);

      dispatch(addKyc(res.data ?? res));

      return {
        success: true,
        message: "Profile Verification Submitted Successfully",
      };
    } catch (err) {
      console.error(err);

      return {
        success: false,
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Profile Verification Failed",
      };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto">
        <ProfileVerificationForm
          onSubmit={handleSubmit}
          loading={createKyc.isPending}
        />
      </div>
    </div>
  );
}
