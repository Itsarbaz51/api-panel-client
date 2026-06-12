"use client";

import { useState } from "react";

import { Building2, Plus, CheckCircle, XCircle } from "lucide-react";

import Header from "../ui/Header";
import Button from "../ui/Button";
import QuickStats from "../QuickStats";

import ProviderTable from "../tables/ProviderTable";
import ProviderModal from "../modals/ProviderModal";

import {
  useGetAllProviders,
  useCreateProvider,
  useUpdateProvider,
  useDeleteProvider,
} from "@/hooks/useProvider";

import ConfirmDialog from "../ConfirmDialog";

export default function ProviderClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  const [editingData, setEditingData] = useState(null);

  const [deleteData, setDeleteData] = useState(null);

  const limit = 10;

  const { data: response, refetch } = useGetAllProviders({
    page: currentPage,
    limit,
    search: searchTerm,
  });

  const createProvider = useCreateProvider();

  const updateProvider = useUpdateProvider();

  const deleteProvider = useDeleteProvider();

  const providers = response?.data?.data || [];

  const total = response?.data?.total || 0;

  const active = providers.filter((x) => x.isActive).length;

  const inactive = providers.filter((x) => !x.isActive).length;

  const handleSubmit = async (payload) => {
    if (editingData?.id) {
      await updateProvider.mutateAsync({
        id: editingData?.id,
        payload,
      });
    } else {
      await createProvider.mutateAsync(payload);
    }

    await refetch();

    setOpenModal(false);

    setEditingData(null);
  };

  return (
    <div className="space-y-8">
      <Header
        title="Providers"
        subtitle="Manage Providers"
        actions={
          <Button leftIcon={<Plus />} onClick={() => setOpenModal(true)}>
            Add Provider
          </Button>
        }
      />

      <QuickStats
        stats={[
          {
            title: "Total",
            value: total,
            icon: Building2,
          },
          {
            title: "Active",
            value: active,
            icon: CheckCircle,
          },
          {
            title: "Inactive",
            value: inactive,
            icon: XCircle,
          },
        ]}
      />

      <ProviderTable
        data={providers}
        total={total}
        page={currentPage}
        perPage={limit}
        search={searchTerm}
        onSearch={setSearchTerm}
        onPageChange={setCurrentPage}
        onEdit={(row) => {
          setEditingData(row);
          setOpenModal(true);
        }}
        onDelete={(row) => setDeleteData(row)}
      />

      <ProviderModal
        open={openModal}
        initialData={editingData}
        onSubmit={handleSubmit}
        onClose={() => {
          setOpenModal(false);
          setEditingData(null);
        }}
      />

      <ConfirmDialog
        open={!!deleteData}
        title="Delete Provider"
        description="Are you sure you want to delete this provider?"
        confirmText="Delete"
        variant="danger"
        onConfirm={async () => {
          await deleteProvider.mutateAsync(deleteData?.id);

          await refetch();

          setDeleteData(null);
        }}
        onClose={() => setDeleteData(null)}
      />
    </div>
  );
}
