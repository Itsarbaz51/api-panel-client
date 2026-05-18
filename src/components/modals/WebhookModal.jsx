"use client";

import WebhookForm from "@/components/forms/WebhookForm";

export default function WebhookModal({
	open,
	onClose,
	onSubmit,
	initialData,
}) {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">

			{/* BACKDROP */}
			<div
				className="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* MODAL */}
			<div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

				<div className="mb-6 flex items-start justify-between">

					<div>

						<h2 className="text-2xl font-bold">
							{initialData
								? "Edit Webhook"
								: "Create Webhook"}
						</h2>

						<p className="text-sm text-muted-foreground mt-1">
							Configure realtime webhook events.
						</p>

					</div>

					<button
						onClick={onClose}
						className="h-10 w-10 rounded-xl hover:bg-muted transition-colors"
					>
						✕
					</button>

				</div>

				<WebhookForm
					initialData={
						initialData
					}
					onSubmit={
						onSubmit
					}
					onCancel={
						onClose
					}
				/>

			</div>

		</div>
	);
}