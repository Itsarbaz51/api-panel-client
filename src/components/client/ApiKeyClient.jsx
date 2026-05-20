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
import Header from "../ui/Header";

export default function ApiKeyClient() {
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
      created: new Date().toISOString().split("T")[0],
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
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <Header
          title="API Access Keys"
          subtitle="Manage, generate and monitor secure API keys for your platform."
          actions={
            <Button
              variant="primary"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5"
              leftIcon={<KeyRound size={18} />}
              onClick={handleGenerateKey}
            >
              Generate Key
            </Button>
          }
        />

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

        {/* TABLE */}
        <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-xl overflow-hidden mt-8">
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
  );
}