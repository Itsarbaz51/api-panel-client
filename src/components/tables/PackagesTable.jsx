'use client';

import { Package, Download } from 'lucide-react';

import TableShell from './core/TableShell';
import TableHeader from './core/TableHeader';
import TableBody from './core/TableBody';
import TablePagination from './core/TablePagination';

const statusOptions = [
	{ label: 'All', value: 'all' },
	{ label: 'Active', value: 'ACTIVE' },
	{ label: 'Inactive', value: 'INACTIVE' },
];

const columns = [
	{
		key: 'packageName',
		label: 'Package',
		render: (row) => (
			<div className="flex items-center gap-3">
				<div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
					<Package className="h-5 w-5 text-primary" />
				</div>

				<div>
					<p className="font-medium">{row.packageName}</p>

					<p className="text-xs text-muted-foreground">{row.packageNumber}</p>
				</div>
			</div>
		),
	},

	{
		key: 'price',
		label: 'Price',
		render: (row) => <span className="font-semibold">${row.price}</span>,
	},

	{
		key: 'usersLimit',
		label: 'Users',
		render: (row) => <span>{row.usersLimit} Users</span>,
	},

	{
		key: 'storage',
		label: 'Storage',
	},

	{
		key: 'status',
		label: 'Status',
		render: (row) => (
			<span
				className={`px-2 py-1 rounded-full text-xs font-medium border ${
					row.status === 'ACTIVE'
						? 'bg-success/10 text-success border-success/20'
						: 'bg-destructive/10 text-destructive border-destructive/20'
				}`}>
				{row.status}
			</span>
		),
	},

	{
		key: 'createdAt',
		label: 'Created At',
		render: (row) => (
			<span className="text-sm text-muted-foreground">
				{new Date(row.createdAt).toLocaleDateString()}
			</span>
		),
	},

	{
		key: 'actions',
		label: 'Actions',
	},
];

export default function PackagesTable({
	packages,
	total,
	page,
	perPage,
	onPageChange,
	search,
	onSearch,
	statusFilter,
	onStatusFilterChange,
	onAddPackage,
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
				title="All Packages"
				subtitle={`${total} packages found`}
				search={search}
				setSearch={onSearch}
				searchPlaceholder="Search packages..."
				// filters={filters}
				onAdd={onAddPackage}
				addLabel="Add Package"
				addIcon={Package}
				onExport={() => console.log('Export')}
				exportIcon={Download}
			/>

			<TableBody
				columns={columns}
				data={packages}
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
