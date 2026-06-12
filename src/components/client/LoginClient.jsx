"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import LoginModal from "@/components/modals/LoginModal";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal";
import ConfirmDialog from "@/components/ConfirmDialog";

import { setUser } from "@/store/authSlice";

import { useLogin, useForgotPassword } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginClient() {
  const dispatch = useDispatch();
  const router = useRouter();

  const queryClient = useQueryClient();
  const [forgotOpen, setForgotOpen] = useState(false);

  const [errorDialog, setErrorDialog] = useState({
    open: false,
    message: "",
  });

  const loginMutation = useLogin();
  const forgotMutation = useForgotPassword();

  // LOGIN
  const handleLogin = async (data) => {
    try {
      await loginMutation.mutateAsync(data);

      const currentUser = await queryClient.ensureQueryData({
        queryKey: ["current-user"],
      });

      dispatch(setUser(currentUser?.data));

      router.replace("/dashboard");
    } catch (err) {
      setErrorDialog({
        open: true,
        message: err?.response?.data?.message || err?.message || "Login failed",
      });
    }
  };

  // FORGOT PASSWORD
  const handleForgotPassword = async (data) => {
    try {
      const res = await forgotMutation.mutateAsync(data);

      setErrorDialog({
        open: true,

        message: res?.message || "Reset link sent",
      });

      setForgotOpen(false);
    } catch (err) {
      setErrorDialog({
        open: true,

        message:
          err?.response?.data?.message ||
          err?.message ||
          "Forgot password failed",
      });
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-[#76c8b1]
      flex
      items-center
      justify-center
      p-4
    "
    >
      <LoginModal
        handleLogin={handleLogin}
        loading={loginMutation.isPending}
        onForgotPassword={() => setForgotOpen(true)}
      />

      <ForgotPasswordModal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
        onSubmit={handleForgotPassword}
        loading={forgotMutation.isPending}
      />

      <ConfirmDialog
        open={errorDialog.open}
        onClose={() =>
          setErrorDialog({
            open: false,
            message: "",
          })
        }
        title="Notification"
        variant="danger"
        description={errorDialog.message}
        cancelText="Close"
      />
    </div>
  );
}
