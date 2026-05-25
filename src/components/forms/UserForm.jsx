'use client';

import React, { useEffect, useMemo, useState } from 'react';

import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';

import { AlertCircle } from 'lucide-react';

import { userValidation } from '@/validation/userValidation';
import { getValidationErrors } from '@/utils/validationErrors';

const companyTypeOptions = [
	{
		label: 'Private Limited',
		value: 'PRIVATE_LIMITED',
	},
	{
		label: 'Public Limited',
		value: 'PUBLIC_LIMITED',
	},
	{
		label: 'LLP',
		value: 'LLP',
	},
];

export default function UserForm({
	packages = [],
	initialData,
	onSubmit,
	onCancel,
}) {
	const [formData, setFormData] = useState({
		fullName: '',
		companyName: '',
		companyType: 'PRIVATE_LIMITED',
		email: '',
		phoneNumber: '',
		packageId: '',
	});

	const [packageSearch, setPackageSearch] = useState('');

	const [errors, setErrors] = useState({});

	const [formError, setFormError] = useState('');

	/* EDIT DATA */

	useEffect(() => {
		if (initialData) {
			setFormData({
				fullName: initialData.fullName || '',

				companyName: initialData.companyName || '',

				companyType: initialData.companyType || 'PRIVATE_LIMITED',

				email: initialData.email || '',

				phoneNumber: initialData.phoneNumber || '',

				packageId: initialData.packageId || initialData.package?.id || '',
			});

			setPackageSearch(
				initialData.package?.name || initialData.packageName || '',
			);
		}
	}, [initialData]);

	const clearError = (field) => {
		setErrors((prev) => ({
			...prev,
			[field]: '',
		}));

		setFormError('');
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		let updated = value;

		if (name === 'phoneNumber') {
			updated = value.replace(/\D/g, '').slice(0, 10);
		}

		setFormData((prev) => ({
			...prev,
			[name]: updated,
		}));

		clearError(name);
	};

	const packageList = Array.isArray(packages) ? packages : [];

	const filteredPackages = useMemo(() => {
		return packageList.filter((pkg) =>
			pkg?.name?.toLowerCase().includes(packageSearch.toLowerCase()),
		);
	}, [packageList, packageSearch]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setErrors({});

		setFormError('');

		const validation = userValidation.safeParse(formData);

		if (!validation.success) {
			setErrors(getValidationErrors(validation.error.issues));

			return;
		}

		try {
			await onSubmit(validation.data);

			setFormData({
				fullName: '',
				companyName: '',
				companyType: 'PRIVATE_LIMITED',
				email: '',
				phoneNumber: '',
				packageId: '',
			});

			setPackageSearch('');
		} catch {
			setFormError('Something went wrong');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col max-h-[75vh]">
			<div className="flex-1 overflow-y-auto space-y-6">
				{formError && (
					<Alert type="error" title="Error" icon={<AlertCircle />}>
						{formError}
					</Alert>
				)}

				<div className="grid grid-cols-2 gap-5">
					<InputField
						label="FULL NAME"
						name="fullName"
						value={formData.fullName}
						onChange={handleChange}
					/>

					<InputField
						label="COMPANY NAME"
						name="companyName"
						value={formData.companyName}
						onChange={handleChange}
					/>

					<div>
						<label>COMPANY TYPE</label>

						<select
							className="w-full border p-3 rounded-xl"
							value={formData.companyType}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									companyType: e.target.value,
								}))
							}>
							{companyTypeOptions.map((item) => (
								<option key={item.value} value={item.value}>
									{item.label}
								</option>
							))}
						</select>
					</div>

					<InputField
						label="EMAIL"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>

					<InputField
						label="PHONE"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleChange}
					/>

					<div className="relative">
						<InputField
							label="SEARCH PACKAGE"
							value={packageSearch}
							placeholder="Search package"
							onChange={(e) => {
								setPackageSearch(e.target.value);

								setFormData((prev) => ({
									...prev,
									packageId: '',
								}));
							}}
						/>

						{packageSearch && (
							<div className="absolute w-full bg-white border rounded-xl mt-1 z-50 max-h-48 overflow-y-auto">
								{filteredPackages.length ? (
									filteredPackages.map((pkg) => (
										<div
											key={pkg.id}
											className="p-3 cursor-pointer hover:bg-gray-100"
											onClick={() => {
												setPackageSearch(pkg.name);

												setFormData((prev) => ({
													...prev,
													packageId: pkg.id,
												}));
											}}>
											{pkg.name}
										</div>
									))
								) : (
									<div className="p-3">No Package Found</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-3 border-t pt-5">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>

				<Button type="submit">
					{initialData ? 'Update User' : 'Create User'}
				</Button>
			</div>
		</form>
	);
}
