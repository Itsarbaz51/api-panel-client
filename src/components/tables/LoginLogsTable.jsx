"use client";

import { Download } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function LoginLogsTable({
  logs,
  total,
  page,
  perPage,
  search,
  onSearch,
  onPageChange,
}) {
  const columns = [
    {
      key: "user",
      label: "User",

      render: (row) => (
        <div>
          <div className="font-medium">{row.user?.fullName}</div>
          <div className="text-xs text-slate-500">{row.user?.email}</div>
        </div>
      ),
    },

    {
      key: "roleType",
      label: "Role",

      render: (row) => row.roleType,
    },

    {
      key: "ipAddress",
      label: "IP",

      render: (row) => row.ipAddress,
    },

    {
      key: "domainName",
      label: "Domain",

      render: (row) => row.domainName,
    },

    {
      key: "location",
      label: "Location",

      render: (row) => row.location,
    },

    {
      key: "message",
      label: "Message",

      render: (row) => row.message,
    },

    {
      key: "createdAt",
      label: "Login Time",

      render: (row) => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <TableShell>
      <TableHeader
        title="Login Logs"
        subtitle={`${total} logs found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search IP, domain, location..."
        exportIcon={Download}
      />

      <TableBody columns={columns} data={logs} />

      <TablePagination
        page={page}
        setPage={onPageChange}
        total={total}
        perPage={perPage}
      />
    </TableShell>
  );
}
