'use client';

import React, { useState } from 'react';

import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/SelectField';
import Button from '@/components/ui/Button';

const roleOptions = [
	{
		label: 'Admin',
		value: 'Admin',
	},
	{
		label: 'Editor',
		value: 'Editor',
	},
	{
		label: 'Viewer',
		value: 'Viewer',
	},
];

const statusOptions = [
	{
		label: 'Active',
		value: 'ACTIVE',
	},
	{
		label: 'Inactive',
		value: 'INACTIVE',
	},
];

export default function UserForm({
	initialData,
	onSubmit,
	onCancel,
}) {
	const [formData, setFormData] = useState({
		name: initialData?.name || '',
		email: initialData?.email || '',
		role: initialData?.role || 'Viewer',
		status: initialData?.status || 'ACTIVE',
	});

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<InputField
					label="Full Name"
					name="name"
					placeholder="John Doe"
					value={formData.name}
					onChange={handleChange}
					required
				/>

				<InputField
					label="Email Address"
					name="email"
					type="email"
					placeholder="john@example.com"
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<div className="space-y-2">
					<label className="text-sm font-medium text-foreground">
						Role
					</label>

					<SelectField
						value={formData.role}
						onChange={(value) =>
							setFormData((prev) => ({
								...prev,
								role: value,
							}))
						}
						options={roleOptions}
						placeholder="Select role"
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium text-foreground">
						Status
					</label>

					<SelectField
						value={formData.status}
						onChange={(value) =>
							setFormData((prev) => ({
								...prev,
								status: value,
							}))
						}
						options={statusOptions}
						placeholder="Select status"
					/>
				</div>
			</div>

			<div className="flex items-center justify-end gap-3 pt-2">
				<Button
					type="button"
					variant="outline"
					onClick={onCancel}>
					Cancel
				</Button>

				<Button type="submit">
					{initialData ? 'Update User' : 'Create User'}
				</Button>
			</div>
		</form>
	);
}