import {
  useMutation,
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";

export const useGetAllCommissionSettings = ({
  page = 1,
  limit = 10,
  search = "",
}) =>
  useQuery({
    queryKey: ["commission-settings", page, limit, search],

    queryFn: () =>
      apiClient(
        `/commission-setting?page=${page}&limit=${limit}&search=${search}`,
      ),

    placeholderData: keepPreviousData,
  });

export const useCreateCommissionSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      apiClient("/commission-setting", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["commission-settings"],
      }),
  });
};

export const useUpdateCommissionSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      apiClient(`/commission-setting/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["commission-settings"],
      }),
  });
};

export const useDeleteCommissionSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      apiClient(`/commission-setting/${id}`, {
        method: "DELETE",
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["commission-settings"],
      }),
  });
};
