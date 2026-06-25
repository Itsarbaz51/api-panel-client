import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

/* ================= CREATE ================= */

export const useCreateLanguage = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/api-languages", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });

/* ================= GET ALL ================= */

export const useGetAllLanguages = ({
  page = 1,
  limit = 10,
  search = "",
}) =>
  useQuery({
    queryKey: [
      "languages",
      page,
      limit,
      search,
    ],

    queryFn: async () =>
      apiClient(
        `/api-languages?page=${Number(
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

export const useGetLanguageById = (
  id
) =>
  useQuery({
    queryKey: ["language", id],

    queryFn: async () =>
      apiClient(`/api-languages/${id}`, {
        method: "GET",
      }),

    enabled: !!id,
    retry: false,
  });

/* ================= DELETE ================= */

export const useDeleteLanguage = () =>
  useMutation({
    mutationFn: async (id) =>
      apiClient(`/api-languages/${id}`, {
        method: "DELETE",
      }),
  });

/* ================= UPDATE ================= */
/* Backend me PATCH endpoint nahi dikh raha */
/* Jab backend update API ban jaye tab use karo */

export const useUpdateLanguage = () =>
  useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/api-languages/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
  }); 