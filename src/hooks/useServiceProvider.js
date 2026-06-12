import {
  useMutation,
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";

export const useGetAllServiceProviders = ({
  page = 1,
  limit = 10,
  search = "",
}) =>
  useQuery({
    queryKey: ["service-providers", page, limit, search],

    queryFn: () =>
      apiClient(
        `/service-provider?page=${page}&limit=${limit}&search=${search}`,
      ),

    placeholderData: keepPreviousData,
  });

export const useCreateServiceProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      apiClient("/service-provider", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["service-providers"],
      }),
  });
};

export const useUpdateServiceProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      apiClient(`/service-provider/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["service-providers"],
      }),
  });
};

export const useDeleteServiceProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      apiClient(`/service-provider/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["service-providers"],
      }),
  });
};
