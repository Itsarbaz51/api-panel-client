"use client";

import { useState } from "react";

import Header from "../ui/Header";
import AuditLogsTable from "@/components/tables/AuditLogsTable";
import { useGetAllAuditLogs } from "@/hooks/useLogs";

export default function AuditLogsClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const { data, isLoading } = useGetAllAuditLogs({
    page,
    limit,
    search,
  });

  const logs = data?.data?.data || [];
  const total = data?.data?.total || 0;

  return (
    <div className="space-y-8">
      <Header title="Audit Logs" subtitle="Track all system activity" />

      <AuditLogsTable
        logs={logs}
        total={total}
        page={page}
        perPage={limit}
        search={search}
        onSearch={setSearch}
        onPageChange={setPage}
      />
    </div>
  );
}
