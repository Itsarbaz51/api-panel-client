"use client";

import { Download } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function CommissionSettingTable({
  data,
  total,
  page,
  perPage,
  search,
  onSearch,
  onPageChange,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      key: "scope",
      label: "Scope",

      render: (row) => <span className="font-medium">{row.scope}</span>,
    },

    {
      key: "target",
      label: "Target",

      render: (row) => (
        <div>{row.targetUser?.fullName || row.package?.name || "-"}</div>
      ),
    },

    {
      key: "provider",
      label: "Provider",

      render: (row) => <div>{row.serviceProvider?.name || "-"}</div>,
    },

    {
      key: "mode",
      label: "Mode",

      render: (row) => <span>{row.mode}</span>,
    },

    {
      key: "type",
      label: "Type",

      render: (row) => <span>{row.type}</span>,
    },

    {
      key: "value",
      label: "Value",

      render: (row) => <span>{row.value}</span>,
    },

    {
      key: "range",
      label: "Amount Range",

      render: (row) => (
        <div>
          ₹{row.minAmount || 0}
          {" - "}₹{row.maxAmount || 0}
        </div>
      ),
    },

    {
      key: "tax",
      label: "Tax",

      render: (row) => (
        <div className="text-xs">
          GST:
          {row.applyGST ? `${row.gstPercent}%` : "No"}
          <br />
          TDS:
          {row.applyTDS ? `${row.tdsPercent}%` : "No"}
        </div>
      ),
    },

    {
      key: "status",
      label: "Status",

      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      key: "createdAt",
      label: "Created At",

      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },

    {
      key: "actions",

      label: "Actions",
    },
  ];

  return (
    <TableShell>
      <TableHeader
        title="Commission Settings"
        subtitle={`${total} records found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search commission..."
        exportIcon={Download}
      />

      <TableBody
        columns={columns}
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <TablePagination
        page={page}
        setPage={onPageChange}
        total={total}
        perPage={perPage}
      />
    </TableShell>
  );
}
