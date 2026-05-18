"use client";

import {
	Play,
} from "lucide-react";

import Button from "@/components/ui/Button";

export default function RequestBuilder({
	active,
	onRun,
}) {
	return (
		<div className="bg-card border border-border rounded-2xl p-6">

			<h2 className="text-xl font-black mb-1">
				{active.name}
			</h2>

			<p className="text-sm text-muted-foreground mb-6">
				{active.description}
			</p>

			<div className="space-y-4">

				<input
					type="text"
					defaultValue="000000123456"
					placeholder="Account Number"
					className="w-full px-4 py-3 rounded-xl border border-border bg-background"
				/>

				<input
					type="text"
					defaultValue="HDFC0001234"
					placeholder="IFSC"
					className="w-full px-4 py-3 rounded-xl border border-border bg-background"
				/>

			</div>

			<Button
				onClick={onRun}
				className="w-full mt-6"
				leftIcon={
					<Play className="h-4 w-4" />
				}
			>
				Send Request
			</Button>

		</div>
	);
}