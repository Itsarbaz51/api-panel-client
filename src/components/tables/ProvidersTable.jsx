"use client";

import React, { useMemo, useState } from "react";

import {
  Activity,
  Clock,
  Download,
  FileText,
  RotateCw,
  Server,
  ShieldAlert,
  Terminal,
} from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

/* ================= MOCK DATA ================= */

const MOCK_TRAFFIC_LOGS = [
  {
    id: "1",
    timestamp: "2026-05-16 12:04:22",
    method: "GET",
    path: "/api/v1/users",
    status: 200,
    latency: "45ms",
    latencyVal: 45,
    ip: "192.168.1.1",
  },

  {
    id: "2",
    timestamp: "2026-05-16 12:05:01",
    method: "POST",
    path: "/api/v1/auth/login",
    status: 201,
    latency: "120ms",
    latencyVal: 120,
    ip: "192.168.1.50",
  },

  {
    id: "3",
    timestamp: "2026-05-16 12:06:15",
    method: "GET",
    path: "/api/v1/analytics",
    status: 500,
    latency: "310ms",
    latencyVal: 310,
    ip: "172.16.254.1",
  },

  {
    id: "4",
    timestamp: "2026-05-16 12:07:33",
    method: "PUT",
    path: "/api/v1/settings",
    status: 400,
    latency: "60ms",
    latencyVal: 60,
    ip: "192.168.1.15",
  },

  {
    id: "5",
    timestamp: "2026-05-16 12:08:44",
    method: "DELETE",
    path: "/api/v1/posts/99",
    status: 204,
    latency: "85ms",
    latencyVal: 85,
    ip: "192.168.1.1",
  },
];

/* ================= HELPERS ================= */

const getMethodStyles = (method) => {
  switch (method) {
    case "GET":
      return "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20";

    case "POST":
      return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";

    case "PUT":
      return "bg-amber-500/10 text-amber-500 border border-amber-500/20";

    case "DELETE":
      return "bg-red-500/10 text-red-500 border border-red-500/20";

    default:
      return "bg-muted text-foreground border border-border";
  }
};

const getStatusStyles = (status) => {
  if (status >= 200 && status < 300) {
    return "bg-success/10 text-success border border-success/20";
  }

  if (status >= 400) {
    return "bg-destructive/10 text-destructive border border-destructive/20";
  }

  return "bg-warning/10 text-warning border border-warning/20";
};

/* ================= TABLE COLUMNS ================= */

const columns = [
  {
    key: "timestamp",
    label: "Timestamp",

    render: (row) => (
      <div>
        <p className="font-medium text-sm">
          {row.timestamp}
        </p>

        <p className="text-xs text-muted-foreground">
          Request Time
        </p>
      </div>
    ),
  },

  {
    key: "method",
    label: "Method",

    render: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${getMethodStyles(
          row.method
        )}`}
      >
        {row.method}
      </span>
    ),
  },

  {
    key: "path",
    label: "Endpoint",

    render: (row) => (
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-primary" />

        <div>
          <p className="font-mono text-sm font-medium">
            {row.path}
          </p>

          <p className="text-xs text-muted-foreground">
            API Endpoint
          </p>
        </div>
      </div>
    ),
  },

  {
    key: "status",
    label: "Status",

    render: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(
          row.status
        )}`}
      >
        {row.status}
      </span>
    ),
  },

  {
    key: "latency",
    label: "Latency",

    render: (row) => (
      <div>
        <p className="font-semibold">
          {row.latency}
        </p>

        <p className="text-xs text-muted-foreground">
          Response Time
        </p>
      </div>
    ),
  },

  {
    key: "ip",
    label: "IP Address",

    render: (row) => (
      <div>
        <p className="font-mono text-sm">
          {row.ip}
        </p>

        <p className="text-xs text-muted-foreground">
          Client IP
        </p>
      </div>
    ),
  },
];

/* ================= COMPONENT ================= */

export default function LogsTrafficClient() {
  const [activeTab, setActiveTab] = useState("LOGS");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const perPage = 5;

  /* ================= FILTER ================= */

  const filteredLogs = useMemo(() => {
    return MOCK_TRAFFIC_LOGS.filter((log) => {
      return (
        log.path
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        log.ip.includes(search)
      );
    });
  }, [search]);

  /* ================= PAGINATION ================= */

  const paginatedLogs = useMemo(() => {
    const start = (page - 1) * perPage;

    return filteredLogs.slice(
      start,
      start + perPage
    );
  }, [filteredLogs, page]);

  /* ================= STATS ================= */

  const stats = useMemo(() => {
    const total = MOCK_TRAFFIC_LOGS.length;

    const errors =
      MOCK_TRAFFIC_LOGS.filter(
        (l) => l.status >= 400
      ).length;

    const avgLatency = Math.round(
      MOCK_TRAFFIC_LOGS.reduce(
        (acc, curr) =>
          acc + curr.latencyVal,
        0
      ) / total
    );

    return {
      total,
      errors,
      avgLatency,
    };
  }, []);

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold">
            Network Monitor
          </h1>

          <p className="text-muted-foreground mt-1">
            Monitor real-time API traffic
            and request logs.
          </p>
        </div>
      </div>

      {/* ================= LOGS TAB ================= */}

      {activeTab === "LOGS" ? (
        <TableShell>

          <TableHeader
            title="All Logs"
            subtitle={`${filteredLogs.length} logs found`}
            search={search}
            setSearch={setSearch}
            searchPlaceholder="Search logs..."
            addLabel="Refresh"
            addIcon={RotateCw}
            onAdd={() =>
              console.log("Refresh")
            }
            onExport={() =>
              console.log("Export")
            }
            exportIcon={Download}
          />

          <TableBody
            columns={columns}
            data={paginatedLogs}
          />

          <TablePagination
            page={page}
            setPage={setPage}
            total={filteredLogs.length}
            perPage={perPage}
          />

        </TableShell>
      ) : (
        /* ================= TRAFFIC TAB ================= */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">

              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Server className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total Requests
                </p>

                <h2 className="text-2xl font-bold">
                  {stats.total}
                </h2>
              </div>

            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">

              <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <ShieldAlert className="h-6 w-6 text-destructive" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Failed Requests
                </p>

                <h2 className="text-2xl font-bold">
                  {stats.errors}
                </h2>
              </div>

            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">

              <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Avg Latency
                </p>

                <h2 className="text-2xl font-bold">
                  {stats.avgLatency}ms
                </h2>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}