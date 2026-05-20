"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import LoginModal from "../modals/LoginModal";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal";
import ConfirmDialog from "@/components/ConfirmDialog";

import { setUser } from "@/store/authSlice";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginClient() {
  const [forgotOpen, setForgotOpen] = useState(false);

  const [errorDialog, setErrorDialog] = useState({
    open: false,
    message: "",
  });

  const dispatch = useDispatch();
  const loginMutation = useLogin();
  const router = useRouter();

  const handleLogin = async (data) => {
    try {
      const res = await loginMutation.mutateAsync(data);
      console.log(res);

      dispatch(setUser(res.data));
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      setErrorDialog({
        open: true,
        message: err?.response?.data?.message || err?.message || "Login failed",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#76c8b1] flex items-center justify-center p-4">
      <LoginModal
        handleLogin={handleLogin}
        onForgotPassword={() => setForgotOpen(true)}
        loading={loginMutation.isPending}
      />

      <ForgotPasswordModal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
      />

      <ConfirmDialog
        open={errorDialog.open}
        onClose={() =>
          setErrorDialog({
            open: false,
            message: "",
          })
        }
        variant="danger"
        title="Login Failed"
        description={errorDialog.message}
        cancelText="Close"
      />
    </div>
  );
}
