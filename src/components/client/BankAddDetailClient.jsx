"use client";

import { useEffect, useState } from "react";

import { Landmark, CheckCircle, Star, Plus } from "lucide-react";

import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import QuickStats from "@/components/QuickStats";
import View from "@/components/ui/View";
import ConfirmDialog from "@/components/ConfirmDialog";

import BankDetailTable from "@/components/tables/BankDetailTable";
import BankDetailModal from "@/components/modals/BankDetailModal";

import {
  useCreateBankDetail,
  useUpdateAddBankDetail,
  useDeleteBankDetail,
  useGetAllMyBankDetails,
} from "@/hooks/useBankDetail";

export default function BankAddDetailClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;

  const [openModal, setOpenModal] = useState(false);

  const [editingItem, setEditingItem] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);

  const [viewItem, setViewItem] = useState(null);

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    item: null,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  /* ================= BANK DETAILS ================= */

  const {
    data: response,
    refetch,
    isLoading,
  } = useGetAllMyBankDetails({
    page: currentPage,
    limit,
    search: searchTerm,
  });

  const bankDetails = response?.data?.data || [];

  const total = response?.data?.total || 0;

  /* ================= STATS ================= */

  const primaryBanks = bankDetails.filter((x) => x.isPrimary).length;

  const savingsAccounts = bankDetails.filter(
    (x) => x.accountType === "PERSONAL",
  ).length;

  const currentAccounts = bankDetails.filter(
    (x) => x.accountType === "BUSINESS",
  ).length;

  /* ================= MUTATIONS ================= */

  const createBankDetail = useCreateBankDetail();
  const updateBankDetail = useUpdateAddBankDetail();
  const deleteBankDetail = useDeleteBankDetail();

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (payload) => {
    console.log(payload);

    try {
      if (editingItem) {
        await updateBankDetail.mutateAsync({
          id: editingItem.id,
          payload,
        });
      } else {
        await createBankDetail.mutateAsync(payload);
      }

      refetch();

      setOpenModal(false);
      setEditingItem(null);
    } catch (err) {
      console.log(err);
    }
  };

  /* ================= VIEW ================= */

  const handleView = (item) => {
    setViewItem(item);
    setViewOpen(true);
  };

  /* ================= EDIT ================= */

  const handleEdit = (item) => {
    setEditingItem(item);
    setOpenModal(true);
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

  return (
    <div className="space-y-8">
      <Header
        title="Bank Details"
        subtitle="Manage User Bank Accounts"
        actions={
          <Button
            leftIcon={<Plus />}
            onClick={() => {
              setEditingItem(null);
              setOpenModal(true);
            }}
          >
            Add Bank
          </Button>
        }
      />

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
        onPageChange={setCurrentPage}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(row) =>
          setDeleteDialog({
            open: true,
            item: row,
          })
        }
      />

      <BankDetailModal
        open={openModal}
        loading={createBankDetail.isPending || updateBankDetail.isPending}
        initialData={editingItem}
        onSubmit={handleSubmit}
        onClose={() => {
          setOpenModal(false);
          setEditingItem(null);
        }}
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
    </div>
  );
}
