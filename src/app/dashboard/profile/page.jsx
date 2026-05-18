"use client";

import React, { useState } from "react";
import {
  User, Mail, Phone, MapPin, Shield,
  Camera, Save, Lock, Smartphone,
  Trash2, AlertTriangle, Monitor, ChevronRight,
  Key, Globe, Bell, CreditCard
} from "lucide-react";

export default function AccountSettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [activeSection, setActiveSection] = useState("profile");

  // Form state
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "admin@gmail.com",
    phone: "+91 98765 43210",
    cityCountry: "New Delhi, India",
    bio: "Senior administrator with 5+ years of experience in educational technology.",
    company: "EduFactory",
    role: "Super Admin"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", formData);
    alert("Profile changes saved successfully!");
  };

  const handleUpdatePassword = () => {
    alert("Password update workflow would open here");
  };

  const handleDeleteAccount = () => {
    if (confirm("⚠️ Are you absolutely sure? This will PERMANENTLY delete your account and all data. This action cannot be undone.")) {
      alert("Account deletion request submitted. A confirmation email has been sent.");
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Header with modern gradient */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg shadow-emerald-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Account Settings</h1>
                  <p className="text-slate-500 text-sm">Manage your profile, security, and account preferences</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-emerald-700">Account Active</span>
              </div>
            </div>
          </div>
          
          {/* Quick Navigation Pills - Replaces sidebar */}
          <div className="flex flex-wrap gap-2 mt-6 pb-2 border-b border-slate-100">
            <button
              onClick={() => scrollToSection("profile-section")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeSection === "profile-section"
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <User size={16} />
              Profile & Personal
            </button>
            <button
              onClick={() => scrollToSection("security-section")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeSection === "security-section"
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Shield size={16} />
              Security & 2FA
            </button>
            <button
              onClick={() => scrollToSection("danger-section")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeSection === "danger-section"
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Trash2 size={16} />
              Danger Zone
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">
        
        {/* PROFILE SECTION */}
        <section id="profile-section" className="scroll-mt-24">
          {/* Profile Header Card - Modern Redesign */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Cover image area */}
            <div className="h-32 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 relative">
              <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-slate-600 hover:bg-white transition-all text-xs font-medium flex items-center gap-1 shadow-sm">
                <Camera size={14} /> Change Cover
              </button>
            </div>
            
            <div className="px-6 md:px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-12 mb-6">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl ring-4 ring-white">
                    JD
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl border border-slate-200 shadow-md text-emerald-600 hover:bg-emerald-50 transition-all hover:scale-105">
                    <Camera size={14} />
                  </button>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-slate-800">{formData.fullName}</h2>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200">Verified</span>
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-200">Super Admin</span>
                  </div>
                  <p className="text-sm text-slate-500">Administrator • Joined May 2024</p>
                </div>
                <button
                  onClick={handleSaveProfile}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-xl font-semibold text-sm transition-all shadow-md active:scale-95"
                >
                  <Save size={16} />
                  Save All Changes
                </button>
              </div>

              {/* Personal Information Form - Redesigned */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">
                    <User size={18} />
                  </div>
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        name="cityCountry"
                        value={formData.cityCountry}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all outline-none"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-600 block mb-1.5">Bio / About</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECURITY SECTION */}
        <section id="security-section" className="scroll-mt-24">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 md:px-8 py-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                  <Shield size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Security Center</h3>
                  <p className="text-sm text-slate-500">Manage your password and security preferences</p>
                </div>
              </div>
            </div>

            <div className="px-6 md:px-8 py-6 space-y-4">
              {/* 2FA Card */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100 hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm border border-slate-100">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500">Add an extra layer of security via authenticator app</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={twoFactorEnabled}
                    onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Password Update Card */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-slate-600 shadow-sm border border-slate-100">
                    <Lock size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Password</p>
                    <p className="text-xs text-slate-500">Last changed 2 months ago • Strong encryption</p>
                  </div>
                </div>
                <button
                  onClick={handleUpdatePassword}
                  className="text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-all"
                >
                  Change
                </button>
              </div>

              {/* Active Sessions */}
              <div className="p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center">
                      <Monitor size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">Chrome on Windows</p>
                      <p className="text-[11px] text-slate-400">New Delhi, India • Current session</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Active Now</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-emerald-50/50 rounded-xl text-xs text-slate-600 flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-500" />
                <span>For better security, we recommend enabling 2FA and updating your password regularly.</span>
              </div>
            </div>
          </div>
        </section>

        {/* DANGER ZONE SECTION */}
        <section id="danger-section" className="scroll-mt-24">
          <div className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden">
            <div className="px-6 md:px-8 py-6 border-b border-rose-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded-xl text-rose-500">
                  <Trash2 size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Danger Zone</h3>
                  <p className="text-sm text-slate-500">Irreversible account actions</p>
                </div>
              </div>
            </div>

            <div className="px-6 md:px-8 py-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-rose-50/30 rounded-xl border border-rose-100">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-red-100 rounded-lg text-red-600">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Delete Account Permanently</p>
                    <p className="text-sm text-slate-500 max-w-md">
                      Once deleted, all your data including courses, certificates, and personal information will be permanently removed.
                    </p>
                    <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
                      <span>⚠️</span> This action cannot be undone
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-red-200 hover:bg-red-600 hover:text-white text-red-600 font-semibold rounded-xl transition-all shadow-sm"
                >
                  <Trash2 size={16} />
                  Delete Account
                </button>
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-xl text-xs text-amber-700 flex items-center gap-2">
                <span>💡</span>
                <span>Before deleting your account, make sure to export any important data you want to keep.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Card */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-100">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Bell size={18} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Need help?</p>
              <p className="text-xs text-slate-600 mt-0.5">
                Our support team is available 24/7. <button className="text-emerald-600 font-medium hover:underline">Contact support →</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}