"use client";

import { useEffect, useState } from "react";
import { Settings, Plus, CheckCircle, XCircle } from "lucide-react";

import Header from "../ui/Header";
import Button from "../ui/Button";
import QuickStats from "../QuickStats";

import CommissionSettingTable from "../tables/CommissionSettingTable";
import CommissionSettingModal from "../modals/CommissionSettingModal";

import {
  useGetAllCommissionSettings,
  useCreateCommissionSetting,
  useUpdateCommissionSetting,
  useDeleteCommissionSetting,
} from "@/hooks/useCommissionSetting";

import { useGetAllUsers } from "@/hooks/useUser";
import { useGetAll } from "@/hooks/usePackage";
import { useGetAllServiceProviders } from "@/hooks/useServiceProvider";

import ConfirmDialog from "../ConfirmDialog";

export default function CommissionSettingClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  const [editingData, setEditingData] = useState(null);

  const [deleteItem, setDeleteItem] = useState(null);

  const limit = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const { data: commissionResponse, refetch } = useGetAllCommissionSettings({
    page: currentPage,
    limit,
    search: searchTerm,
  });

  const { data: usersData } = useGetAllUsers({
    page: 1,
    limit: 100,
    search: "",
  });

  const { data: packageData } = useGetAll({
    page: 1,
    limit: 100,
    search: "",
  });

  const { data: providerData } = useGetAllServiceProviders({
    page: 1,
    limit: 100,
    search: "",
  });

  const createCommission = useCreateCommissionSetting();

  const updateCommission = useUpdateCommissionSetting();

  const deleteCommission = useDeleteCommissionSetting();

  const settings = commissionResponse?.data || [];

  const total = commissionResponse?.total || 0;

  const activeCount = settings.filter((x) => x.isActive).length;

  const inactiveCount = settings.filter((x) => !x.isActive).length;

  const handleSubmit = async (payload) => {
    try {
      if (editingData?.id) {
        await updateCommission.mutateAsync({
          id: editingData.id,
          payload,
        });
      } else {
        await createCommission.mutateAsync(payload);
      }

      await refetch();

      setOpenModal(false);

      setEditingData(null);

      return {
        success: true,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
      };
    }
  };

  const handleEdit = (row) => {
    setEditingData(row);

    setOpenModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCommission.mutateAsync(deleteItem.id);

      await refetch();

      setDeleteItem(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <Header
        title="Commission Management"
        subtitle="Manage commission settings"
        actions={
          <Button
            leftIcon={<Plus />}
            onClick={() => {
              setEditingData(null);

              setOpenModal(true);
            }}
          >
            Add Commission
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

      <CommissionSettingTable
        data={settings}
        total={total}
        page={currentPage}
        perPage={limit}
        search={searchTerm}
        onSearch={setSearchTerm}
        onPageChange={setCurrentPage}
        onEdit={handleEdit}
        onDelete={(row) => setDeleteItem(row)}
      />

      <CommissionSettingModal
        open={openModal}
        initialData={editingData}
        users={usersData?.data || []}
        packages={packageData?.data || []}
        providers={providerData?.data || []}
        onSubmit={handleSubmit}
        onClose={() => {
          setOpenModal(false);

          setEditingData(null);
        }}
      />

      <ConfirmDialog
        open={!!deleteItem}
        title="Delete Commission"
        description="Are you sure you want to delete this commission setting?"
        variant="danger"
        onConfirm={handleDelete}
        onClose={() => setDeleteItem(null)}
      />
    </div>
  );
}
