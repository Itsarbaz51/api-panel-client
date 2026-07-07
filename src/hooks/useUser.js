import {
    useMutation,
    useQuery,
    keepPreviousData,
    useQueryClient,
} from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

/* GET ALL */
export const useGetAllUsers = ({ page = 1, limit = 6, search = '' }) =>
    useQuery({
        queryKey: ['users', page, limit, search],
        queryFn: () =>
            apiClient(`/users?page=${page}&limit=${limit}&search=${search}`),
        placeholderData: keepPreviousData,
    });

/* GET ONE */
export const useGetOneUser = () =>
    useMutation({
        mutationFn: (id) =>
            apiClient(`/users/${id}`, {
                method: 'GET',
            }),
    });

/* GET CREDENTIALS */
export const useGetCredentials = () =>
    useMutation({
        mutationFn: (id) =>
            apiClient(`/users/${id}/credentials`, {
                method: 'GET',
            }),
    });

/* CREATE */
export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload) =>
            apiClient('/users', {
                method: 'POST',
                body: JSON.stringify(payload),
            }),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['users'],
            }),
    });
};

/* UPDATE (FIXED) */
export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }) => {
            const isFormData = payload instanceof FormData;

            return apiClient(`/users/${id}`, {
                method: 'PATCH',
                // Agar payload FormData hai to custom boundary browser khud set karta hai, 
                // isliye application/json header ko overwrite ya delete karna zaroori hai.
                headers: isFormData ? {} : { 'Content-Type': 'application/json' },
                body: isFormData ? payload : JSON.stringify(payload),
            });
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['users'],
            }),
    });
};