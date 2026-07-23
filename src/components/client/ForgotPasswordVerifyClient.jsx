"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import ConfirmDialog from "@/components/ConfirmDialog";

import { useForgotPasswordVerify } from "@/hooks/useAuth";
import ForgotPasswordVerifyModal from "@/components/modals/ForgotPasswordVerifyModal";

export default function ForgotPasswordVerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const mutation = useForgotPasswordVerify();

  const [dialog, setDialog] = useState({
    open: false,
    message: "",
    success: false,
  });

  const handleSubmit = async (data) => {
    try {
      await mutation.mutateAsync({
        ...data,
        token,
      });

      setDialog({
        open: true,
        success: true,
        message: "Password changed successfully.",
      });
    } catch (err) {
      setDialog({
        open: true,
        success: false,
        message: err?.response?.data?.message || "Invalid or expired token",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-5">
      <ForgotPasswordVerifyModal
        loading={mutation.isPending}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={dialog.open}
        title={dialog.success ? "Success" : "Error"}
        description={dialog.message}
        variant={dialog.success ? "success" : "danger"}
        onClose={() => {
          setDialog({
            open: false,
            message: "",
            success: false,
          });

          if (dialog.success) {
            router.replace("/login");
          }
        }}
      />
    </div>
  );
}
