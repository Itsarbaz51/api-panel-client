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

export default function MappingForm({
	initialData,
	onSubmit,
	onCancel,
}) {
	const [formData, setFormData] = useState({
		service:
			initialData?.service || "",

		provider:
			initialData?.provider || "",

		mode:
			initialData?.mode || "",

		pricingType:
			initialData?.pricingType ||
			"",

		commissionLevel:
			initialData?.commissionLevel ||
			"",

		providerCost:
			initialData?.providerCost || "",

		gstTds:
			initialData?.gstTds || "",

		status:
			initialData?.status ||
			"ACTIVE",
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
		<form
			onSubmit={handleSubmit}
			className="space-y-6"
		>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

				<InputField
					label="Service"
					name="service"
					value={formData.service}
					onChange={handleChange}
				/>

				<InputField
					label="Provider"
					name="provider"
					value={formData.provider}
					onChange={handleChange}
				/>

				<InputField
					label="Mode"
					name="mode"
					value={formData.mode}
					onChange={handleChange}
				/>

				<InputField
					label="Pricing Type"
					name="pricingType"
					value={formData.pricingType}
					onChange={handleChange}
				/>

				<InputField
					label="Commission Level"
					name="commissionLevel"
					value={
						formData.commissionLevel
					}
					onChange={handleChange}
				/>

				<InputField
					label="Provider Cost"
					name="providerCost"
					value={
						formData.providerCost
					}
					onChange={handleChange}
				/>

				<InputField
					label="GST/TDS"
					name="gstTds"
					value={formData.gstTds}
					onChange={handleChange}
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
						? "Update Mapping"
						: "Create Mapping"}
				</Button>

			</div>

		</form>
	);
}