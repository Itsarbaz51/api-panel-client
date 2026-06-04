import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export const useGetAllLogs = ({
  page = 1,
  limit = 10,
  search = "",
  roleType = "",
}) =>
  useQuery({
    queryKey: ["logs", page, limit, search, roleType],

    queryFn: () =>
      apiClient(
        `/login-logs?page=${page}&limit=${limit}&search=${search}&roleType=${roleType}`,
      ),

    placeholderData: keepPreviousData,
  });
