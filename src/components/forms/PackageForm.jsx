'use client';

import React, { useState } from 'react';

import InputField from '@/components/ui/InputField';
import SelectField from '@/components/ui/SelectField';
import Button from '@/components/ui/Button';

import { packageValidation } from '@/validation/packageValidation';
import { getValidationErrors } from '@/utils/validationErrors';

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

export default function PackageForm({ initialData, onSubmit, onCancel }) {
	const [formData, setFormData] = useState({
		packageName: initialData?.packageName || '',
		price: initialData?.price || '',
		usersLimit: initialData?.usersLimit || '',
		storage: initialData?.storage || '',
		status: initialData?.status || 'ACTIVE',
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));

		setErrors((prev) => ({
			...prev,
			[e.target.name]: '',
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const result = packageValidation.safeParse(formData);

		// validation fail
		if (!result.success) {
			setErrors(getValidationErrors(result.error.errors));

			return;
		}

		// validation success
		onSubmit(result.data);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* GRID */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
				<InputField
					label="Package Name"
					name="packageName"
					placeholder="Professional Plan"
					value={formData.packageName}
					onChange={handleChange}
					error={errors.packageName}
					required
				/>

				<InputField
					label="Price"
					name="price"
					type="number"
					placeholder="49"
					value={formData.price}
					onChange={handleChange}
					error={errors.price}
					required
				/>

				<InputField
					label="Users Limit"
					name="usersLimit"
					type="number"
					placeholder="25"
					value={formData.usersLimit}
					onChange={handleChange}
					error={errors.usersLimit}
					required
				/>

				<InputField
					label="Storage"
					name="storage"
					placeholder="50 GB"
					value={formData.storage}
					onChange={handleChange}
					error={errors.storage}
					required
				/>
			</div>

			{/* STATUS */}
			<div className="space-y-2">
				<label className="text-sm font-medium text-foreground">Status</label>

				<SelectField
					value={formData.status}
					onChange={(value) => {
						setFormData((prev) => ({
							...prev,
							status: value,
						}));

						setErrors((prev) => ({
							...prev,
							status: '',
						}));
					}}
					options={statusOptions}
					placeholder="Select status"
					error={errors.status}
				/>
			</div>

			{/* ACTIONS */}
			<div className="flex items-center justify-end gap-3 pt-2">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>

				<Button type="submit">
					{initialData ? 'Update Package' : 'Create Package'}
				</Button>
			</div>
		</form>
	);
}
