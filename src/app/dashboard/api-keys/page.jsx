"use client";

import React, { useState } from "react";
import { 
  Plus, ShieldCheck, Download, 
  Trash2, Settings, Key
} from "lucide-react";

// Components
import Button from "@/components/ui/Button";
import SearchField from "@/components/ui/SearchField"; 
import APIKeysTable from "@/components/tables/APIKeysTable";
import FilterDropdown from "@/components/ui/Filter";

const APIKeysPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dummy data
  const [apiKeys, setApiKeys] = useState([
    { id: "1", name: "Production Key", key: "sk_live_abc123...xyz", status: "active", created: "2024-05-10", lastUsed: "2024-12-10", expiresIn: "45 days" },
    { id: "2", name: "Development Key", key: "sk_test_def456...uvw", status: "active", created: "2024-06-15", lastUsed: "2024-12-11", expiresIn: "72 days" },
  ]);

  const filterOptions = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "active" },
    { label: "Expired", value: "expired" },
    { label: "Revoked", value: "revoked" }
  ];

  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(search.toLowerCase()) || 
                          key.key.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || key.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-600">Security Layer</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">API Access Keys</h1>
          </div>
          
          {/* Button remains but functionality is removed as requested */}
          <div className="flex p-1.5 bg-white border border-slate-200 shadow-sm rounded-2xl items-center gap-1">
            <Button variant="primary" className="bg-emerald-600 hover:bg-emerald-700 text-white px-5">
              Generate Key
            </Button>
          </div>
        </div>

        {/* --- TABLE AREA --- */}
        <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-96">
              <SearchField value={search} onChange={setSearch} placeholder="Search keys..." />
            </div>
            <FilterDropdown value={statusFilter} onChange={setStatusFilter} options={filterOptions} />
          </div>
          <div className="p-6">
            <APIKeysTable keys={filteredKeys} onSelectKey={() => {}} onDeleteKey={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIKeysPage;