"use client";

import {
  User,
  Landmark,
  Download,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";

import { useSelector } from "react-redux";
import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function FundRequestTable({
  requests = [],
  total = 0,
  page = 1,
  perPage = 10,
  search,
  onSearch,
  status,
  setStatus,
  onPageChange,
  onView,
  onApprove,
  onReject,
  onRefresh,
  isLoading,
}) {
  const user = useSelector((s) => s.auth.user);

  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const columns = [
    ...(isSuperAdmin
      ? [
          {
            key: "user",
            label: "User",
            render: (row) => (
              <div>
                <p className="font-medium">{row.user?.fullName}</p>

                <p className="text-xs text-muted-foreground">
                  {row.user?.registrationNumber}
                </p>
              </div>
            ),
          },
        ]
      : []),

    {
      key: "txnId",
      label: "Txn Id",
      render: (row) => row.txnId,
    },

    {
      key: "amount",
      label: "Amount",
      render: (row) => `₹ ${row.amount}`,
    },

    {
      key: "providerReference",
      label: "RRN",
      render: (row) => row.providerReference,
    },

    {
      key: "provider",
      label: "Provider",
      render: (row) => (
        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs">
          {row.providerCode}
        </span>
      ),
    },

    {
      key: "status",
      label: "Status",
      render: (row) => {
        const color =
          row.status === "SUCCESS"
            ? "bg-success/10 text-success"
            : row.status === "FAILED"
              ? "bg-error/10 text-error"
              : "bg-warning/10 text-warning";

        return (
          <span className={`px-3 py-1 rounded-full text-xs ${color}`}>
            {row.status}
          </span>
        );
      },
    },

    {
      key: "initiatedAt",
      label: "Initiated At",
      render: (row) => new Date(row.initiatedAt).toLocaleString(),
    },

    {
      key: "actions",
      label: "Actions",
    },
  ];

  const extraActions = [
    {
      label: "View Screenshot",

      icon: Landmark,

      onClick: (row) => {
        if (row.requestInit?.paymentImageUrl) {
          window.open(row.requestInit.paymentImageUrl, "_blank");
        }
      },
    },

    ...(isSuperAdmin
      ? [
          {
            label: "Approve",

            icon: CheckCircle,

            onClick: onApprove,
          },

          {
            label: "Reject",

            icon: XCircle,

            onClick: onReject,
          },
        ]
      : []),
  ];

  return (
    <TableShell>
      <TableHeader
        title="Fund Requests"
        subtitle={`${total} Requests`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search..."
        exportIcon={Download}
        onRefresh={onRefresh}
        isLoading={isLoading}
        filters={[
          {
            value: status,
            onChange: setStatus,
            placeholder: "Status",
            options: [
              {
                label: "All",
                value: "",
              },
              {
                label: "Pending",
                value: "PENDING",
              },
              {
                label: "Success",
                value: "SUCCESS",
              },
              {
                label: "Rejected",
                value: "FAILED",
              },
            ],
          },
        ]}
      />

      <TableBody
        columns={columns}
        data={requests}
        onView={onView}
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
