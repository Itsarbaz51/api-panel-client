'use client';

import React, { useState } from 'react';

import InputField from '../ui/InputField';
import Button from '../ui/Button';

export default function ForgotPasswordForm({ onSubmit, onClose }) {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email) {
			setError('Email is required');
			return;
		}

		if (!/\S+@\S+\.\S+/.test(email)) {
			setError('Invalid email');
			return;
		}

		setError('');

		await onSubmit?.({ email });
		setSuccess(true);
	};

	// success state
	if (success) {
		return (
			<div className="text-center space-y-5">
				<div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
					✓
				</div>

				<div>
					<h3 className="text-xl font-bold text-slate-800">Check Your Email</h3>

					<p className="text-sm text-slate-500 mt-2">
						Password reset link sent to
					</p>

					<p className="font-semibold text-slate-700 mt-1">{email}</p>
				</div>

				<Button variant="primary" fullWidth onClick={onClose}>
					Back to Login
				</Button>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<InputField
				label="Email"
				type="email"
				name="email"
				placeholder="Enter your email"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
					setError('');
				}}
				error={error}
				required
			/>

			<Button type="submit" variant="primary" fullWidth>
				Send Reset Link
			</Button>

			<Button type="button" variant="ghost" fullWidth onClick={onClose}>
				Back to Login
			</Button>
		</form>
	);
}
