"use client";

import { useState } from "react";

import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Button from "@/components/ui/Button";

const statusOptions = [
	{
		label: "Active",
		value: "ACTIVE",
	},
	{
		label: "Inactive",
		value: "INACTIVE",
	},
];

const serviceOptions = [
	{
		label: "BBPS",
		value: "BBPS",
	},
	{
		label: "Payout",
		value: "Payout",
	},
	{
		label: "PAN",
		value: "PAN",
	},
	{
		label: "Aadhaar",
		value: "Aadhaar",
	},
];

export default function ProviderForm({
	initialData,
	onSubmit,
	onCancel,
}) {
	const [formData, setFormData] = useState({
		name: initialData?.name || "",
		code: initialData?.code || "",
		service:
			initialData?.services?.[0] || "",
		status:
			initialData?.status || "ACTIVE",
	});

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		onSubmit({
			...formData,
			services: [formData.service],
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6"
		>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

				<InputField
					label="Provider Name"
					name="name"
					placeholder="Razorpay"
					value={formData.name}
					onChange={handleChange}
				/>

				<InputField
					label="Provider Code"
					name="code"
					placeholder="RAZORPAY"
					value={formData.code}
					onChange={handleChange}
				/>

			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

				<div className="space-y-2">

					<label className="text-sm font-medium">
						Service
					</label>

					<SelectField
						value={formData.service}
						onChange={(value) =>
							setFormData((prev) => ({
								...prev,
								service: value,
							}))
						}
						options={serviceOptions}
					/>

				</div>

				<div className="space-y-2">

					<label className="text-sm font-medium">
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
					/>

				</div>

			</div>

			<div className="flex justify-end gap-3">

				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
				>
					Cancel
				</Button>

				<Button type="submit">
					{initialData
						? "Update Provider"
						: "Create Provider"}
				</Button>

			</div>

		</form>
	);
}