import {
  useMutation,
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";

export const useGetAllProviders = ({ page = 1, limit = 10, search = "" }) =>
  useQuery({
    queryKey: ["providers", page, limit, search],

    queryFn: () =>
      apiClient(`/providers?page=${page}&limit=${limit}&search=${search}`),

    placeholderData: keepPreviousData,
  });

export const useCreateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      apiClient("/providers", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["providers"],
      }),
  });
};

export const useUpdateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      apiClient(`/providers/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["providers"],
      }),
  });
};

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      apiClient(`/providers/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["providers"],
      }),
  });
};
