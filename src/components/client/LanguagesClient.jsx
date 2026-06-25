"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  Languages,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";

import Header from "../ui/Header";
import Button from "../ui/Button";
import QuickStats from "../QuickStats";
import View from "../ui/View";

import LanguagesTable from "../tables/LanguagesTable";
import LanguagesModal from "../modals/LanguagesModal";

import {
  useCreateLanguage,
  useDeleteLanguage,
  useGetAllLanguages,
  useGetLanguageById,
  useUpdateLanguage,
} from "@/hooks/useLanguages";

export default function LanguagesClient() {
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
  } = useGetAllLanguages({
    page: currentPage,
    limit,
    search: searchTerm,
  });

  /* ================= GET BY ID ================= */

  const {
    data: singleResponse,
    isLoading: singleLoading,
  } = useGetLanguageById(selectedId);

  /* ================= MUTATIONS ================= */

  const createLanguage =
    useCreateLanguage();

  const updateLanguage =
    useUpdateLanguage();

  const deleteLanguage =
    useDeleteLanguage();

  /* ================= TABLE DATA ================= */

  const languages =
    response?.data?.data ||
    response?.data ||
    [];

  const total =
    response?.data?.total ||
    response?.total ||
    languages.length;

  const active = languages.filter(
    (item) => item.isActive
  ).length;

  const inactive = languages.filter(
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
          await updateLanguage.mutateAsync({
            id: editingData.id,
            payload,
          });

        toast.success(
          response?.message ||
            "Language Updated Successfully"
        );
      } else {
        const response =
          await createLanguage.mutateAsync(
            payload
          );

        toast.success(
          response?.message ||
            "Language Created Successfully"
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

  /* ================= DELETE ================= */

  const handleDelete = async (
    row
  ) => {
    const confirmDelete =
      window.confirm(
        `Delete ${row.name}?`
      );

    if (!confirmDelete) return;

    try {
      const response =
        await deleteLanguage.mutateAsync(
          row.id
        );

      toast.success(
        response?.message ||
          "Language Deleted Successfully"
      );

      await refetch();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Delete failed"
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
        title="Languages"
        subtitle="Manage Languages"
        actions={
          <Button
            leftIcon={<Plus />}
            onClick={() => {
              setEditingData(null);
              setSelectedId(null);
              setOpenModal(true);
            }}
          >
            Add Language
          </Button>
        }
      />

      <QuickStats
        stats={[
          {
            title: "Total",
            value: total,
            icon: Languages,
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

      <LanguagesTable
        data={languages}
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
        onDelete={handleDelete}
        onView={(row) => {
          setSelectedId(row.id);
          setOpenView(true);
        }}
      />

      <LanguagesModal
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

      <View
        open={openView}
        title="Language Details"
        data={selectedData}
        onClose={() => {
          setOpenView(false);
          setSelectedId(null);
        }}
      />
    </div>
  );
}