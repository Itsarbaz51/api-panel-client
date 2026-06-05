import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

// get all login logs with pagination and search
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

// get all audit logs with pagination and search
export const useGetAllAuditLogs = ({ page = 1, limit = 10, search = "" }) =>
  useQuery({
    queryKey: ["audit-logs", page, limit, search],

    queryFn: () =>
      apiClient(`/audit-logs?page=${page}&limit=${limit}&search=${search}`),

    placeholderData: keepPreviousData,
  });
