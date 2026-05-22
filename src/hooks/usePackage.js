import { useMutation, useQuery } from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";

/* ================= CREATE ================= */

const useCreate = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/packages", {
        method: "POST",

        body: JSON.stringify(payload),
      }),
  });

/* ================= GET ALL ================= */
const useGetAll = ({ page = 1, limit = 10, search = "" }) =>
  useQuery({
    queryKey: ["packages", page, limit, search],

    queryFn: async () =>
      apiClient(`/packages?page=${page}&limit=${limit}&search=${search}`, {
        method: "GET",
      }),

    keepPreviousData: true,
  });

/* ================= UPDATE ================= */
const useUpdate = () =>
  useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/packages/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
  });

/* ================= DELETE ================= */
const useDelete = () =>
  useMutation({
    mutationFn: async (id) =>
      apiClient(`/packages/${id}`, {
        method: "DELETE",
      }),
  });

export { useCreate, useGetAll, useUpdate, useDelete };
