"use client";

import {
	Terminal,
} from "lucide-react";

import TableShell from "./core/TableShell";
import TableBody from "./core/TableBody";

import {
	getMethodStyles,
	getStatusStyles,
} from "@/utils/traffic.helpers";

const columns = [
	{
		key: "timestamp",
		label: "Timestamp",
	},

	{
		key: "method",
		label: "Method",

		render: (row) => (
			<span
				className={`inline-flex items-center justify-center w-16 py-1 text-xs font-bold rounded border ${getMethodStyles(
					row.method
				)}`}
			>
				{row.method}
			</span>
		),
	},

	{
		key: "path",
		label: "Endpoint",

		render: (row) => (
			<div className="flex items-center gap-2 font-mono text-xs">

				<Terminal className="h-4 w-4 /50" />

				<span>{row.path}</span>

			</div>
		),
	},

	{
		key: "status",
		label: "Status",

		render: (row) => (
			<span
				className={`inline-flex justify-center items-center w-16 py-1 text-xs font-bold rounded-full border ${getStatusStyles(
					row.status
				)}`}
			>
				{row.status}
			</span>
		),
	},

	{
		key: "latency",
		label: "Latency",
	},

	{
		key: "ip",
		label: "IP Address",
	},
];

export default function TrafficLogsTable({
	data = [],
}) {
	return (
		<TableShell>

			<TableBody
				columns={columns}
				data={data}
			/>

		</TableShell>
	);
}