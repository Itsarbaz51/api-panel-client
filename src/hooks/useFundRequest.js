"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";

/* ================= CREATE ================= */

export const useCreateFundRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) =>
      apiClient("/fund-request", {
        method: "POST",
        body: payload,
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["fund-request"],
      }),
  });
};

/* ================= VERIFY ================= */

export const useVerifyFundRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) =>
      apiClient("/fund-request/verify", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["fund-request"],
      }),
  });
};

/* ================= STATUS ================= */

export const useCheckFundRequestStatus = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/fund-request/status", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      }),
  });
