"use client";

import { User, Download, Key, Shield } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function UsersTable({
  users,
  total,
  page,
  perPage,
  search,
  onSearch,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  onViewPassword,
  handleViewApiKey,
  handlePermissions,
}) {
  const columns = [
    {
      key: "registrationNumber",
      label: "Registration Number",

      render: (row) => (
        <div className="flex gap-3">
          <div>{row.registrationNumber}</div>
        </div>
      ),
    },
    {
      key: "user",
      label: "User",

      render: (row) => (
        <div className="flex gap-3">
          {row.profileImage ? null : (
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex justify-center items-center">
              <User />
            </div>
          )}

          <div>
            <div>{row.fullName}</div>

            <div className="text-xs">{row.email}</div>
          </div>
        </div>
      ),
    },

    {
      key: "companyName",

      label: "Company Name",

      render: (row) => <div>{row.companyName}</div>,
    },

    {
      key: "credential",

      label: "Credential",

      render: (row) => (
        <button
          onClick={() => onViewPassword(row)}
          className="px-3 py-2 rounded-lg bg-green-600 text-white"
        >
          View Credential
        </button>
      ),
    },

    {
      key: "status",

      label: "Status",

      render: (row) => <span>{row.status}</span>,
    },
    {
      key: "lastLogin",

      label: "Last Login",

      render: (row) => new Date(row.lastLoginAt).toLocaleDateString(),
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
  const extraActions = [
    {
      label: "API Key",
      onClick: handleViewApiKey,
      icon: Key,
    },
    {
      label: "Permissions",
      onClick: handlePermissions,
      icon: Shield,
    },
  ];
  return (
    <TableShell>
      <TableHeader
        title="All Users"
        subtitle={`${total} users found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search users..."
        exportIcon={Download}
      />

      <TableBody
        columns={columns}
        data={users}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onExtraActions={extraActions}
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
