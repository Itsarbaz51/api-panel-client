"use client";

import React, { useState } from "react";
import { useCurrentUser, useResetPassword } from "@/hooks/useAuth";

import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  CreditCard,
  Shield,
  Clock,
  Calendar,
  ShieldCheck,
  Lock,
  CheckCircle2,
  } from "lucide-react";

// --- Custom UI Imports ---
import Header from "@/components/ui/Header";
import Alert from "@/components/ui/Alert";

import ResetPasswordModal from "../modals/ResetPasswordModal";
import { useSelector } from "react-redux";

export default function ProfileClient() {
  const user = useSelector((state) => state.auth.user);

  const isLoading = !user;

  const resetPasswordMutation = useResetPassword();

  // --- UI States ---
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [modalError, setModalError] = useState("");
  const [pageNotification, setPageNotification] = useState(null);

  // --- Form States ---
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (modalError) setModalError("");
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleCloseModal = () => {
    setIsPasswordModalOpen(false);
    setModalError("");
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setShowPassword({ old: false, new: false, confirm: false });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setModalError("");

    try {
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setModalError("New password and confirm password do not match.");
        return;
      }

      const payload = {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      };

      const res = await resetPasswordMutation.mutateAsync(payload);

      setPageNotification({
        type: "success",
        title: "Security Updated",
        message: res?.message || "Your password has been successfully updated.",
      });

      handleCloseModal();
    } catch (err) {
      setModalError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update password. Please try again.",
      );
    }
  };

  const formatText = (text) => {
    if (!text) return "Not set";
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const isActive = user?.status?.toUpperCase() === "ACTIVE";

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500 mt-2">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-slate-50/50 pb-16 font-sans">
      <div>
        <Header
          title="Account Settings"
          subtitle="Manage your profile information and security preferences."
        />

        {pageNotification && (
          <div className="mt-6">
            <Alert
              type={pageNotification.type}
              title={pageNotification.title}
              icon={<CheckCircle2 className="w-5 h-5" />}
            >
              {pageNotification.message}
            </Alert>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* --- Left Column: Profile Summary --- */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="h-24 bg-linear-to-r from-green-400 to-green-600"></div>
              <div className="px-6 pb-6 flex flex-col items-center text-center -mt-12">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                    <div className="w-full h-full rounded-full bg-green-50 flex items-center justify-center overflow-hidden border border-slate-100">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user?.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-green-600 text-3xl font-bold uppercase">
                          {user?.fullName?.charAt(0) || "F"}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${isActive ? "bg-green-500" : "bg-amber-500"}`}
                  >
                    {isActive ? (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    ) : (
                      <Clock className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>

                {/* Name & Role */}
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-slate-900 capitalize">
                    {user?.fullName || "Faiz"}
                  </h2>
                  <p className="text-sm font-medium text-green-600 mt-1 flex items-center justify-center gap-1.5">
                    <Shield className="w-4 h-4" />
                    {formatText(user?.role) || "Super Admin"}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="border-t border-slate-100 divide-y divide-slate-100">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Member Since</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : "May 2026"}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <span>KYC Status</span>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide ${user?.isKycVerified !== false ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}
                    >
                      {user?.isKycVerified !== false ? "Verified" : "Pending"}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className={`h-full rounded-full ${user?.isKycVerified !== false ? "bg-green-500 w-full" : "bg-amber-500 w-1/2"}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Security Action */}
            <div className="bg-green-800 rounded-2xl shadow-sm border border-green-700 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 opacity-20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Lock className="w-6 h-6 text-green-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Account Security
                    </h3>
                    <p className="text-green-100 text-sm mt-1">
                      Update your password regularly to keep your account
                      secure.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white text-green-800 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* --- Right Column: Details & Security --- */}
          <div className="w-full lg:w-2/3 space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Personal Information
              </h3>
              <div className="space-y-1">
                <DetailRow
                  icon={<User />}
                  label="Full Name"
                  value={user?.fullName}
                  capitalize
                />
                <DetailRow
                  icon={<Mail />}
                  label="Email Address"
                  value={user?.email}
                />
                <DetailRow
                  icon={<Phone />}
                  label="Phone Number"
                  value={user?.phoneNumber}
                />
              </div>
            </div>

            {/* Company Details */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Company Details
              </h3>
              <div className="space-y-1">
                <DetailRow
                  icon={<Building2 />}
                  label="Company Name"
                  value={user?.companyName}
                  capitalize
                />
                <DetailRow
                  icon={<Briefcase />}
                  label="Company Type"
                  value={formatText(user?.companyType)}
                />
                <DetailRow
                  icon={<CreditCard />}
                  label="Registration Number"
                  value={user?.registrationNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResetPasswordModal
        open={isPasswordModalOpen}
        onClose={handleCloseModal}
        passwordForm={passwordForm}
        showPassword={showPassword}
        handleInputChange={handleInputChange}
        toggleVisibility={toggleVisibility}
        handleSubmit={handlePasswordSubmit}
        loading={
          resetPasswordMutation.isPending || resetPasswordMutation.isLoading
        }
        error={modalError}
      />
    </div>
  );
}

function DetailRow({ icon, label, value, capitalize }) {
  return (
    <div className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-slate-400">
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <span className="text-sm font-medium text-slate-500">{label}</span>
      </div>
      <span
        className={`text-sm font-semibold text-slate-900 text-right max-w-[200px] sm:max-w-[300px] truncate ${capitalize ? "capitalize" : ""}`}
      >
        {value ? (
          value
        ) : (
          <span className="text-slate-400 font-normal italic">Not set</span>
        )}
      </span>
    </div>
  );
}
