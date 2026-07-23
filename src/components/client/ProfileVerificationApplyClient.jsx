"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useCreateKyc } from "@/hooks/useProfileVerification";

import ProfileVerificationModal from "@/components/modals/ProfileVerificationModal";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function ProfileVerificationApplyClient() {
  const router = useRouter();

  const createMutation = useCreateKyc();

  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    description: "",
    variant: "success",
    redirect: false,
  });

  // CREATE KYC
  const handleSubmit = async (data) => {
    try {
      const res = await createMutation.mutateAsync(data);
console.log(res);

      setDialog({
        open: true,
        title: "KYC Submitted",
        description:
          res?.message || "Your KYC has been submitted successfully.",
        variant: "success",
        redirect: true,
      });
    } catch (err) {
      console.log(err);

      setDialog({
        open: true,
        title: "Submission Failed",
        description:
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong.",
        variant: "danger",
        redirect: false,
      });
    }
  };

  const handleClose = () => {
    if (dialog.redirect) {
      router.push("/dashboard/kyc");
      return;
    }

    setDialog((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <ProfileVerificationModal
          onSubmit={handleSubmit}
          loading={createMutation.isPending}
        />
      </div>

      <ConfirmDialog
        open={dialog.open}
        onClose={handleClose}
        onConfirm={handleClose}
        title={dialog.title}
        description={dialog.description}
        variant={dialog.variant}
        cancelText="Close"
      />
    </div>
  );
}
