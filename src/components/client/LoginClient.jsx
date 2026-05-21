"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import LoginModal from "../modals/LoginModal";
import ForgotPasswordModal from "@/components/modals/ForgotPasswordModal";
import ConfirmDialog from "@/components/ConfirmDialog";

import { setUser } from "@/store/authSlice";

import {
  useLogin,
  useForgotPassword,
} from "@/hooks/useAuth";

import { useRouter } from "next/navigation";

export default function LoginClient() {
  const [forgotOpen, setForgotOpen] =
    useState(false);

  const [errorDialog, setErrorDialog] =
    useState({
      open: false,
      message: "",
    });

  const dispatch = useDispatch();

  const loginMutation =
    useLogin();

  const forgotMutation =
    useForgotPassword();

  const router =
    useRouter();



  // LOGIN

  const handleLogin =
    async (
      data
    ) => {
      try {
        const res =
          await loginMutation.mutateAsync(
            data
          );

        console.log(
          res
        );

        dispatch(
          setUser(
            res.data
          )
        );

        router.push(
          "/dashboard"
        );

      } catch (
        err
      ) {

        console.log(
          err
        );

        setErrorDialog({
          open: true,

          message:
            err
              ?.response
              ?.data
              ?.message ||

            err
              ?.message ||

            "Login failed",
        });

      }
    };



  // FORGOT PASSWORD

  const handleForgotPassword =
    async (
      data
    ) => {
      try {

        const res =
          await forgotMutation.mutateAsync(
            data
          );

        console.log(
          res
        );

        setErrorDialog({
          open: true,

          message:
            res?.message ||

            "Reset password link sent",
        });

        setForgotOpen(
          false
        );

      } catch (
        err
      ) {

        console.log(
          err
        );

        setErrorDialog({
          open: true,

          message:
            err
              ?.response
              ?.data
              ?.message ||

            err
              ?.message ||

            "Forgot password failed",
        });

      }
    };



  return (
    <div className="min-h-screen bg-[#76c8b1] flex items-center justify-center p-4">

      <LoginModal
        handleLogin={
          handleLogin
        }

        onForgotPassword={() =>
          setForgotOpen(
            true
          )
        }

        loading={
          loginMutation.isPending
        }
      />



      <ForgotPasswordModal
        isOpen={
          forgotOpen
        }

        onClose={() =>
          setForgotOpen(
            false
          )
        }

        onSubmit={
          handleForgotPassword
        }

        loading={
          forgotMutation.isPending
        }
      />



      <ConfirmDialog
        open={
          errorDialog.open
        }

        onClose={() =>
          setErrorDialog({
            open: false,
            message: "",
          })
        }

        variant="danger"

        title="Notification"

        description={
          errorDialog.message
        }

        cancelText="Close"
      />

    </div>
  );
}