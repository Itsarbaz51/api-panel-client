"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useCreateKyc, useGetByIdKyc } from "@/hooks/useProfileVerification";

import ProfileVerificationModal from "@/components/modals/ProfileVerificationModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useSelector } from "react-redux";
import ProfileVerificationStatus from "../ProfileVerificationStatus";

export default function ProfileVerificationApplyClient() {
  const router = useRouter();

  const currentUser = useSelector((u) => u.auth.user);

  const createMutation = useCreateKyc();
  const getByIdMutation = useGetByIdKyc();

  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    description: "",
    variant: "success",
    redirect: false,
  });

  const kyc = currentUser?.kyc;
  useEffect(() => {
    const fetchKyc = async () => {
      if (kyc?.status !== "REJECTED" || !kyc?.id) return;

      try {
        await getByIdMutation.mutateAsync(kyc.id);
      } catch (err) {
        console.error(err);
      }
    };

    fetchKyc();
  }, [kyc?.id, kyc?.status]);

  // CREATE KYC
  const handleSubmit = async (data) => {
    try {
      const res = await createMutation.mutateAsync(data);

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
        {!kyc && (
          <ProfileVerificationModal
            onSubmit={handleSubmit}
            loading={createMutation.isPending}
          />
        )}

        {kyc?.status === "PENDING" && (
          <ProfileVerificationStatus status="PENDING" />
        )}

        {kyc?.status === "REJECTED" && (
          <>
            <ProfileVerificationStatus
              status="REJECTED"
              rejectionReason={kyc?.rejectionReason}
            />

            <div className="mt-6">
              <ProfileVerificationModal
                initialValues={getByIdMutation?.data?.data}
                onSubmit={handleSubmit}
                loading={createMutation.isPending}
              />
            </div>
          </>
        )}
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
