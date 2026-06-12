"use client";

import { useEffect, useState } from "react";
import { Package, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import PackagesTable from "@/components/tables/PackagesTable";
import PackageModal from "@/components/modals/PackageModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import QuickStats from "@/components/QuickStats";
import Button from "@/components/ui/Button";
import Header from "../ui/Header";
import PermissionModal from "@/components/modals/PermissionModal";
import { useGetAllServices } from "@/hooks/useService";

import { useCreate, useDelete, useGetAll, useUpdate } from "@/hooks/usePackage";

import {
  setPackages,
  addPackage,
  updatePackage,
  removePackage,
} from "@/store/packageSlice";

export default function PackagesClient() {
  /* ================= STATE ================= */

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const [errorDialog, setErrorDialog] = useState({
    open: false,
    message: "",
  });

  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    data: null,
  });

  const [permissionOpen, setPermissionOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [permissionDialog, setPermissionDialog] = useState({
    open: false,
    message: "",
  });

  const perPage = 10;

  /* ================= REDUX ================= */

  const dispatch = useDispatch();
  const packages = useSelector((state) => state.package.packages) || [];

  /* ================= API ================= */

  const getAllQuery = useGetAll({
    page,
    limit: perPage,
    search,
  });

  const { data: services } = useGetAllServices({
    page: 1,
    limit: 100,
    search: "",
  });

  const createMutation = useCreate();

  const updateMutation = useUpdate();

  const deleteMutation = useDelete();

  /* ================= SYNC ================= */

  useEffect(() => {
    if (getAllQuery.data?.data?.data) {
      dispatch(setPackages(getAllQuery.data.data.data));
    }
  }, [getAllQuery.data, dispatch]);

  /* ================= STATS ================= */

  const stats = [
    {
      title: "Total Packages",
      value: getAllQuery.data?.data?.pagination?.total || 0,
      icon: Package,
    },
  ];

  /* ================= ACTIONS ================= */

  const closeModal = () => {
    setOpenModal(false);
    setEditingPackage(null);
  };

  const handleAdd = () => {
    setEditingPackage(null);
    setOpenModal(true);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setOpenModal(true);
  };

  const handleDelete = (pkg) => {
    setDeleteDialog({
      open: true,
      data: pkg,
    });
  };

  const handlePermissions = (pkg) => {
    setSelectedPackage(pkg);

    setPermissionOpen(true);
  };

  const handlePermissionSuccess = async () => {
    await getAllQuery.refetch();

    setPermissionDialog({
      open: true,
      message: "Package Permissions Updated Successfully",
    });
  };

  /* ================= DELETE ================= */

  const confirmDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteDialog.data.id);
      dispatch(removePackage(deleteDialog.data.id));
      setDeleteDialog({
        open: false,
        data: null,
      });
    } catch (err) {
      setErrorDialog({
        open: true,
        message:
          err?.response?.data?.message || err?.message || "Delete failed",
      });
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (data) => {
    try {
      let res;

      if (editingPackage) {
        res = await updateMutation.mutateAsync({
          id: editingPackage.id,

          payload: data,
        });

        dispatch(updatePackage(res.data));
      } else {
        res = await createMutation.mutateAsync(data);

        dispatch(addPackage(res.data));
      }

      const message =
        res?.message ||
        res?.data?.message ||
        (editingPackage
          ? "Package updated successfully"
          : "Package created successfully");

      closeModal();
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Package action failed";
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <Header
        title="Packages Management"
        subtitle="Manage subscription packages, pricing and plan access."
        actions={
          <Button
            variant="primary"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            leftIcon={<Plus size={18} />}
            onClick={handleAdd}
          >
            Add Package
          </Button>
        }
      />

      {/* STATS */}

      <QuickStats stats={stats} />

      {/* TABLE */}

      <div className="bg-white rounded-4xl border border-slate-200/60 shadow-xl overflow-hidden">
        <PackagesTable
          packages={packages}
          total={getAllQuery.data?.data?.pagination?.total || 0}
          page={page}
          perPage={perPage}
          loading={getAllQuery.isLoading}
          onPageChange={setPage}
          search={search}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onEdit={handleEdit}
          onDelete={handleDelete}
          handlePermissions={handlePermissions}
        />
      </div>

      {/* MODAL */}

      <PackageModal
        open={openModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingPackage}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      {/* ERROR */}

      <ConfirmDialog
        open={errorDialog.open}
        onClose={() =>
          setErrorDialog({
            open: false,
            message: "",
          })
        }
        variant="danger"
        title="Action Failed"
        description={errorDialog.message}
        cancelText="Close"
      />

      {/* DELETE */}

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() =>
          setDeleteDialog({
            open: false,
            data: null,
          })
        }
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
        variant="danger"
        title="Delete Package"
        description="Are you sure you want to delete this package?"
        confirmText="Delete"
        cancelText="Cancel"
      />

      <PermissionModal
        open={permissionOpen}
        scope="PACKAGE"
        selectedItem={selectedPackage}
        services={services?.data?.data || []}
        onSuccess={handlePermissionSuccess}
        onClose={() => {
          setPermissionOpen(false);
          setSelectedPackage(null);
        }}
      />

      <ConfirmDialog
        open={permissionDialog.open}
        onClose={() =>
          setPermissionDialog({
            open: false,
            message: "",
          })
        }
        title="Success"
        variant="success"
        description={permissionDialog.message}
        cancelText="Close"
      />
    </div>
  );
}
