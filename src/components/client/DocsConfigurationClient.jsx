"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  FileText,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";

import Header from "../ui/Header";
import Button from "../ui/Button";
import QuickStats from "../QuickStats";
import View from "../ui/View";

import DocsConfigurationTable from "../tables/DocsConfigurationTable";
import DocsConfigurationModal from "../modals/DocsConfigurationModal";

import {
  useCreateDocsConfiguration,
  useGetAllDocsConfiguration,
  useGetDocsConfigurationById,
  useUpdateDocsConfiguration,
} from "@/hooks/useDocsConfiguration";

export default function DocsConfigurationClient() {
  const [searchTerm, setSearchTerm] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [openModal, setOpenModal] =
    useState(false);

  const [openView, setOpenView] =
    useState(false);

  const [editingData, setEditingData] =
    useState(null);

  const [selectedId, setSelectedId] =
    useState(null);

  const limit = 10;

  /* ================= GET ALL ================= */

  const {
    data: response,
    refetch,
    isLoading,
  } = useGetAllDocsConfiguration({
    page: currentPage,
    limit,
    search: searchTerm,
  });

  /* ================= GET BY ID ================= */

  const {
    data: singleResponse,
    isLoading: singleLoading,
  } = useGetDocsConfigurationById(
    selectedId
  );

  /* ================= MUTATIONS ================= */

  const createDocsConfiguration =
    useCreateDocsConfiguration();

  const updateDocsConfiguration =
    useUpdateDocsConfiguration();

  /* ================= TABLE DATA ================= */

  const docs =
    response?.data?.data ||
    response?.data ||
    [];

  const total =
    response?.data?.total ||
    response?.total ||
    docs.length;

  const active = docs.filter(
    (item) => item.isActive
  ).length;

  const inactive = docs.filter(
    (item) => !item.isActive
  ).length;

  /* ================= VIEW DATA ================= */

  const selectedData =
    singleResponse?.data?.data ||
    singleResponse?.data ||
    null;

  /* ================= SUBMIT ================= */

  const handleSubmit = async (
    payload
  ) => {
    try {
      if (editingData?.id) {
        const response =
          await updateDocsConfiguration.mutateAsync(
            {
              id: editingData.id,
              payload,
            }
          );

        toast.success(
          response?.message ||
            "API Reference Updated Successfully"
        );
      } else {
        const response =
          await createDocsConfiguration.mutateAsync(
            payload
          );

        toast.success(
          response?.message ||
            "API Reference Created Successfully"
        );
      }

      await refetch();

      setOpenModal(false);
      setEditingData(null);
      setSelectedId(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  };

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Header
        title="Docs Configuration"
        subtitle="Manage API References"
        actions={
          <Button
            leftIcon={<Plus />}
            onClick={() => {
              setEditingData(null);
              setSelectedId(null);
              setOpenModal(true);
            }}
          >
            Add API
          </Button>
        }
      />

      <QuickStats
        stats={[
          {
            title: "Total",
            value: total,
            icon: FileText,
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

      <DocsConfigurationTable
        data={docs}
        total={total}
        page={currentPage}
        perPage={limit}
        search={searchTerm}
        onSearch={setSearchTerm}
        onPageChange={setCurrentPage}
        onEdit={(row) => {
          setEditingData(row);
          setSelectedId(row.id);
          setOpenModal(true);
        }}
        onView={(row) => {
          setSelectedId(row.id);
          setOpenView(true);
        }}
      />

      {/* EDIT / CREATE MODAL */}

      <DocsConfigurationModal
        open={openModal}
        loading={singleLoading}
        initialData={
          selectedId
            ? selectedData
            : editingData
        }
        onClose={() => {
          setOpenModal(false);
          setEditingData(null);
          setSelectedId(null);
        }}
        onSubmit={handleSubmit}
      />

      {/* VIEW MODAL */}

      <View
        open={openView}
        title="API Reference Details"
        data={selectedData}
        onClose={() => {
          setOpenView(false);
          setSelectedId(null);
        }}
      />
    </div>
  );
}