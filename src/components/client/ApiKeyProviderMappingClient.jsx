"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Link2,
  ShieldCheck,
  Server,
  KeyRound,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  useGetApiKeyProviderMappings,
  useCreateApiKeyProviderMapping,
  useUpdateApiKeyProviderMapping,
  useDeleteApiKeyProviderMapping,
} from "@/hooks/useApiKeyProviderMapping";

import { useGetApiKeys } from "@/hooks/useApiKey";
import { useGetAllServices } from "@/hooks/useService";
import { useGetAllProviders } from "@/hooks/useProvider";

import {
  setMappings,
  addMapping,
  updateMapping,
  removeMapping,
} from "@/store/apiKeyProviderMappingSlice";

import ApiKeyProviderMappingModal from "../modals/ApiKeyProviderMappingModal";
import ApiKeyProviderMappingTable from "../tables/ApiKeyProviderMappingTable";

export default function ApiKeyProviderMappingClient() {
  const dispatch = useDispatch();

  const { mappings = [] } = useSelector(
    (state) => state.apiKeyProviderMapping || {}
  );

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingData, setEditingData] = useState(null);
  
  // State to hold fetched API Keys list
  const [apiKeysList, setApiKeysList] = useState([]);

  const getMappings = useGetApiKeyProviderMappings();
  const createMapping = useCreateApiKeyProviderMapping();
  const updateMappingApi = useUpdateApiKeyProviderMapping();
  const deleteMapping = useDeleteApiKeyProviderMapping();

  const getApiKeys = useGetApiKeys();
  const { data: servicesResponse } = useGetAllServices({
    page: 1,
    limit: 100,
    search: "",
  });
  const { data: providersResponse } = useGetAllProviders({
    page: 1,
    limit: 100,
    search: "",
  });

  const services = servicesResponse?.data?.data || [];
  const providers = providersResponse?.data?.data || [];

  useEffect(() => {
    loadData();
    loadApiKeys();
  }, []);

  const loadData = async () => {
    try {
      const response = await getMappings.mutateAsync();
      const mappingsData =
        response?.data?.data || response?.data || [];

      dispatch(setMappings(mappingsData));
    } catch (error) {
      console.log(error);
    }
  };

  const loadApiKeys = async () => {
    try {
      if (typeof getApiKeys?.mutateAsync === "function") {
        const response = await getApiKeys.mutateAsync();
        const keys = response?.data?.data || response?.data || [];
        setApiKeysList(keys);
      }
    } catch (error) {
      console.log("Error loading API keys:", error);
    }
  };

  const handleDelete = async (row) => {
    if (!confirm("Are you sure you want to delete this mapping?")) return;

    try {
      await deleteMapping.mutateAsync(row.id);
      dispatch(removeMapping(row.id));
      toast.success("Mapping deleted successfully");
      loadData();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete mapping"
      );
    }
  };

  const handleEdit = (row) => {
    setEditingData({
      id: row.id,
      apiKeyId: row.apiKeyId || row.apiKey?.id,
      serviceId: row.serviceId || row.service?.id,
      providerId: row.providerId || row.provider?.id,
      priority: row.priority,
      isActive: row.isActive,
    });
    setOpenModal(true);
  };

  const handleSubmit = async (payload) => {
    try {
      if (editingData?.id) {
        const response = await updateMappingApi.mutateAsync({
          id: editingData.id,
          payload,
        });

        if (response?.success === false) {
          throw new Error(response?.message || "Failed to update mapping");
        }

        dispatch(updateMapping(response?.data?.data || response?.data || response));
        toast.success(
          response?.message || "Mapping updated successfully"
        );
      } else {
        const response = await createMapping.mutateAsync(payload);

        if (response?.success === false) {
          throw new Error(response?.message || "Failed to create mapping");
        }

        dispatch(addMapping(response?.data?.data || response?.data || response));
        toast.success(
          response?.message || "Mapping created successfully"
        );
      }

      await loadData();
      setOpenModal(false);
      setEditingData(null);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save mapping"
      );
      throw error;
    }
  };

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            API Key Provider Mapping
          </h1>
          <p className="text-sm text-gray-500">
            Manage API Key Provider Mappings
          </p>
        </div>

        <button
          onClick={() => {
            setEditingData(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Mapping
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span>Total Mapping</span>
            <Link2 className="text-blue-600" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">
            {mappings.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span>Services</span>
            <Server className="text-green-600" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span>Providers</span>
            <ShieldCheck className="text-orange-600" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span>API Keys</span>
            <KeyRound className="text-purple-600" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">
            {apiKeysList.length}
          </h2>
        </div>
      </div>

      {/* Table */}
      <ApiKeyProviderMappingTable
        mappings={mappings}
        total={mappings.length}
        page={page}
        perPage={10}
        onPageChange={setPage}
        search={search}
        onSearch={setSearch}
        onAddMapping={() => {
          setEditingData(null);
          setOpenModal(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <ApiKeyProviderMappingModal
        open={openModal}
        initialData={editingData}
        apiKeys={apiKeysList}
        services={services}
        providers={providers}
        onClose={() => {
          setOpenModal(false);
          setEditingData(null);
        }}
        onSubmit={handleSubmit}
      />

    </div>
  );
}