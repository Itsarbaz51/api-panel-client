'use client';

import React, { useEffect } from 'react';

import UserForm from '../forms/UserForm';

export default function UserModal({
	open,
	onClose,
	onSubmit,
	initialData,
}) {
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [open]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div
				onClick={onClose}
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
			/>

			{/* Modal */}
			<div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

				{/* Header */}
				<div className="flex items-center justify-between border-b border-border px-6 py-5">

					<div>
						<h2 className="text-xl font-semibold text-foreground">
							{initialData ? 'Edit User' : 'Create User'}
						</h2>

						<p className="text-sm text-muted-foreground mt-1">
							Manage user account details
						</p>
					</div>

					<button
						onClick={onClose}
						className="h-10 w-10 rounded-xl hover:bg-muted transition flex items-center justify-center">
						✕
					</button>
				</div>

				{/* Form */}
				<div className="p-6">
					<UserForm
						initialData={initialData}
						onSubmit={onSubmit}
						onCancel={onClose}
					/>
				</div>
			</div>
		</div>
	);
}