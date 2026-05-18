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
		label: "Failed",
		value: "FAILED",
	},
];

export default function WebhookForm({
	initialData,
	onSubmit,
	onCancel,
}) {
	const [formData, setFormData] =
		useState({
			name:
				initialData?.name || "",

			url:
				initialData?.url || "",

			events:
				initialData?.events?.join(
					", "
				) || "",

			status:
				initialData?.status ||
				"ACTIVE",
		});

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,

			[e.target.name]:
				e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		onSubmit({
			...formData,

			events:
				formData.events
					.split(",")
					.map((e) =>
						e.trim()
					),
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6"
		>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

				<InputField
					label="Webhook Name"
					name="name"
					placeholder="Slack Notifications"
					value={formData.name}
					onChange={
						handleChange
					}
					required
				/>

				<InputField
					label="Webhook URL"
					name="url"
					placeholder="https://..."
					value={formData.url}
					onChange={
						handleChange
					}
					required
				/>

			</div>

			<InputField
				label="Events"
				name="events"
				placeholder="USER_CREATED, PAYMENT_SUCCESS"
				value={formData.events}
				onChange={handleChange}
				required
			/>

			<div>

				<label className="block text-sm font-medium mb-2">
					Status
				</label>

				<SelectField
					value={
						formData.status
					}
					onChange={(value) =>
						setFormData(
							(prev) => ({
								...prev,

								status:
									value,
							})
						)
					}
					options={
						statusOptions
					}
					placeholder="Select status"
				/>

			</div>

			<div className="flex justify-end gap-3 pt-2">

				<Button
					type="button"
					variant="outline"
					onClick={onCancel}
				>
					Cancel
				</Button>

				<Button type="submit">

					{initialData
						? "Update Webhook"
						: "Create Webhook"}

				</Button>

			</div>

		</form>
	);
}