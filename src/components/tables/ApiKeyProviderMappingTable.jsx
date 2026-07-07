"use client";

import {
  Link2,
  Download,
  Pencil,
  Trash2,
  ShieldCheck,
} from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function ApiKeyProviderMappingTable({
  mappings = [],
  total = 0,
  page = 1,
  perPage = 10,
  onPageChange,
  search,
  onSearch,
  onAddMapping,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      key: "srNo",
      label: "#",
      render: (_, index) => (
        <p className="font-medium">
          {(page - 1) * perPage + index + 1}
        </p>
      ),
    },

    {
      key: "apiKey",
      label: "API Key",
      render: (row) => {
        const apiKeyName =
          row.apiKey?.name || row.apiKey?.apiKey || row.apiKey?.id || "-";
        const apiKeyUser = row.apiKey?.user?.fullName || row.apiKey?.user?.name || "";

        return (
          <div>
            <p className="font-medium text-slate-800">{apiKeyName}</p>
            <p className="text-xs text-slate-500">{apiKeyUser}</p>
          </div>
        );
      },
    },
    {
      key: "service",
      label: "Service",
      render: (row) => (
        <span className="font-medium">
          {row.service?.name || "-"}
        </span>
      ),
    },

    {
      key: "provider",
      label: "Provider",
      render: (row) => (
        <span className="font-medium">
          {row.provider?.name || "-"}
        </span>
      ),
    },

    {
      key: "priority",
      label: "Priority",
      render: (row) => (
        <span className="font-medium">
          {row.priority}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (row) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            row.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      key: "createdAt",
      label: "Created At",
      render: (row) => (
        <span>
          {row.createdAt
            ? new Date(row.createdAt).toLocaleDateString()
            : "-"}
        </span>
      ),
    },

    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-lg bg-emerald-50 p-2 text-emerald-600 transition hover:bg-emerald-100"
          >
            <ShieldCheck size={16} />
          </button>

          <button
            type="button"
            onClick={() => onEdit && onEdit(row)}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete && onDelete(row)}
            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <TableShell>
      <TableHeader
        title="API Key Provider Mapping"
        subtitle={`${total} Mapping Found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search Mapping..."
        onAdd={onAddMapping}
        addLabel="Create Mapping"
        addIcon={Link2}
        exportIcon={Download}
      />

      <TableBody columns={columns} data={mappings} />

      <TablePagination
        page={page}
        setPage={onPageChange}
        total={total}
        perPage={perPage}
      />
    </TableShell>
  );
}