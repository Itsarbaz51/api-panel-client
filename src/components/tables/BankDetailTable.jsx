"use client";

import {
  User,
  Building2,
  Landmark,
  Download,
} from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function BankDetailTable({
  bankDetails = [],
  total = 0,
  page = 1,
  perPage = 10,
  search,
  onSearch,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}) {
  const columns = [
    {
      key: "user",
      label: "User",

      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="font-medium">
              {row.user?.fullName}
            </p>

            <p className="text-xs text-muted-foreground">
              {row.user?.registrationNumber}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "accountHolder",
      label: "Account Holder",

      render: (row) => row.accountHolder,
    },

    {
      key: "accountNumber",
      label: "Account Number",

      render: (row) => row.accountNumber,
    },

    {
      key: "bank",

      label: "Bank",

      render: (row) => (
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />

          {row.bankName}
        </div>
      ),
    },

    {
      key: "ifsc",

      label: "IFSC",

      render: (row) => row.ifscCode,
    },

    {
      key: "type",

      label: "Account Type",

      render: (row) => (
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs">
          {row.accountType}
        </span>
      ),
    },

    {
      key: "primary",

      label: "Primary",

      render: (row) =>
        row.isPrimary ? (
          <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs">
            Yes
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs">
            No
          </span>
        ),
    },

    {
      key: "createdAt",

      label: "Created",

      render: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },

    {
      key: "actions",

      label: "Actions",
    },
  ];

  const extraActions = [
    {
      label: "View Bank Proof",

      icon: Landmark,

      onClick: (row) => {
        if (row.bankProofFile) {
          window.open(
            row.bankProofFile,
            "_blank"
          );
        }
      },
    },
  ];

  return (
    <TableShell>
      <TableHeader
        title="Bank Details"
        subtitle={`${total} Bank Accounts`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search bank..."
        exportIcon={Download}
      />

      <TableBody
        columns={columns}
        data={bankDetails}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
        onExtraActions={extraActions}
      />

      <TablePagination
        page={page}
        total={total}
        perPage={perPage}
        setPage={onPageChange}
      />
    </TableShell>
  );
}