"use client";

import { Package, Download, Pencil, Trash2 } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function PackagesTable({
  packages,
  total,
  page,
  perPage,
  onPageChange,
  search,
  onSearch,
  onAddPackage,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      key: "srNo",
      label: "#",

      render: (row, index) => (
        <p className="font-medium">{(page - 1) * perPage + index + 1}</p>
      ),
    },

    {
      key: "name",
      label: "Name",

      render: (row) => <p className="font-medium">{row.name}</p>,
    },

    {
      key: "createdAt",
      label: "Created At",

      render: (row) => (
        <span>{new Date(row.createdAt).toLocaleDateString()}</span>
      ),
    },

    {
      key: "updatedAt",
      label: "Updated At",

      render: (row) => (
        <span>{new Date(row.updatedAt).toLocaleDateString()}</span>
      ),
    },

    {
      key: "action",
      label: "Action",

      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(row)}
            className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(row)}
            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 transition"
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
        title="All Packages"
        subtitle={`${total} packages found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search packages..."
        onAdd={onAddPackage}
        addLabel="Add Package"
        addIcon={Package}
        exportIcon={Download}
      />

      <TableBody columns={columns} data={packages} />

      <TablePagination
        page={page}
        setPage={onPageChange}
        total={total}
        perPage={perPage}
      />
    </TableShell>
  );
}
