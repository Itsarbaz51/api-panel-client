"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, Key, Smartphone, Globe, LogOut, 
  AlertTriangle, Fingerprint, Lock, History, 
  Binary, RefreshCcw, ShieldAlert, CheckCircle2, 
  ScanFace, Zap, ShieldQuestion 
} from "lucide-react";

const sessions = [
  { id: 1, type: "desktop", device: "Chrome on macOS", location: "Jaipur, Rajasthan", ip: "192.168.1.1", active: true },
  { id: 2, type: "mobile", device: "iPhone 15 Pro Max", location: "Ajmer, Rajasthan", ip: "10.0.0.45", active: false, lastActive: "2 hrs ago" },
];

export default function SecurityPage() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 text-slate-800 animate-in fade-in duration-1000 font-sans selection:bg-emerald-500/20">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/[0.03] blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* --- HEADER SECTION (Updated as per Image) --- */}
      <header className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-8">
        <div className="space-y-1">
          {/* Header jaisa image mein hai */}
          <h1 className="text-[28px] font-bold text-[#0f172a] tracking-tight">
            Available Security Protocol
          </h1>
          <p className="text-[15px] text-[#64748b] font-medium">
            Select the best plan for your operational needs.
          </p>
        </div>

        {/* Identity Status Badge */}
        <div className="flex items-center gap-4 bg-[#f8fafc] p-2 rounded-[2rem] border border-slate-100 shadow-sm backdrop-blur-sm">
           <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-emerald-50">
              <ScanFace className="text-emerald-500" size={20} />
           </div>
           <div className="pr-6">
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none mb-1">Identity Status</p>
              <p className="text-xs font-bold text-slate-700">Verified Administrator</p>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: CREDENTIALS & SESSIONS --- */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Credentials Box */}
          <section className="relative p-1 bg-gradient-to-br from-emerald-100 via-white to-white rounded-[3rem] shadow-2xl shadow-emerald-900/5">
            <div className="bg-white rounded-[2.8rem] p-10 relative overflow-hidden">
              <Binary size={200} className="absolute -top-20 -right-20 text-emerald-500/[0.02] -rotate-12" />
              
              <div className="flex items-center gap-6 mb-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 animate-pulse" />
                  <div className="relative p-4 bg-slate-900 rounded-[2rem] shadow-xl shadow-emerald-900/20">
                    <Key size={28} className="text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Access Credentials</h3>
                  <p className="text-sm text-slate-400 font-medium">Rotate your master password regularly.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {["Current_Password", "New_Password", "Confirm_New_Password"].map((label, i) => (
                  <div key={label} className={`group ${i === 0 ? 'md:col-span-2' : ''}`}>
                    <div className="flex justify-between mb-3 px-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] group-focus-within:text-emerald-500 transition-colors">
                        {label.replace(/_/g, ' ')}
                      </label>
                      <Lock size={12} className="text-slate-200 group-focus-within:text-emerald-300" />
                    </div>
                    <input 
                      type="password" 
                      placeholder="••••••••••••"
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-sm font-mono focus:bg-white focus:ring-[6px] focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 shadow-inner" 
                    />
                  </div>
                ))}
              </div>

              <div className="mt-12 flex items-center justify-between gap-6 p-6 bg-emerald-50/30 rounded-[2rem] border border-emerald-100/50">
                <p className="text-xs text-emerald-700 font-bold max-w-xs leading-relaxed">
                  <ShieldAlert size={14} className="inline mr-2 mb-1" />
                  Password must be 12+ characters with symbols.
                </p>
                <button className="flex items-center gap-3 bg-slate-900 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-2xl shadow-xl shadow-emerald-900/20 transition-all duration-500 active:scale-95 group">
                  <RefreshCcw size={16} className="text-emerald-400 group-hover:rotate-180 transition-transform duration-700" /> 
                  Update Protocol
                </button>
              </div>
            </div>
          </section>

          {/* Sessions Table */}
          <section className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 rounded-2xl">
                  <History size={20} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Authenticated Nodes</h3>
              </div>
              <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Revoke All</button>
            </div>
            
            <div className="divide-y divide-slate-50">
              {sessions.map((session) => (
                <div key={session.id} className="group flex items-center justify-between p-10 hover:bg-emerald-50/20 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={`relative p-5 rounded-2xl transition-all duration-500 ${session.active ? 'bg-slate-900 text-emerald-400' : 'bg-slate-50 text-slate-300'}`}>
                      {session.type === 'desktop' ? <Globe size={24} /> : <Smartphone size={24} />}
                      {session.active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-4 border-white animate-ping" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-lg font-black text-slate-800 tracking-tight">{session.device}</p>
                        {session.active && (
                          <span className="text-[8px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Current</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{session.location} • <span className="font-mono">{session.ip}</span> {session.lastActive && `• ${session.lastActive}`}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-rose-500 rounded-xl transition-all duration-300 group/btn">
                    <LogOut size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="lg:col-span-4 space-y-8">
          {/* 2FA Card */}
          <section className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-emerald-900/20 relative overflow-hidden group">
            <Zap size={150} className="absolute -bottom-20 -left-20 text-emerald-500/10 rotate-12 group-hover:scale-110 transition-transform duration-1000" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="p-4 bg-emerald-500/20 rounded-3xl backdrop-blur-md">
                  <ShieldCheck size={32} className="text-emerald-400" />
                </div>
                <label className="relative inline-flex items-center cursor-pointer scale-125">
                  <input type="checkbox" className="sr-only peer" checked={is2FAEnabled} onChange={() => setIs2FAEnabled(!is2FAEnabled)} />
                  <div className="w-12 h-7 bg-white/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
              <h2 className="text-2xl font-black tracking-tight mb-4 leading-tight">Multi-Factor<br />Authentication</h2>
              <p className="text-sm text-emerald-100/50 font-medium leading-relaxed mb-6">
                Add a cryptographic layer to your login flow using a hardware key or TOTP app.
              </p>
            </div>
          </section>

          {/* Security Audit */}
          <section className="bg-emerald-500 rounded-[3rem] p-10 text-white shadow-xl shadow-emerald-500/20">
             <ShieldQuestion size={32} className="mb-6 opacity-80" />
             <h4 className="text-lg font-black tracking-tight mb-2">Security Audit</h4>
             <div className="w-full bg-emerald-600 rounded-full h-1.5 mb-4">
                <div className="bg-white w-[85%] h-full rounded-full" />
             </div>
             <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest">Strength Score: 85%</p>
          </section>
        </div>
      </div>
    </div>
  );
}