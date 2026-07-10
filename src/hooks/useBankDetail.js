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
      apiClient("/bank-details", {
        method: "POST",
        body: payload,
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["bank-details"],
      }),
  });
};

/* ================= GET ALL ================= */

export const useGetAllBankDetails = ({
  page = 1,
  limit = 10,
  search = "",
  userId = "",
  status = "",
}) =>
  useQuery({
    queryKey: ["bank-details", page, limit, search, userId, status],

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

/* ================= GET ONE ================= */
/* Backend me GET BY ID API nahi hai */
/* Jab ban jaye tab enable kar dena */

// export const useGetBankDetail = (id) =>
//   useQuery({
//     queryKey: ["bank-detail", id],
//
//     queryFn: async () =>
//       apiClient(`/bank-details/${id}`, {
//         method: "GET",
//       }),
//
//     enabled: !!id,
//   });

/* ================= UPDATE ================= */

export const useUpdateBankDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/bank-details/${id}`, {
        method: "PATCH",
        body: payload,
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["bank-details"],
      }),
  });
};

/* ================= DELETE ================= */

export const useDeleteBankDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) =>
      apiClient(`/bank-details/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["bank-details"],
      }),
  });
};
