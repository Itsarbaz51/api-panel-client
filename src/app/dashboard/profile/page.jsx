"use client";

import React, { useState } from "react";
import { 
  User, Mail, Phone, MapPin, Shield, 
  Bell, Camera, Save, Lock, Smartphone,
  ExternalLink, Trash2
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("General");

  const tabs = ["General", "Security", "Notifications", "Billing"];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-sm text-slate-500">Manage your profile information and account preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Sidebar Tabs */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab 
                  ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100" 
                  : "text-slate-500 hover:bg-white hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right: Content Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Profile Avatar Card */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-3xl bg-emerald-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-emerald-200">
                    JD
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl border border-slate-100 shadow-lg text-emerald-600 hover:bg-emerald-50 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <h2 className="text-xl font-bold text-slate-900">John Doe</h2>
                  <p className="text-sm text-slate-500 mb-4">Administrator • Joined May 2024</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-full tracking-wider border border-emerald-100">Verified</span>
                    <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold uppercase rounded-full tracking-wider">Super Admin</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-100 active:scale-95">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>

            {/* General Information Form */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <User size={20} className="text-emerald-500" />
                <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Personal Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative mt-2">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" defaultValue="John Doe" className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="email" defaultValue="admin@gmail.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative mt-2">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" defaultValue="+91 98765 43210" className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">City / Country</label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" defaultValue="New Delhi, India" className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Security & Authentication */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <Shield size={20} className="text-emerald-500" />
                <h3 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Security</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Two-Factor Authentication</p>
                      <p className="text-[11px] text-slate-500">Protect your account with an extra layer of security.</p>
                    </div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-600 shadow-sm">
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Password</p>
                      <p className="text-[11px] text-slate-500">Last changed 2 months ago.</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-emerald-600 hover:bg-white px-4 py-2 rounded-lg transition-all">Update</button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-rose-50 rounded-[2rem] border border-rose-100 p-8 shadow-sm">
              <h3 className="font-bold text-rose-800 text-sm mb-2">Delete Account</h3>
              <p className="text-xs text-rose-600 mb-6 leading-relaxed">
                Permanently remove your account and all of your data from EduFactory platform. This action is not reversible.
              </p>
              <button className="flex items-center gap-2 text-rose-700 font-bold text-xs bg-white border border-rose-200 px-6 py-3 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm active:scale-95">
                <Trash2 size={16} />
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}