import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

/* ================= CREATE ================= */
export const useCreateKyc = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/kyc", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });

/* ================= GET ALL ================= */
export const useGetAllKyc = ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
}) =>
  useQuery({
    queryKey: ["kyc", page, limit, search, status],

    queryFn: async () =>
      apiClient(
        `/kyc?page=${Number(page)}&limit=${Number(limit)}&search=${search}&status=${status}`,
        {
          method: "GET",
        },
      ),

    retry: false,
  });

/* ================= UPDATE ================= */
export const useUpdateKyc = () =>
  useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/kyc/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
  });
