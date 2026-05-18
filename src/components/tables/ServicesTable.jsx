"use client";

import {
  Layers,
  Download,
} from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

const columns = [
  {
    key: "name",
    label: "Service",
    render: (row) => (
      <div className="flex items-center gap-3">

        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Layers className="h-5 w-5 text-primary" />
        </div>

        <div>
          <p className="font-medium">
            {row.name}
          </p>

          <p className="text-xs text-muted-foreground">
            System Module
          </p>
        </div>

      </div>
    ),
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
        className={`px-2 py-1 rounded-full text-xs font-medium border ${
          row.status === "ACTIVE"
            ? "bg-success/10 text-success border-success/20"
            : "bg-destructive/10 text-destructive border-destructive/20"
        }`}
      >
        {row.status}
      </span>
    ),
  },

  {
    key: "actions",
    label: "Actions",
  },
];

export default function ServicesTable({
  services,
  total,
  page,
  perPage,
  onPageChange,
  search,
  onSearch,
  onAddService,
  onEdit,
  onDelete,
}) {
  return (
    <TableShell>

      <TableHeader
        title="All Services"
        subtitle={`${total} services found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search services..."
        onAdd={onAddService}
        addLabel="Add Service"
        addIcon={Layers}
        onExport={() => console.log("Export")}
        exportIcon={Download}
      />

      <TableBody
        columns={columns}
        data={services}
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