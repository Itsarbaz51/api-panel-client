"use client";

import {
	GitBranch,
	Download,
} from "lucide-react";

import TableShell from "./core/TableShell";
import TableHeader from "./core/TableHeader";
import TableBody from "./core/TableBody";
import TablePagination from "./core/TablePagination";

const columns = [
	{
		key: "service",
		label: "Service",
	},

	{
		key: "provider",
		label: "Provider",
	},

	{
		key: "mode",
		label: "Mode",
	},

	{
		key: "pricingType",
		label: "Pricing Type",
	},

	{
		key: "commissionLevel",
		label: "Commission",
	},

	{
		key: "providerCost",
		label: "Provider Cost",
		render: (row) => (
			<span className="font-medium text-primary">
				{row.providerCost}
			</span>
		),
	},

	{
		key: "gstTds",
		label: "GST/TDS",
	},

	{
		key: "slab",
		label: "Slab",
		render: (row) => (
			<span
				className={`px-2 py-1 rounded-full text-xs ${
					row.slab
						? "bg-success/10 text-success"
						: "bg-destructive/10 text-destructive"
				}`}
			>
				{row.slab ? "Yes" : "No"}
			</span>
		),
	},

	{
		key: "paymentMethod",
		label: "Payment",
		render: (row) => (
			<span
				className={`px-2 py-1 rounded-full text-xs ${
					row.paymentMethod
						? "bg-primary/10 text-primary"
						: "bg-muted text-muted-foreground"
				}`}
			>
				{row.paymentMethod
					? "Yes"
					: "No"}
			</span>
		),
	},

	{
		key: "status",
		label: "Status",
		render: (row) => (
			<span
				className={`px-2 py-1 rounded-full text-xs ${
					row.status === "ACTIVE"
						? "bg-success/10 text-success"
						: "bg-destructive/10 text-destructive"
				}`}
			>
				{row.status}
			</span>
		),
	},

	{
		key: "actions",
		label: "Actions",
	},
];

export default function MappingTable({
	mappings,
	total,
	page,
	perPage,
	onPageChange,
	search,
	onSearch,
	onAddMapping,
	onEdit,
	onDelete,
}) {
	return (
		<TableShell>

			<TableHeader
				title="Service Mapping"
				subtitle={`${total} mappings found`}
				search={search}
				setSearch={onSearch}
				searchPlaceholder="Search mapping..."
				onAdd={onAddMapping}
				addLabel="Add Mapping"
				addIcon={GitBranch}
				onExport={() =>
					console.log("Export")
				}
				exportIcon={Download}
			/>

			<TableBody
				columns={columns}
				data={mappings}
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