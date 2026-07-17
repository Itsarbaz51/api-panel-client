"use client";

import { User, Download, CheckCircle, XCircle } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function ProfileVerificationTable({
  users = [],
  total = 0,
  page = 1,
  perPage = 10,
  search,
  onSearch,
  onPageChange,
  onView,
  onEdit,
  onVerified,
  onReject,
  isLoading,
  onRefresh,
  status,
  setStatus,
}) {
  const columns = [
    {
      key: "registrationNumber",
      label: "Registration No.",
      render: (row) => row.registrationNumber,
    },

    {
      key: "user",
      label: "Applicant",
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <User size={18} />
          </div>

          <div>
            <p className="font-medium">{row.fullName}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },

    {
      key: "companyName",
      label: "Company",
      render: (row) => row.companyName || "-",
    },

    {
      key: "businessType",
      label: "Business Type",
      render: (row) => row.businessType,
    },

    {
      key: "kycType",
      label: "KYC Type",
      render: (row) => row.kycType,
    },

    {
      key: "phoneNumber",
      label: "Phone",
      render: (row) => row.phoneNumber,
    },

    {
      key: "status",
      label: "Status",
      render: (row) => {
        const color =
          row.status === "VERIFIED"
            ? "bg-green-100 text-green-700"
            : row.status === "REJECTED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700";

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      key: "rejectionReason",
      label: "Rejection Reason",
      render: (row) => row.rejectionReason || "-",
    },

    {
      key: "createdAt",
      label: "Submitted On",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },

    {
      key: "actions",
      label: "Actions",
    },
  ];

  const extraActions = [
    {
      label: "Verify",
      icon: CheckCircle,
      onClick: onVerified,
    },
    {
      label: "Reject",
      icon: XCircle,
      onClick: onReject,
    },
  ];

  return (
    <TableShell>
      <TableHeader
        title="Profile Verification"
        subtitle={`${total} KYC Requests`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search by registrationNumber, name, company..."
        exportIcon={Download}
        onRefresh={onRefresh}
        isLoading={isLoading}
        filters={[
          {
            value: status,
            onChange: setStatus,
            placeholder: "Status",
            options: [
              { label: "All", value: "" },
              { label: "Pending", value: "PENDING" },
              { label: "Verified", value: "VERIFIED" },
              { label: "Rejected", value: "REJECTED" },
            ],
          },
        ]}
      />

      <TableBody
        columns={columns}
        data={users}
        onView={onView}
        onEdit={onEdit}
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
