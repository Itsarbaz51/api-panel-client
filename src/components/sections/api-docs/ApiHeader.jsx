"use client";

import {
	Activity,
} from "lucide-react";

export default function ApiHeader() {
	return (
		<div className="flex items-center justify-between">

			<div>

				<h1 className="text-3xl font-black">
					API Docs
				</h1>

				<p className="text-sm text-muted-foreground mt-1">
					Manage endpoints and integrations
				</p>

			</div>

			<div className="flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-3">

				<div className="flex items-center gap-2">

					<div className="w-2 h-2 rounded-full bg-primary animate-pulse" />

					<span className="text-xs font-bold ">
						LIVE
					</span>

				</div>

				<div className="h-6 w-px bg-border" />

				<div>

					<p className="text-xs text-muted-foreground">
						Success
					</p>

					<p className="font-bold">
						99.9%
					</p>

				</div>

				<div className="h-6 w-px bg-border" />

				<Activity className="h-5 w-5 text-emerald-500" />

			</div>

		</div>
	);
}