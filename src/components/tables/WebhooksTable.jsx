"use client";

import {
	Webhook,
	Download,
} from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

const statusOptions = [
	{
		label: "All",
		value: "all",
	},

	{
		label: "Active",
		value: "ACTIVE",
	},

	{
		label: "Failed",
		value: "FAILED",
	},
];

const columns = [
	{
		key: "name",
		label: "Webhook",

		render: (row) => (
			<div className="flex items-center gap-3">

				<div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/10">

					<Webhook className="h-5 w-5 text-primary" />

				</div>

				<div>

					<p className="font-semibold">
						{row.name}
					</p>

					<p className="text-xs text-muted-foreground truncate max-w-[220px]">
						{row.url}
					</p>

				</div>

			</div>
		),
	},

	{
		key: "events",
		label: "Events",

		render: (row) => (
			<div className="flex flex-wrap gap-2">

				{row.events?.map(
					(event, index) => (
						<span
							key={index}
							className="px-2 py-1 rounded-full text-[11px] font-medium bg-primary/10 text-primary border border-primary/20"
						>
							{event}
						</span>
					)
				)}

			</div>
		),
	},

	{
		key: "status",
		label: "Status",

		render: (row) => (
			<span
				className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
					row.status ===
					"ACTIVE"
						? "bg-success/10 text-success border-success/20"
						: "bg-destructive/10 text-destructive border-destructive/20"
				}`}
			>
				{row.status}
			</span>
		),
	},

	{
		key: "lastTriggered",
		label: "Last Triggered",
	},

	{
		key: "actions",
		label: "Actions",
	},
];

export default function WebhooksTable({
	webhooks,
	total,
	page,
	perPage,
	onPageChange,
	search,
	onSearch,
	statusFilter,
	onStatusFilterChange,
	onAddWebhook,
	onEdit,
	onDelete,
}) {
	const filters = [
		{
			value: statusFilter,
			onChange:
				onStatusFilterChange,
			placeholder: "Status",
			options: statusOptions,
		},
	];

	return (
		<TableShell>

			<TableHeader
				title="All Webhooks"
				subtitle={`${total} webhooks found`}
				search={search}
				setSearch={onSearch}
				searchPlaceholder="Search webhooks..."
				filters={filters}
				onAdd={onAddWebhook}
				addLabel="Create Webhook"
				addIcon={Webhook}
				onExport={() =>
					console.log("Export")
				}
				exportIcon={Download}
			/>

			<TableBody
				columns={columns}
				data={webhooks}
				onEdit={onEdit}
				onDelete={onDelete}
			/>

			<TablePagination
				page={page}
				setPage={onPageChange}
				total={total}
				perPage={perPage}
			/>

		</TableShell>
	);
}