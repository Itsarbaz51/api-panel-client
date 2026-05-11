"use client";

import React, { useState } from 'react';
import { Copy, Plus, Trash2, Key, Eye, EyeOff, ShieldCheck, Clock, Zap } from 'lucide-react';
import Button from "@/components/ui/Button"; 

const APIKeysPage = () => {
  const [keys, setKeys] = useState([
    { id: 1, name: 'Production Key', key: 'sk_live_51Mxxxxxxxxxxxxxx', created: 'Oct 24, 2023', status: 'active' },
    { id: 2, name: 'Testing Key', key: 'sk_test_51Mxxxxxxxxxxxxxx', created: 'Nov 12, 2023', status: 'active' },
  ]);

  const [showKey, setShowKey] = useState({});

  const toggleVisibility = (id) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 bg-emerald-500 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/80">Security Layer</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-slate-800">
            API <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Access Keys</span>
          </h1>
        </div>

        {/* --- IMAGE WALA BUTTON DESIGN --- */}
        <div className="inline-flex items-center p-1.5 bg-slate-50/80 backdrop-blur-md border border-slate-100 rounded-[32px] shadow-inner">
           <button className="flex items-center gap-2.5 px-6 py-2.5 bg-white rounded-[24px] shadow-[0_10px_20px_-5px_rgba(0,0,0,0.08)] border border-emerald-50 text-emerald-600 transition-all duration-300 hover:scale-105 active:scale-95">
              <Plus size={18} strokeWidth={3} />
              <span className="text-sm font-black uppercase tracking-wider">Generate Key</span>
           </button>
           <div className="px-5 py-2 text-slate-400 text-[11px] font-bold uppercase tracking-widest hidden sm:block">
              Revoke All
           </div>
        </div>
      </div>

      {/* Info Banner - Elevated Design */}
      <div className="relative overflow-hidden bg-white border border-emerald-100/50 p-5 rounded-[2rem] mb-10 shadow-[0_15px_40px_-15px_rgba(16,185,129,0.1)] flex gap-5 items-center group">
        <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:scale-110 transition-transform duration-700">
          <Zap size={100} fill="currentColor" className="text-emerald-500" />
        </div>
        <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-lg shadow-emerald-200">
          <ShieldCheck size={24} />
        </div>
        <div className="relative z-10">
          <h3 className="text-sm font-bold text-slate-800">Security Best Practices</h3>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
            Your secret API keys are powerful. Never share them in public repositories or frontend code. 
            We recommend rotating your keys every 90 days for maximum security.
          </p>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-50">Identity</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-50">Token Configuration</th>
                <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-50">Status</th>
                <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b border-slate-50">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {keys.map((item) => (
                <tr key={item.id} className="group hover:bg-emerald-50/30 transition-all duration-500">
                  <td className="px-10 py-7">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{item.name}</span>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <Clock size={12} className="text-emerald-500" />
                        <span>ISSUED: {item.created}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2.5 rounded-2xl shadow-sm w-fit group-hover:border-emerald-200 transition-colors">
                      <code className="font-mono text-[13px] font-medium text-slate-500">
                        {showKey[item.id] ? item.key : "•••• •••• •••• ••••"}
                      </code>
                      <button 
                        onClick={() => toggleVisibility(item.id)}
                        className="p-1 hover:text-emerald-600 text-slate-300 transition-colors"
                      >
                        {showKey[item.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm w-fit">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Verified</span>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <div className="flex justify-end gap-3 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <button 
                        onClick={() => copyToClipboard(item.key)}
                        className="p-3 bg-white hover:bg-emerald-500 hover:text-white rounded-2xl text-slate-400 shadow-sm border border-slate-100 transition-all active:scale-90"
                        title="Copy to Clipboard"
                      >
                        <Copy size={16} />
                      </button>
                      <button 
                        className="p-3 bg-white hover:bg-red-500 hover:text-white rounded-2xl text-slate-400 shadow-sm border border-slate-100 transition-all active:scale-90"
                        title="Revoke Access"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default APIKeysPage;