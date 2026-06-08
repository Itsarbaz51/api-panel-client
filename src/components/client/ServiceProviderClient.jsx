"use client";

import { useState } from "react";
import {
  Network,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";

import Header from "../ui/Header";
import Button from "../ui/Button";
import QuickStats from "../QuickStats";

import ServiceProviderTable from "../tables/ServiceProviderTable";
import ServiceProviderModal from "../modals/ServiceProviderModal";

import {
  useGetAllServiceProviders,
  useCreateServiceProvider,
  useUpdateServiceProvider,
  useDeleteServiceProvider,
} from "@/hooks/useServiceProvider";

import ConfirmDialog from "../ConfirmDialog";

export default function ServiceProviderClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  const [editingData, setEditingData] = useState(null);

  const [deleteData, setDeleteData] = useState(null);

  const [dialog, setDialog] = useState({
    open: false,
    message: "",
  });

  const limit = 10;

  const { data: response, refetch } =
    useGetAllServiceProviders({
      page: currentPage,
      limit,
      search: searchTerm,
    });

  const createServiceProvider =
    useCreateServiceProvider();

  const updateServiceProvider =
    useUpdateServiceProvider();

  const deleteServiceProvider =
    useDeleteServiceProvider();

  const serviceProviders =
    response?.data?.data || [];

  const total =
    response?.data?.total || 0;

  const activeCount =
    serviceProviders.filter(
      (item) => item.isActive,
    ).length;

  const inactiveCount =
    serviceProviders.filter(
      (item) => !item.isActive,
    ).length;

  const handleSubmit = async (
    payload,
  ) => {
    try {
      if (editingData?.id) {
        await updateServiceProvider.mutateAsync({
          id: editingData.id,
          payload,
        });

        setDialog({
          open: true,
          message:
            "Service Provider Updated Successfully",
        });
      } else {
        await createServiceProvider.mutateAsync(
          payload,
        );

        setDialog({
          open: true,
          message:
            "Service Provider Created Successfully",
        });
      }

      await refetch();

      setOpenModal(false);

      setEditingData(null);

      return {
        success: true,
      };
    } catch (err) {
      const validationErrors =
        err?.response?.data?.errors;

      if (
        Array.isArray(validationErrors) &&
        validationErrors.length
      ) {
        setDialog({
          open: true,
          message: validationErrors
            .map(
              (e) =>
                `• ${e.field}: ${e.message}`,
            )
            .join("\n"),
        });
      } else {
        setDialog({
          open: true,
          message:
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong",
        });
      }

      return {
        success: false,
      };
    }
  };

  const handleDelete = async () => {
    try {
      await deleteServiceProvider.mutateAsync(
        deleteData.id,
      );

      await refetch();

      setDeleteData(null);

      setDialog({
        open: true,
        message:
          "Service Provider Deleted Successfully",
      });
    } catch (err) {
      setDialog({
        open: true,
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Delete Failed",
      });
    }
  };

  return (
    <div className="space-y-8">
      <Header
        title="Service Providers"
        subtitle="Manage service provider mappings"
        actions={
          <Button
            leftIcon={<Plus />}
            onClick={() => {
              setEditingData(null);
              setOpenModal(true);
            }}
          >
            Add Mapping
          </Button>
        }
      />

      <QuickStats
        stats={[
          {
            title: "Total Mappings",
            value: total,
            icon: Network,
          },

          {
            title: "Active",
            value: activeCount,
            icon: CheckCircle,
          },

          {
            title: "Inactive",
            value: inactiveCount,
            icon: XCircle,
          },
        ]}
      />

      <ServiceProviderTable
        data={serviceProviders}
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
        onDelete={(row) =>
          setDeleteData(row)
        }
      />

      <ServiceProviderModal
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
        title="Delete Service Provider"
        description="Are you sure you want to delete this mapping?"
        confirmText="Delete"
        variant="danger"
        loading={
          deleteServiceProvider.isPending
        }
        onConfirm={handleDelete}
        onClose={() =>
          setDeleteData(null)
        }
      />

      <ConfirmDialog
        open={dialog.open}
        title="Notification"
        description={dialog.message}
        cancelText="Close"
        variant="info"
        onClose={() =>
          setDialog({
            open: false,
            message: "",
          })
        }
      />
    </div>
  );
}