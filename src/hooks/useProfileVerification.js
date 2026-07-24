import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

/* ================= CREATE ================= */

export const useCreateKyc = () => {
  return useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();

      // Normal Fields
      Object.entries(data).forEach(([key, value]) => {
        if (
          key !== "documents" &&
          key !== "addresses" &&
          value !== undefined &&
          value !== null
        ) {
          if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });

      // Addresses
      formData.append("addresses", JSON.stringify(data.addresses));

      // Document Metadata
      const documentPayload = data.documents.map((doc) => ({
        type: doc.type,
        documentNumber: doc.documentNumber || "",
        remarks: doc.remarks || "",
      }));

      formData.append("documents", JSON.stringify(documentPayload));

      // Files
      data.documents.forEach((doc) => {
        if (doc.file) {
          formData.append("documents", doc.file);
        }
      });

      return await apiClient("/kyc", {
        method: "POST",
        body: formData,
      });
    },
  });
};

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
export const useUpdateApplyKyc = () =>
  useMutation({
    mutationFn: async ({ id, data }) => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (
          key !== "documents" &&
          key !== "addresses" &&
          value !== undefined &&
          value !== null
        ) {
          if (typeof value === "object") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      });

      formData.append("addresses", JSON.stringify(data.addresses));

      const documentPayload = data.documents.map((doc) => ({
        type: doc.type,
        documentNumber: doc.documentNumber || "",
        remarks: doc.remarks || "",
        fileUrl: doc.fileUrl || null, // existing file
      }));

      formData.append("documents", JSON.stringify(documentPayload));

      data.documents.forEach((doc) => {
        if (doc.file instanceof File) {
          formData.append("documents", doc.file);
        }
      });

      return apiClient(`/kyc/${id}`, {
        method: "PATCH",
        body: formData,
      });
    },
  });

export const useUpdateKyc = () =>
  useMutation({
    mutationFn: async ({ id, payload }) =>
      apiClient(`/kyc/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
  });

export const useGetByIdKyc = () =>
  useMutation({
    mutationFn: async (id) =>
      apiClient(`/kyc/${id}`, {
        method: "GET",
      }),
  });
