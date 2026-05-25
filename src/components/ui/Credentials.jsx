'use client';

import Button from '@/components/ui/Button';

export default function CredentialsModal({ open, onClose, data }) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
			<div className="bg-white rounded-2xl w-[450px] p-6">
				<h2 className="text-2xl font-bold">User Credentials</h2>

				<div className="space-y-5 mt-6">
					<div>
						<label>Password</label>

						<div className="border rounded-xl p-3">{data?.password}</div>
					</div>

					<div>
						<label>Transaction Pin</label>

						<div className="border rounded-xl p-3">{data?.transactionPin}</div>
					</div>
				</div>

				<div className="mt-6 flex justify-end">
					<Button onClick={onClose}>Close</Button>
				</div>
			</div>
		</div>
	);
}
