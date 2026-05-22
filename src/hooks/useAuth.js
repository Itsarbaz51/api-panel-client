import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";


// LOGIN
export const useLogin = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });


// FORGOT PASSWORD
export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });


// RESET PASSWORD
export const useResetPassword = () =>
  useMutation({
    mutationFn: async (payload) =>
      apiClient("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });


// LOGOUT
export const useLogout = () =>
  useMutation({
    mutationFn: async () =>
      apiClient("/auth/logout", {
        method: "POST",
      }),
  });


// CURRENT USER
export const useCurrentUser = () =>
  useQuery({
    queryKey: ["current-user"],

    queryFn: async () =>
      apiClient("/auth", {
        method: "GET",
      }),

    retry: false,
    refetchOnWindowFocus: false,
  });