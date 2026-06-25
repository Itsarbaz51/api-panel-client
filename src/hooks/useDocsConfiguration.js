import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

/* ================= CREATE ================= */

export const useCreateDocsConfiguration = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/api-references", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });

/* ================= GET ALL ================= */

export const useGetAllDocsConfiguration = ({
  page = 1,
  limit = 10,
  search = "",
}) =>
  useQuery({
    queryKey: [
      "api-references",
      page,
      limit,
      search,
    ],

    queryFn: async () =>
      apiClient(
        `/api-references?page=${Number(
          page
        )}&limit=${Number(
          limit
        )}&search=${search}`,
        {
          method: "GET",
        }
      ),

    retry: false,
  });

/* ================= GET BY ID ================= */

export const useGetDocsConfigurationById = (
  id
) =>
  useQuery({
    queryKey: ["api-reference", id],

    queryFn: async () =>
      apiClient(`/api-references/${id}`, {
        method: "GET",
      }),

    enabled: !!id,
    retry: false,
  });

/* ================= UPDATE ================= */

export const useUpdateDocsConfiguration = () =>
  useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/api-references/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
  });