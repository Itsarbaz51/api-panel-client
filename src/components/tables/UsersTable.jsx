'use client';

import { User, Download } from 'lucide-react';

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
		key: 'name',
		label: 'User',
		render: (row) => (
			<div className="flex items-center gap-3">
				<div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
					<User className="h-5 w-5 text-primary" />
				</div>

				<div>
					<p className="font-medium">{row.name}</p>

					<p className="text-xs text-muted-foreground">
						{row.email}
					</p>
				</div>
			</div>
		),
	},

	{
		key: 'role',
		label: 'Role',
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
		key: 'joined',
		label: 'Joined',
		render: (row) => (
			<span className="text-sm text-muted-foreground">
				{row.joined}
			</span>
		),
	},

	{
		key: 'actions',
		label: 'Actions',
	},
];

export default function UsersTable({
	users,
	total,
	page,
	perPage,
	onPageChange,
	search,
	onSearch,
	statusFilter,
	onStatusFilterChange,
	onAddUser,
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
				title="All Users"
				subtitle={`${total} users found`}
				search={search}
				setSearch={onSearch}
				searchPlaceholder="Search users..."
				filters={filters}
				onAdd={onAddUser}
				addLabel="Add User"
				addIcon={User}
				onExport={() => console.log('Export')}
				exportIcon={Download}
			/>

			<TableBody
				columns={columns}
				data={users}
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