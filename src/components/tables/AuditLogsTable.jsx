"use client";

import { Download } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";
import JsonViewerModal from "../JsonViewerModal";
import { useState } from "react";

export default function AuditLogsTable({
  logs,
  total,
  page,
  perPage,
  search,
  onSearch,
  onPageChange,
}) {
  const [jsonModal, setJsonModal] = useState({
    open: false,
    title: "",
    data: null,
  });

  const openPayload = (data) => {
    setJsonModal({
      open: true,
      title: "Payload",
      data,
    });
  };

  const openMetadata = (data) => {
    setJsonModal({
      open: true,
      title: "Metadata",
      data,
    });
  };
  const columns = [
    {
      key: "user",
      label: "User",
      render: (row) => (
        <div>
          <div className="font-semibold text-slate-800">
            {row.user?.fullName || "Guest"}
          </div>

          <div className="text-xs text-slate-500">
            {row.user?.email || "No Email"}
          </div>
        </div>
      ),
    },

    {
      key: "activity",
      label: "Activity",
      render: (row) => (
        <div className="space-y-1">
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 text-xs rounded-lg bg-blue-100 text-blue-700">
              {row.module || "-"}
            </span>

            <span className="px-2 py-1 text-xs rounded-lg bg-purple-100 text-purple-700">
              {row.action}
            </span>

            <span
              className={`px-2 py-1 text-xs rounded-lg ${
                row.status === "SUCCESS"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {row.status}
            </span>
          </div>

          <p className="text-sm text-slate-700">{row.message}</p>
        </div>
      ),
    },

    {
      key: "request",
      label: "Request",
      render: (row) => (
        <div className="space-y-1 text-xs">
          <div>
            <span className="font-semibold">Method:</span> {row.method}
          </div>

          <div className="break-all text-slate-600">{row.endpoint}</div>

          <div>
            <span className="font-semibold">IP:</span> {row.ipAddress}
          </div>

          <div className="text-slate-500">{row.domainName}</div>
        </div>
      ),
    },

    {
      key: "payload",
      label: "Payload",

      render: (row) => (
        <button
          onClick={() => openPayload(row.newValues)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View Payload
        </button>
      ),
    },

    {
      key: "metadata",
      label: "Metadata",

      render: (row) => (
        <button
          onClick={() => openMetadata(row.metadata)}
          className=" hover:text-primary text-sm font-medium"
        >
          View Metadata
        </button>
      ),
    },

    {
      key: "createdAt",
      label: "Time",
      render: (row) => (
        <div className="text-xs whitespace-nowrap">
          {new Date(row.createdAt).toLocaleString()}
        </div>
      ),
    },
  ];

  return (
    <TableShell>
      <TableHeader
        title="Audit Logs"
        subtitle={`${total} logs found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search action, module, endpoint..."
        exportIcon={Download}
      />

      <TableBody columns={columns} data={logs} />

      <TablePagination
        page={page}
        setPage={onPageChange}
        total={total}
        perPage={perPage}
      />
      <JsonViewerModal
        open={jsonModal.open}
        title={jsonModal.title}
        data={jsonModal.data}
        onClose={() =>
          setJsonModal({
            open: false,
            title: "",
            data: null,
          })
        }
      />
    </TableShell>
  );
}
