'use client';

import React, { useEffect } from 'react';

import ForgotPasswordForm from '../forms/ForgotPasswordForm';

export default function ForgotPasswordModal({ isOpen, onClose, onSubmit }) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div
				onClick={onClose}
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
			/>

			{/* Modal */}
			<div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
					✕
				</button>

				<div className="mb-6">
					<h2 className="text-2xl font-bold text-slate-800">
						Forgot Password?
					</h2>

					<p className="text-sm text-slate-500 mt-1">
						Enter your email to reset password
					</p>
				</div>

				<ForgotPasswordForm onSubmit={onSubmit} onClose={onClose} />
			</div>
		</div>
	);
}
