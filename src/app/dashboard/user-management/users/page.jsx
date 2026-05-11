"use client";

import React, { useState } from "react";
import { Search, MoreVertical, ShieldCheck, Mail, Calendar } from "lucide-react";

const dummyUsers = [
  { id: 1, name: "Arjun Sharma", email: "arjun@example.com", role: "Admin", status: "ACTIVE", joined: "12 May 2024" },
  { id: 2, name: "Sneha Patel", email: "sneha.p@company.in", role: "Editor", status: "INACTIVE", joined: "05 Jan 2024" },
  { id: 3, name: "Rahul Verma", email: "rahul.v@dev.com", role: "Viewer", status: "ACTIVE", joined: "20 Mar 2024" },
  { id: 4, name: "Priya Singh", email: "priya@startup.io", role: "Admin", status: "ACTIVE", joined: "15 Feb 2024" },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = dummyUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafb] p-4 md:p-10">
      
      {/* --- MAIN WORKSPACE CARD (Ab Header Hata Diya Gaya Hai) --- */}
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
        
        {/* Workspace Title & Search Row */}
        <div className="p-8">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">Operational Workspace</span>
            <div className="h-[1px] w-full bg-slate-50" />
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="relative w-full md:w-[450px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text"
                placeholder="Search users by name or email..."
                className="w-full pl-14 pr-6 py-4 bg-[#f9fafb] border border-slate-100 rounded-2xl text-sm outline-none focus:bg-white focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="w-full md:w-auto bg-[#0f172a] text-white px-10 py-4 rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Add New Member
            </button>
          </div>
        </div>

        {/* --- DATA TABLE --- */}
        <div className="overflow-x-auto px-4 pb-8">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Date Joined</th>
                <th className="px-6 py-4 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-emerald-500/20">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-slate-800 leading-none mb-1">{user.name}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Mail size={12} className="text-slate-300" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-slate-500">
                    <div className="flex items-center gap-2">
                       <ShieldCheck size={14} className="text-emerald-500" />
                       <span className="text-xs font-semibold">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-widest ${
                      user.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <Calendar size={14} className="text-slate-300" /> {user.joined}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="p-3 text-slate-300 hover:text-slate-600 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Area */}
        <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center px-10">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Showing {filteredUsers.length} Users</p>
          <div className="flex gap-2">
             <button className="px-6 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-600 shadow-sm">Next Page</button>
          </div>
        </div>

      </div>
    </div>
  );
}