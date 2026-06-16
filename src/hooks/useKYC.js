import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/lib/apiClient';

export const useCreateKYC = () =>
	useMutation({
		mutationFn: async (payload) => {
			console.log('SENDING', payload);

			// If an external API is configured, use it. Otherwise fallback to local Next route.
			if (process.env.NEXT_PUBLIC_API_URL) {
				return apiClient('/kyc', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(payload),
				});
			}

			const res = await fetch('/api/kyc', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const contentType = res.headers.get('content-type') || '';
			const data = contentType.includes('application/json') ? await res.json() : await res.text();

			if (!res.ok) {
				const error = new Error(data?.message || 'Request failed');
				error.response = { data };
				error.status = res.status;
				throw error;
			}

			return data;
		},
	});
