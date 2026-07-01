import {
  useQuery,
  useMutation,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";

import { apiClient } from "@/lib/apiClient";

/* GET ALL */

export const useGetAllTransactions = ({
  page = 1,
  limit = 10,
  search = "",
  status = "",
  service = "",
  date = "",
}) =>
  useQuery({
    queryKey: ["transactions", page, limit, search, status, service, date],

    queryFn: () =>
      apiClient(
        `/transactions?page=${page}&limit=${limit}&search=${search}&status=${status}&service=${service}&date=${date}`,
      ),

    placeholderData: keepPreviousData,
  });

/* GET ONE */

export const useGetOneTransaction = () =>
  useMutation({
    mutationFn: (id) =>
      apiClient(`/transactions/${id}`, {
        method: "GET",
      }),
  });

/* CHECK STATUS */

export const useCheckTransactionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ transactionId, serviceProviderMappingId }) =>
      apiClient("/transactions/check-status", {
        method: "POST",
        body: JSON.stringify({
          transactionId,
          serviceProviderMappingId,
        }),
      }),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      }),
  });
};
