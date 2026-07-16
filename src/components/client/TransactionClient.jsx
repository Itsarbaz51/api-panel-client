"use client";

import { useEffect, useState } from "react";
import { Clock, Activity, DollarSign, TrendingUp } from "lucide-react";

import Header from "../ui/Header";
import QuickStats from "@/components/QuickStats";
import TransactionsTable from "@/components/tables/TransactionsTable";

import {
  useGetAllTransactions,
  useCheckTransactionStatus,
} from "@/hooks/useTransaction";

import { useMyPermissions } from "@/hooks/usePermission";
export default function TransactionClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [activeTab, setActiveTab] = useState("PENDING");
  const [selectedService, setSelectedService] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");

  const limit = 10;

  const {
    data: transactionResponse,
    refetch,
    isLoading,
  } = useGetAllTransactions({
    page: currentPage,
    limit,
    search: searchTerm,
    status: activeTab,
    service: selectedService,
    date: dateFilter,
  });

  const {
    data: permissions,
    isLoading: isLoadingPermission,
    error,
  } = useMyPermissions();

  const checkStatus = useCheckTransactionStatus();
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab, selectedService, dateFilter]);
  const transactions = transactionResponse?.data?.data || [];

  const pagination = transactionResponse?.pagination || {};

  const stats = transactionResponse?.stats || {};
  const refreshTransactions = () => {
    refetch();
  };
  const handleCheckStatus = async (txn) => {
    await checkStatus.mutateAsync({
      transactionId: txn.id,
      serviceProviderMappingId: txn.serviceProviderMappingId,
    });

    refetch();
  };

  const categories = [
    {
      label: "All Services",
      value: "ALL",
    },
    ...(permissions?.data?.map((item) => ({
      label: item.serviceName,
      value: item.serviceCode,
    })) || []),
  ];

  return (
    <div className="space-y-8">
      <Header
        title="Transaction Management"
        subtitle="Monitor all transactions"
      />
      <QuickStats
        stats={[
          {
            title: "Pending",
            value: stats.pending || 0,
            icon: Clock,
            iconColor: "text-orange-600",
            bgColor: "bg-orange-100",
          },
          {
            title: "Success Today",
            value: stats.successToday || 0,
            icon: Activity,
            iconColor: "text-green-600",
            bgColor: "bg-green-100",
          },
          {
            title: "Total Volume",
            value: `₹${stats.totalVolume || 0}`,
            icon: DollarSign,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-100",
          },
          {
            title: "Commission",
            value: `₹${stats.totalCommission || 0}`,
            icon: TrendingUp,
            iconColor: "text-purple-600",
            bgColor: "bg-purple-100",
          },
        ]}
      />

      <TransactionsTable
        transactions={transactions}
        total={pagination.total || 0}
        page={currentPage}
        perPage={limit}
        loading={isLoading}
        search={searchTerm}
        onSearch={setSearchTerm}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        categories={categories}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        onPageChange={setCurrentPage}
        onRefresh={refreshTransactions}
        onCheckStatus={handleCheckStatus}
      />
    </div>
  );
}
