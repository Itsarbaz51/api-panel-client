'use client';

import {
	KeyRound,
	Download,
	ShieldCheck,
	Ban,
	Clock3,
	Copy,
} from 'lucide-react';

import TableShell from './core/TableShell';
import TableHeader from './core/TableHeader';
import TableBody from './core/TableBody';
import TablePagination from './core/TablePagination';

const statusOptions = [
	{ label: 'All', value: 'all' },
	{ label: 'Active', value: 'active' },
	{ label: 'Expired', value: 'expired' },
	{ label: 'Revoked', value: 'revoked' },
];

const columns = [
	{
		key: 'name',
		label: 'API Key',
		render: (row) => (
			<div className="flex items-center gap-3">
				<div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
					<KeyRound className="h-5 w-5 text-primary" />
				</div>

				<div>
					<p className="font-medium">
						{row.name}
					</p>

					<p className="text-xs text-muted-foreground">
						ID: {row.id}
					</p>
				</div>
			</div>
		),
	},

	{
		key: 'key',
		label: 'Secret Key',
		render: (row) => (
			<div className="flex items-center gap-2">
				<code className="px-3 py-1 rounded-lg bg-muted text-xs">
					{row.key}
				</code>

				<button
					onClick={() => navigator.clipboard.writeText(row.key)}
					className="text-muted-foreground hover:text-foreground transition">
					<Copy className="h-4 w-4" />
				</button>
			</div>
		),
	},

	{
		key: 'status',
		label: 'Status',
		render: (row) => (
			<span
				className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${
					row.status === 'active'
						? 'bg-success/10 text-success border-success/20'
						: row.status === 'expired'
						? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
						: 'bg-destructive/10 text-destructive border-destructive/20'
				}`}>
				{row.status === 'active' && (
					<ShieldCheck className="h-3.5 w-3.5" />
				)}

				{row.status === 'expired' && (
					<Clock3 className="h-3.5 w-3.5" />
				)}

				{row.status === 'revoked' && (
					<Ban className="h-3.5 w-3.5" />
				)}

				{row.status}
			</span>
		),
	},

	{
		key: 'created',
		label: 'Created',
		render: (row) => (
			<span className="text-sm text-muted-foreground">
				{new Date(row.created).toLocaleDateString()}
			</span>
		),
	},

	{
		key: 'lastUsed',
		label: 'Last Used',
		render: (row) => (
			<span className="text-sm text-muted-foreground">
				{row.lastUsed}
			</span>
		),
	},

	{
		key: 'expiresIn',
		label: 'Expires In',
		render: (row) => (
			<span className="font-medium">
				{row.expiresIn}
			</span>
		),
	},

	{
		key: 'actions',
		label: 'Actions',
	},
];

export default function APIKeysTable({
	keys,
	total,
	page,
	perPage,
	onPageChange,
	search,
	onSearch,
	statusFilter,
	onStatusFilterChange,
	onGenerateKey,
	onEdit,
	onDelete,
}) {
	const filters = [
		{
			value: statusFilter,
			onChange: onStatusFilterChange,
			placeholder: 'Status',
			options: statusOptions,
		},
	];

	return (
		<TableShell>
			<TableHeader
				title="All API Keys"
				subtitle={`${total} keys found`}
				search={search}
				setSearch={onSearch}
				searchPlaceholder="Search API keys..."
				filters={filters}
				onAdd={onGenerateKey}
				addLabel="Generate Key"
				addIcon={KeyRound}
				onExport={() => console.log('Export')}
				exportIcon={Download}
			/>

			<TableBody
				columns={columns}
				data={keys}
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