'use client';

import React, { useState } from 'react';

import Input from '@/components/ui/InputField';
import Button from '@/components/ui/Button';

import { loginValidation } from '@/validation/loginValidation';
import { getValidationErrors } from '@/utils/validationErrors';

export default function LoginForm({ onSubmit, onForgotPassword }) {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

		setErrors({
			...errors,
			[e.target.name]: '',
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const result = loginValidation.safeParse(formData);

		// validation fail
		if (!result.success) {
			setErrors(getValidationErrors(result.error.errors));

			return;
		}

		// validation success
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<Input
				type="email"
				name="email"
				label="Email"
				placeholder="Enter your email"
				value={formData.email}
				onChange={handleChange}
				error={errors.email}
				required
			/>

			<Input
				type="password"
				name="password"
				label="Password"
				placeholder="Enter your password"
				value={formData.password}
				onChange={handleChange}
				error={errors.password}
				required
			/>

			<div className="flex justify-end">
				<Button
					type="button"
					variant="text"
					onClick={onForgotPassword}
					className="text-sm text-[#10a37f] hover:text-[#0e8a6b] transition">
					Forgot Password?
				</Button>
			</div>

			<Button type="submit" variant="primary" size="lg" fullWidth>
				Login
			</Button>
		</form>
	);
}
