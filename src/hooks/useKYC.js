import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

export const useCreateKYC = () =>
	useMutation({
		mutationFn: async (payload) => {
			console.log('SENDING', payload);

			return apiClient('/kyc', {
				method: 'POST',

				headers: {
					'Content-Type': 'application/json',
				},

				body: JSON.stringify(payload),
			});
		},
	});
