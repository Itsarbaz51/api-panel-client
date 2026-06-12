"use client";

import { useEffect, useState } from "react";
import { Settings, Plus, CheckCircle, XCircle } from "lucide-react";

import Header from "../ui/Header";
import Button from "../ui/Button";
import QuickStats from "../QuickStats";

import ServiceTable from "../tables/ServicesTable";
import ServiceModal from "../modals/ServiceModal";

import {
  useGetAllServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "@/hooks/useService";

import ConfirmDialog from "../ConfirmDialog";

export default function ServiceClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  const [editingData, setEditingData] = useState(null);

  const [deleteData, setDeleteData] = useState(null);

  const limit = 10;

  const { data: response, refetch } = useGetAllServices({
    page: currentPage,
    limit,
    search: searchTerm,
  });

  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const services = response?.data?.data || [];
  const total = response?.total || 0;

  const active = services?.filter((x) => x.isActive).length;
  const inactive = services?.filter((x) => !x.isActive).length;

  const handleSubmit = async (payload) => {
    if (editingData?.id) {
      await updateService.mutateAsync({
        id: editingData?.id,
        payload,
      });
    } else {
      await createService.mutateAsync(payload);
    }

    await refetch();

    setOpenModal(false);

    setEditingData(null);
  };

  return (
    <div className="space-y-8">
      <Header
        title="Services"
        subtitle="Manage services"
        actions={
          <Button leftIcon={<Plus />} onClick={() => setOpenModal(true)}>
            Add Service
          </Button>
        }
      />

      <QuickStats
        stats={[
          {
            title: "Total",
            value: total,
            icon: Settings,
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

      <ServiceTable
        data={services}
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

      <ServiceModal
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
        title="Delete Service"
        description="Are you sure you want to delete this service?"
        variant="danger"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={async () => {
          await deleteService.mutateAsync(deleteData?.id);
          await refetch();
          setDeleteData(null);
        }}
        onClose={() => setDeleteData(null)}
      />
    </div>
  );
}
