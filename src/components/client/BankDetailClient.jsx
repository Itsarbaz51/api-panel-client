"use client";

import { useEffect, useState } from "react";
import { Landmark, CheckCircle, Star } from "lucide-react";

import Header from "@/components/ui/Header";
import QuickStats from "@/components/QuickStats";
import View from "@/components/ui/View";
import ConfirmDialog from "@/components/ConfirmDialog";

import BankDetailTable from "@/components/tables/BankDetailTable";

import {
  useGetAllBankDetails,
  useDeleteBankDetail,
  useUpdateBankDetail,
} from "@/hooks/useBankDetail";

export default function BankDetailClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [viewOpen, setViewOpen] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    item: null,
  });

  const [selectedBank, setSelectedBank] = useState(null);
  const [verifiedOpen, setVerifiedOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, status]);
  /* ================= BANK DETAILS ================= */

  const {
    data: response,
    refetch,
    isLoading,
    isFetching,
  } = useGetAllBankDetails({
    page: currentPage,
    limit,
    search: searchTerm,
    status,
  });

  const bankDetails = response?.data?.data || [];
  const total = response?.data?.total || 0;

  /* ================= STATS ================= */
  const primaryBanks = bankDetails.filter((x) => x.isPrimary).length;
  const savingsAccounts = bankDetails.filter(
    (x) => x.accountType === "SAVINGS",
  ).length;
  const currentAccounts = bankDetails.filter(
    (x) => x.accountType === "CURRENT",
  ).length;

  /* ================= MUTATIONS ================= */
  const deleteBankDetail = useDeleteBankDetail();
  const { mutate: updateBankDetail, isPending } = useUpdateBankDetail();

  /* ================= VIEW ================= */

  const handleView = (item) => {
    setViewItem(item);
    setViewOpen(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    try {
      await deleteBankDetail.mutateAsync(deleteDialog.item.id);

      refetch();

      setDeleteDialog({
        open: false,
        item: null,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerified = () => {
    if (!selectedBank) return;

    updateBankDetail(
      {
        id: selectedBank.id,
        payload: {
          status: "VERIFIED",
        },
      },
      {
        onSuccess: () => {
          setVerifiedOpen(false);
          setSelectedBank(null);
          refetch();
        },
      },
    );
  };

  const handleReject = () => {
    if (!selectedBank) return;

    if (!rejectReason.trim()) {
      return alert("Reject reason is required");
    }

    updateBankDetail(
      {
        id: selectedBank.id,
        payload: {
          status: "REJECTED",
          bankRejectionReason: rejectReason,
        },
      },
      {
        onSuccess: () => {
          setRejectOpen(false);
          setSelectedBank(null);
          setRejectReason("");
          refetch();
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      <Header title="Bank Details" subtitle="Manage User Bank Accounts" />

      <QuickStats
        stats={[
          {
            title: "Total Banks",
            value: total,
            icon: Landmark,
          },
          {
            title: "Primary",
            value: primaryBanks,
            icon: Star,
          },
          {
            title: "Savings",
            value: savingsAccounts,
            icon: CheckCircle,
          },
          {
            title: "Current",
            value: currentAccounts,
            icon: CheckCircle,
          },
        ]}
      />

      <BankDetailTable
        bankDetails={bankDetails}
        total={total}
        page={currentPage}
        perPage={limit}
        search={searchTerm}
        onSearch={setSearchTerm}
        status={status}
        setStatus={setStatus}
        onPageChange={setCurrentPage}
        onView={handleView}
        onDelete={(row) =>
          setDeleteDialog({
            open: true,
            item: row,
          })
        }
        onVerified={(row) => {
          setSelectedBank(row);
          setVerifiedOpen(true);
        }}
        onReject={(row) => {
          setSelectedBank(row);
          setRejectOpen(true);
        }}
        onRefresh={refetch}
        isLoading={isLoading || isFetching}
      />

      <View
        open={viewOpen}
        title="Bank Detail"
        data={viewItem}
        onClose={() => {
          setViewOpen(false);
          setViewItem(null);
        }}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        title="Delete Bank Detail"
        description="Are you sure you want to delete this bank detail?"
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteBankDetail.isPending}
        onConfirm={handleDelete}
        onClose={() =>
          setDeleteDialog({
            open: false,
            item: null,
          })
        }
      />
      <ConfirmDialog
        open={verifiedOpen}
        onClose={() => {
          setVerifiedOpen(false);
          setSelectedBank(null);
        }}
        onConfirm={handleVerified}
        title="Verify Bank"
        description="Are you sure you want to verify this bank account?"
        confirmText="Verify"
        variant="success"
        loading={isPending}
      />

      <ConfirmDialog
        open={rejectOpen}
        onClose={() => {
          setRejectOpen(false);
          setSelectedBank(null);
          setRejectReason("");
        }}
        onConfirm={handleReject}
        title="Reject Bank Account"
        description="Please provide the reason for rejecting this bank account."
        confirmText="Reject"
        variant="danger"
        loading={isPending}
        showReason
        reason={rejectReason}
        setReason={setRejectReason}
      />
    </div>
  );
}
