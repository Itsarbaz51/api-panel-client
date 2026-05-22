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
  CheckCircle,
  Clock,
  Calendar,
  Edit2,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Lock,
  CheckCircle2 // <-- Imported for the success alert icon
} from "lucide-react";

// --- Custom UI Imports ---
import Button from "@/components/ui/Button";
import Header from "@/components/ui/Header";
import Alert from "@/components/ui/Alert";  

import ResetPasswordModal from "../modals/ResetPasswordModal";

export default function ProfileClient() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useCurrentUser();

  const resetPasswordMutation = useResetPassword();
  const user = data?.data;

  // --- UI States ---
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [modalError, setModalError] = useState(""); 
  const [pageNotification, setPageNotification] = useState(null); 

  // --- Form States ---
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing again
    if (modalError) setModalError("");
  };

  const toggleVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Close modal and reset its specific states
  const handleCloseModal = () => {
    setIsPasswordModalOpen(false);
    setModalError("");
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setShowPassword({ old: false, new: false, confirm: false });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setModalError(""); // Reset previous errors

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

      // On Success: Show notification on the main page and close modal
      setPageNotification({
        type: "success",
        title: "Security Updated",
        message: res?.message || "Your password has been successfully updated."
      });
      
      handleCloseModal();

    } catch (err) {
      // On Error: Show alert inside the modal
      setModalError(
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update password. Please try again."
      );
    }
  };

  const formatText = (text) => {
    if (!text) return "Not set";
    return text.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const isActive = user?.status?.toUpperCase() === "ACTIVE";

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 border-4 border-emerald-100 rounded-full"></div>
            <div className="absolute w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="w-6 h-6 bg-emerald-600 rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm font-semibold text-slate-500 tracking-wide mt-4">Syncing profile...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-10 rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-red-50 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Profile Unavailable</h2>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed">
            {error?.message || "We couldn't connect to your profile data. Please verify your connection and try again."}
          </p>
          <Button onClick={() => window.location.reload()} fullWidth className="py-3.5 shadow-lg shadow-slate-900/20">
            Refresh Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-16 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-400/10 blur-[120px]"></div>
        <div className="absolute top-80 -left-40 w-[400px] h-[400px] rounded-full bg-teal-400/10 blur-[100px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* --- Unified Management Console Header --- */}
        <Header 
          title="Account Overview"
          subtitle="Manage your personal profile, business details, and security preferences."
        />

        {/* --- Page Level Notification (Success Alerts) --- */}
        {pageNotification && (
          <Alert 
            type={pageNotification.type} 
            title={pageNotification.title}
            icon={<CheckCircle2 className="w-5 h-5" />}
          >
            {pageNotification.message}
          </Alert>
        )}
        
        <div className="space-y-8 mt-2">
          {/* --- Premium Emerald Profile Hero Card --- */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-slate-200/60 overflow-hidden">
            <div className="h-48 bg-slate-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-950 to-teal-900 opacity-95"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[80px]"></div>
            </div>
            
            <div className="px-6 sm:px-12 pb-10">
              <div className="sm:flex justify-between items-end -mt-20 mb-8 relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-8">
                  <div className="relative inline-block group">
                    <div className="absolute inset-0 bg-emerald-600 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    {user?.profileImage ? (
                      <img src={user.profileImage} alt={user?.fullName} className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] border-[6px] border-white shadow-2xl object-cover bg-white" />
                    ) : (
                      <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] border-[6px] border-white shadow-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 flex items-center justify-center">
                        <span className="text-emerald-700/40 text-5xl sm:text-6xl font-bold uppercase">{user?.fullName?.charAt(0) || "U"}</span>
                      </div>
                    )}
                    <div className={`absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full border-[3px] border-white shadow-lg ${isActive ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"}`}>
                      {isActive ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <div className="pb-4">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3 capitalize">{user?.fullName || "Unnamed User"}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                      <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {user?.email || "No email"}
                      </span>
                      <span className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        <span>{formatText(user?.role)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <Button fullWidth className="mt-6 sm:hidden flex justify-center items-center gap-2 shadow-lg">
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Member Since</p>
                    <p className="text-base font-bold text-slate-900">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Not available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${user?.isKycVerified ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">KYC Status</p>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${user?.isKycVerified ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {user?.isKycVerified ? "Verified" : "Pending"}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${user?.isKycVerified ? "bg-emerald-500 w-full" : "bg-amber-500 w-1/2"}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- iOS Style Data Lists --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 ml-2">Personal Information</h3>
              <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] border border-slate-200/60 p-2">
                <dl className="divide-y divide-slate-100">
                  <DetailRow icon={<User />} label="Full Name" value={user?.fullName} capitalize />
                  <DetailRow icon={<Mail />} label="Email Address" value={user?.email} />
                  <DetailRow icon={<Phone />} label="Phone Number" value={user?.phoneNumber} />
                </dl>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 ml-2">Company Details</h3>
              <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] border border-slate-200/60 p-2">
                <dl className="divide-y divide-slate-100">
                  <DetailRow icon={<Building2 />} label="Company Name" value={user?.companyName} capitalize />
                  <DetailRow icon={<Briefcase />} label="Company Type" value={formatText(user?.companyType)} />
                  <DetailRow icon={<CreditCard />} label="Registration Number" value={user?.registrationNumber} />
                </dl>
              </div>
            </div>
          </div>

          {/* --- Dark Emerald Security Banner --- */}
          <div className="bg-emerald-950 rounded-[2.5rem] shadow-2xl shadow-emerald-900/20 border border-emerald-900 overflow-hidden relative mt-4">
            <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500 to-teal-500 opacity-[0.15] rounded-full -mr-48 -mt-48 blur-[100px] pointer-events-none" />
            
            <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                  <Shield className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1.5">Account Security</h3>
                  <p className="text-emerald-100/70 text-sm font-medium flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Manage passwords and Two-Factor Auth
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 bg-white/10 border border-white/20 text-white rounded-2xl text-sm font-bold hover:bg-white/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                >
                  <Lock className="w-4 h-4" />
                  Reset Password
                </button>
                
                <button className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white rounded-2xl text-sm font-bold hover:bg-emerald-400 flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-emerald-900/50">
                  Manage 2FA
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
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
        loading={resetPasswordMutation.isPending || resetPasswordMutation.isLoading}
        error={modalError} // Passed error state to modal
      />
    </div>
  );
}

function DetailRow({ icon, label, value, capitalize }) {
  return (
    <div className="group flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/50 transition-colors duration-200 first:rounded-t-[1.75rem] last:rounded-b-[1.75rem] cursor-default">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors duration-300">
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <dt className="text-sm font-semibold text-slate-600">{label}</dt>
      </div>
      <div className="flex items-center gap-3">
        <dd className={`text-sm font-bold text-slate-900 text-right max-w-[150px] sm:max-w-[250px] truncate ${capitalize ? 'capitalize' : ''}`}>
          {value ? value : <span className="text-slate-300 font-medium italic">Not set</span>}
        </dd>
        <ChevronRight className="w-4 h-4 text-slate-300 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
      </div>
    </div>
  );
}