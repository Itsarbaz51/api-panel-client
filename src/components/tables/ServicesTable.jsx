"use client";

import { Download } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function ServiceTable({
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
      key: "name",
      label: "Service Name",
    },

    {
      key: "code",
      label: "Code",
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
        title="Services"
        subtitle={`${total} services found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search services..."
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
