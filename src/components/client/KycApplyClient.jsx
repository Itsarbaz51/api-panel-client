'use client';

import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import KYCForm from '@/components/forms/KYCForm';

import { useCreateKYC } from '@/hooks/useKYC';
import { addKyc } from '@/store/kycSlice';

export default function KycApplyClient() {
	const dispatch = useDispatch();

	const createKyc = useCreateKYC();

	const handleSubmit = async (payload) => {
		try {
			console.log('KYC PAYLOAD →', payload);

			const res = await createKyc.mutateAsync(payload);

			console.log('KYC RESPONSE →', res);

			dispatch(addKyc(res?.data || res));

			toast.success('KYC Created Successfully');

			return {
				success: true,
			};
		} catch (err) {
			console.log('KYC ERROR →', err);

			toast.error(err?.response?.data?.message || err?.message || 'Failed');

			return {
				success: false,
			};
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 py-12">
			<div className="max-w-5xl mx-auto">
				<KYCForm onSubmit={handleSubmit} loading={createKyc.isPending} />
			</div>
		</div>
	);
}
