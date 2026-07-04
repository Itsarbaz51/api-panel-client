"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function ServiceProviderTable({
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
  const [selectedConfig, setSelectedConfig] = useState(null);

  const columns = [
    {
      key: "service",
      label: "Service",

      render: (row) => (
        <div>
          <div className="font-medium">{row.service?.name}</div>
          <div className="text-xs text-slate-500">{row.service?.code}</div>
        </div>
      ),
    },

    {
      key: "provider",
      label: "Provider",

      render: (row) => (
        <div>
          <div className="font-medium">{row.provider?.name}</div>
          <div className="text-xs text-slate-500">{row.provider?.type}</div>
        </div>
      ),
    },

    {
      key: "baseUrl",
      label: "Base URL",

      render: (row) => (
        <div className="max-w-[220px] truncate">{row.baseUrl}</div>
      ),
    },

    {
      key: "operator",
      label: "Operator",

      render: (row) => (
        <div>
          <div>{row.operator || "-"}</div>
          <div className="text-xs text-slate-500">
            {row.operatorCode || "-"}
          </div>
        </div>
      ),
    },

    {
      key: "pricing",
      label: "Pricing",

      render: (row) => (
        <div>
          <div>{row.mode}</div>

          <div className="text-xs text-slate-500">{row.pricingValueType}</div>
        </div>
      ),
    },

    {
      key: "providerCost",
      label: "Provider Cost",

      render: (row) => (
        <div>
          <div>₹{row.providerCost}</div>
        </div>
      ),
    },

    {
      key: "amount",
      label: "Amount Range",

      render: (row) => (
        <div>
          ₹{row.minAmount || 0}
          <br />₹{row.maxAmount || 0}
        </div>
      ),
    },

    {
      key: "config",
      label: "Config",

      render: (row) => (
        <button
          onClick={() => setSelectedConfig(row.config)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white"
        >
          <Eye size={16} />
          View
        </button>
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
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <>
      <TableShell>
        <TableHeader
          title="Service Providers"
          subtitle={`${total} records found`}
          search={search}
          setSearch={onSearch}
          searchPlaceholder="Search service provider..."
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

      {selectedConfig && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">Provider Config</h2>

              <button
                onClick={() => setSelectedConfig(null)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>

            <pre className="bg-slate-100 p-4 rounded-xl overflow-auto max-h-[70vh] text-xs">
              {JSON.stringify(selectedConfig, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
