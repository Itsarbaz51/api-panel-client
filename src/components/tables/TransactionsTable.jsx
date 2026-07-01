"use client";

import { Activity, Download, RefreshCw } from "lucide-react";

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
      key: "createdAt",
      label: "Date",

      render: (row) => new Date(row.createdAt).toLocaleString(),
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

  console.log(transactions);

  return (
    <TableShell>
      <TableHeader
        title="All Transactions"
        subtitle={`${total} Transactions Found`}
        search={search}
        setSearch={onSearch}
        searchPlaceholder="Search Transaction..."
        exportIcon={Download}
      >
        <div className="flex flex-wrap gap-3">
          {/* Status */}
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="rounded-lg border px-3 py-2"
          >
            <option value="PENDING">Pending</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
          </select>

          {/* Service */}
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="rounded-lg border px-3 py-2"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          {/* Date */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-lg border px-3 py-2"
          >
            <option value="ALL">All</option>
            <option value="TODAY">Today</option>
            <option value="YESTERDAY">Yesterday</option>
            <option value="LAST_7_DAYS">Last 7 Days</option>
            <option value="THIS_MONTH">This Month</option>
          </select>
        </div>
      </TableHeader>

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
