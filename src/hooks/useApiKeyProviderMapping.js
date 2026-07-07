import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

// GET ALL
export const useGetApiKeyProviderMappings = () =>
  useMutation({
    mutationFn: async (params = "") =>
      apiClient(`/api-key-provider-mappings${params}`, {
        method: "GET",
      }),
  });

// GET ONE
export const useGetApiKeyProviderMappingById = () =>
  useMutation({
    mutationFn: async (id) =>
      apiClient(`/api-key-provider-mappings/${id}`, {
        method: "GET",
      }),
  });

// CREATE
export const useCreateApiKeyProviderMapping = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/api-key-provider-mappings", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });

// UPDATE
export const useUpdateApiKeyProviderMapping = () =>
  useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/api-key-provider-mappings/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
  });

// DELETE
export const useDeleteApiKeyProviderMapping = () =>
  useMutation({
    mutationFn: async (id) =>
      apiClient(`/api-key-provider-mappings/${id}`, {
        method: "DELETE",
      }),
  });