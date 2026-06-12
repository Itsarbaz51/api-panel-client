import {
  useMutation,
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";

export const useGetAllServices = ({ page = 1, limit = 10, search = "" }) =>
  useQuery({
    queryKey: ["services", page, limit, search],

    queryFn: () =>
      apiClient(`/services?page=${page}&limit=${limit}&search=${search}`),

    placeholderData: keepPreviousData,
  });

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      apiClient("/services", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["services"],
      }),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      apiClient(`/services/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["services"],
      }),
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      apiClient(`/services/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["services"],
      }),
  });
};
