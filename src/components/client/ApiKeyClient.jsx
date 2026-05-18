"use client";

import React, { useState } from "react";

import {
  KeyRound,
  ShieldCheck,
  Clock3,
  Ban,
} from "lucide-react";

// Components
import QuickStats from "@/components/QuickStats";
import Button from "@/components/ui/Button";
import APIKeysTable from "@/components/tables/APIKeysTable";
import { dummyUsers } from "../dummyData";

export default function ApiKeyClient() {

  // API KEYS STATE
  const [apiKeys, setApiKeys] = useState(dummyUsers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // FILTER
  const filteredKeys = apiKeys.filter((key) => {

    const matchesSearch =
      key.name.toLowerCase().includes(search.toLowerCase()) ||
      key.key.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      key.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // GENERATE KEY
  const handleGenerateKey = () => {

    const newKey = {
      id: Date.now().toString(),

      name: `API Key ${apiKeys.length + 1}`,

      key: `sk_live_${Math.random()
        .toString(36)
        .substring(2, 14)}`,

      status: "active",

      created: new Date()
        .toISOString()
        .split("T")[0],

      lastUsed: "Never",

      expiresIn: "90 days",
    };

    setApiKeys((prev) => [newKey, ...prev]);
  };

  // DELETE KEY
  const handleDeleteKey = (id) => {

    setApiKeys((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

          <div className="space-y-2">

            <div className="flex items-center gap-2">

              <div className="h-5 w-1.5 rounded-full bg-emerald-500" />

              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-600">
                Security Layer
              </span>

            </div>

            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              API Access Keys
            </h1>

          </div>

          {/* BUTTON */}
          <div className="flex p-1.5 bg-white border border-slate-200 shadow-sm rounded-2xl items-center gap-1">

            <Button
              variant="primary"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5"
              leftIcon={<KeyRound size={18} />}
              onClick={handleGenerateKey}
            >
              Generate Key
            </Button>

          </div>
        </div>

        {/* QUICK STATS */}
        <QuickStats
          stats={[
            {
              title: "Total Keys",
              value: apiKeys.length,
              icon: KeyRound,
            },
            {
              title: "Active Keys",
              value: apiKeys.filter(
                (k) => k.status === "active"
              ).length,
              icon: ShieldCheck,
            },
            {
              title: "Expired Keys",
              value: apiKeys.filter(
                (k) => k.status === "expired"
              ).length,
              icon: Clock3,
            },
            {
              title: "Revoked Keys",
              value: apiKeys.filter(
                (k) => k.status === "revoked"
              ).length,
              icon: Ban,
            },
          ]}
        />

        {/* TABLE AREA */}
        <div className="bg-white rounded-4xl border border-slate-200/60 shadow-xl overflow-hidden">

          <div className="">

            <APIKeysTable
              keys={filteredKeys}
              total={filteredKeys.length}
              page={1}
              perPage={10}
              onPageChange={() => {}}
              search={search}
              onSearch={setSearch}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onGenerateKey={handleGenerateKey}
              onDelete={handleDeleteKey}
            />

          </div>
        </div>
      </div>
    </div>
  );
}