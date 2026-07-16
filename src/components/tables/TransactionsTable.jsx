"use client";

import { Activity, Download, RefreshCcw, RefreshCw } from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

export default function TransactionsTable({
  transactions = [],
  total = 0,
  page,
  perPage,

  search,
  onSearch,

  activeTab,
  setActiveTab,

  selectedService,
  setSelectedService,

  categories = [],

  dateFilter,
  setDateFilter,

  loading,

  onRefresh,
  onCheckStatus,

  onPageChange,
}) {
  const columns = [
    {
      key: "txnId",
      label: "Txn Id",

      render: (row) => <div className="font-medium">{row.txnId}</div>,
    },

    {
      key: "service",
      label: "Service",

      render: (row) => (
        <div>
          <div className="font-medium">{row.serviceProvider.service?.name}</div>

          <div className="text-xs text-gray-500">
            {row.serviceProvider.provider?.name}
          </div>
        </div>
      ),
    },

    {
      key: "user",
      label: "User",

      render: (row) => (
        <div>
          <div>{row.user?.fullName}</div>

          <div className="text-xs">{row.user?.registrationNumber}</div>
        </div>
      ),
    },

    {
      key: "amount",
      label: "Amount",

      render: (row) => <span className="font-semibold">₹ {row.amount}</span>,
    },

    {
      key: "status",
      label: "Status",

      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            row.status === "SUCCESS"
              ? "bg-green-100 text-green-700"
              : row.status === "FAILED"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      key: "initiatedAt",
      label: "Initiated Date",

      render: (row) =>
        row.initiatedAt ? new Date(row.initiatedAt).toLocaleString() : "-",
    },
    {
      key: "processedAt",
      label: "Processed Date",

      render: (row) =>
        row.processedAt ? new Date(row.processedAt).toLocaleString() : "-",
    },
    {
      key: "completedAt",
      label: "Completed Date",

      render: (row) =>
        row.completedAt ? new Date(row.completedAt).toLocaleString() : "-",
    },

    {
      key: "actions",
      label: "Actions",
    },
  ];

  const extraActions = [
    {
      label: "Check Status",
      icon: RefreshCw,

      onClick: onCheckStatus,
    },

    {
      label: "Refresh",
      icon: Activity,

      onClick: onRefresh,
    },
  ];

  return (
    <TableShell>
      <TableHeader
        title="All Transactions"
        subtitle={`${total} Transactions Found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search Transaction..."
        exportIcon={Download}
        refreshIcon={RefreshCcw}
        onRefresh={onRefresh}
        isLoading={loading}
        filters={[
          {
            value: activeTab,
            onChange: setActiveTab,
            placeholder: "Status",
            options: [
              { label: "Pending", value: "PENDING" },
              { label: "Success", value: "SUCCESS" },
              { label: "Failed", value: "FAILED" },
            ],
          },
          {
            value: selectedService,
            onChange: setSelectedService,
            placeholder: "Service",
            options: categories,
          },
          {
            value: dateFilter,
            onChange: setDateFilter,
            placeholder: "Date",
            options: [
              { label: "All", value: "ALL" },
              { label: "Today", value: "TODAY" },
              { label: "Yesterday", value: "YESTERDAY" },
              { label: "Last 7 Days", value: "LAST_7_DAYS" },
              { label: "This Month", value: "THIS_MONTH" },
            ],
          },
        ]}
      />

      <TableBody
        columns={columns}
        data={transactions}
        loading={loading}
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
