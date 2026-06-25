"use client";

import { Download } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function DocsConfigurationTable({
  data,
  total,
  page,
  perPage,
  search,
  onSearch,
  onPageChange,
  onEdit,
  onDelete,
  onView,
}) {
  const columns = [
    {
      key: "name",
      label: "API Name",
    },
    {
      key: "module",
      label: "Module",
    },
    {
      key: "method",
      label: "Method",

      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs ${
            row.method === "POST"
              ? "bg-green-100 text-green-700"
              : row.method === "GET"
              ? "bg-blue-100 text-blue-700"
              : row.method === "PUT"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.method}
        </span>
      ),
    },
    {
      key: "endpoint",
      label: "Endpoint",
    },
    {
      key: "status",
      label: "Status",

      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs ${
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

      render: (row) =>
        row.createdAt
          ? new Date(
              row.createdAt
            ).toLocaleDateString()
          : "-",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <TableShell>
      <TableHeader
        title="API References"
        subtitle={`${total} APIs found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search APIs..."
        exportIcon={Download}
      />

      <TableBody
        columns={columns}
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
        onView={onView}
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