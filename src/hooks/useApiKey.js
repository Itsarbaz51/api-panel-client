import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

// GET
export const useGetCredentials = () =>
  useMutation({
    mutationFn: async (userId) =>
      apiClient(`/api-key/${userId}/credentials`, {
        method: "GET",
      }),
  });

// GET ALL API KEYS
export const useGetApiKeys = () =>
  useMutation({
    mutationFn: async () =>
      apiClient("/api-key", {
        method: "GET",
      }),
  });

// CREATE FIRST TIME
export const useCreateApiKey = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/api-key", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });

// UPDATE IPS
export const useUpdateApiKey = () =>
  useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/api-key/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
  });
