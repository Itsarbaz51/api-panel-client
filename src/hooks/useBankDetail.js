"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";

/* ================= CREATE ================= */

export const useCreateBankDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) =>
      apiClient("/bank", {
        method: "POST",
        body: payload,
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["bank"],
      }),
  });
};

/* ================= GET ALL ================= */

export const useGetAllMyBankDetails = ({
  page = 1,
  limit = 10,
  search = "",
  userId = "",
  status = "",
}) =>
  useQuery({
    queryKey: ["bank", page, limit, search, userId, status],

    queryFn: async () =>
      apiClient(
        `/bank/my?page=${page}&limit=${limit}&search=${search}&status=${status}`,
        {
          method: "GET",
        },
      ),

    placeholderData: keepPreviousData,

    retry: false,
  });

/* ================= GET ALL ================= */

export const useGetAllBankDetails = ({
  page = 1,
  limit = 10,
  search = "",
  userId = "",
  status = "",
}) =>
  useQuery({
    queryKey: ["bank", page, limit, search, userId, status],

    queryFn: async () =>
      apiClient(
        `/bank?page=${page}&limit=${limit}&search=${search}&userId=${userId}&status=${status}`,
        {
          method: "GET",
        },
      ),

    placeholderData: keepPreviousData,

    retry: false,
  });

/* ================= UPDATE ================= */

export const useUpdateBankDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/bank/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["bank"],
      }),
  });
};

export const useUpdateAddBankDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/bank/${id}`, {
        method: "PATCH",
        body: payload,
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["bank"],
      }),
  });
};

/* ================= DELETE ================= */

export const useDeleteBankDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) =>
      apiClient(`/bank/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["bank"],
      }),
  });
};
