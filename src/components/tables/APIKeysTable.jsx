"use client";

import React, { useState } from 'react';
import {
  Copy,
  MoreVertical,
  Eye,
  EyeOff,
  Clock,
  Key as KeyIcon,
  Plus,
  Check,
  Search,
  Filter,
  ChevronDown
} from "lucide-react";
import Button from "@/components/ui/Button";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "ACTIVE" },
  { label: "Expired", value: "EXPIRED" },
  { label: "Revoked", value: "REVOKED" },
];

export default function APIKeysTable({
  keys, 
  total, 
  search, 
  onSearch,
  statusFilter, 
  onStatusFilterChange, 
  onGenerateKey, 
  onRevokeKey
}) {
  const [showKey, setShowKey] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const toggleVisibility = (id) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!keys || keys.length === 0) {
    return (
      <div className="bg-white rounded-[16px] border border-slate-200/60 shadow-sm p-16 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-inner rotate-3">
          <KeyIcon size={40} className="text-slate-300 -rotate-12" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No API keys found</h3>
        <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
          {search || statusFilter !== 'all' 
            ? "We couldn't find any keys matching your current filters."
            : "Get started by generating your first secure API access key."}
        </p>
        <Button onClick={onGenerateKey} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6 py-2.5">
          <Plus size={18} className="mr-2" />
          Generate First Key
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfdff] rounded-[16px] border border-slate-200 overflow-hidden shadow-sm">
      
      {/* Table Header & Search/Filter (Matches Image) */}
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 bg-white">
        <div>
          <h2 className="text-[22px] font-bold text-slate-900">API Access Keys</h2>
          <p className="text-sm font-medium text-slate-600 mt-1">
            {total} active credentials
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search..." 
              className="pl-10 pr-4 py-2.5 w-64 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Status Filter Component */}
          <div className="relative group">
            <select
               value={statusFilter}
               onChange={(e) => onStatusFilterChange(e.target.value)}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            >
               {statusOptions.map(opt => (
                 <option key={opt.value} value={opt.value}>{opt.label}</option>
               ))}
            </select>
            <div className="flex flex-col items-center justify-center bg-white border border-slate-200 rounded-xl px-4 py-2 group-hover:bg-slate-50 transition-colors pointer-events-none">
              <Filter size={14} className="text-slate-500 mb-0.5" />
              <span className="text-xs font-bold text-slate-700">Status</span>
              <ChevronDown size={14} className="text-slate-400 mt-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Actual Table Body */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-100">
              <th className="px-6 py-4 text-sm font-bold text-slate-800 w-[30%]">Identity</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-800 w-[40%]">Token Configuration</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-800">Status</th>
              <th className="px-6 py-4 text-sm font-bold text-slate-800 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {keys.map((row) => {
              const isActive = row.status?.toLowerCase() === 'active';
              return (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  
                  {/* Identity Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
                        <KeyIcon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{row.name}</p>
                        <div className="flex items-center gap-1.5 mt-1 text-slate-500">
                          <Clock size={12} />
                          <span className="text-[11px] font-medium tracking-wide">Created: {row.created}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Token Configuration Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-between max-w-[280px] bg-slate-50/50 border border-slate-200 rounded-lg pl-3 pr-1 py-1.5 shadow-sm group">
                      <span className="text-[13px] text-slate-600 font-mono tracking-tight truncate mr-2">
                        {showKey[row.id] ? row.key : "••••••••••••••••••••••••"}
                      </span>
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => copyToClipboard(row.key, row.id)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="Copy"
                        >
                          {copiedId === row.id ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <button 
                          onClick={() => toggleVisibility(row.id)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-md transition-colors"
                          title={showKey[row.id] ? "Hide" : "Show"}
                        >
                          {showKey[row.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm w-fit">
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-slate-500' : 'bg-red-400'}`} />
                      <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
                        {row.status || 'ACTIVE'}
                      </span>
                    </div>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                     {/* Yahan par MoreVertical use kiya gaya hai matching image ke liye. Aap isme Dropdown lagakar delete/revoke action de sakte hain */}
                    <button 
                      onClick={() => onRevokeKey && onRevokeKey(row.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                      title="Revoke / Options"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}