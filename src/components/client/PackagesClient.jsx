'use client';

import { useState } from 'react';
import { RefreshCw, Package, CheckCircle, Ban, DollarSign } from 'lucide-react';

import PackagesTable from '@/components/tables/PackagesTable';
import PackageModal from '@/components/modals/PackageModal';
import QuickStats from '@/components/QuickStats';
import Button from '@/components/ui/Button';

export default function PackagesClient() {
	/* ================= UI STATE ================= */

	const [page, setPage] = useState(1);

	const [search, setSearch] = useState('');

	const [statusFilter, setStatusFilter] = useState('all');

	const [openModal, setOpenModal] = useState(false);

	const [editingPackage, setEditingPackage] = useState(null);

	const perPage = 10;

	/* ================= DUMMY DATA ================= */

	const [packages, setPackages] = useState([
		{
			id: 1,
			packageNumber: 'PKG-1001',
			packageName: 'Starter Plan',
			price: 19,
			usersLimit: 5,
			storage: '10 GB',
			status: 'ACTIVE',
			createdAt: new Date(),
		},

		{
			id: 2,
			packageNumber: 'PKG-1002',
			packageName: 'Professional Plan',
			price: 49,
			usersLimit: 25,
			storage: '50 GB',
			status: 'ACTIVE',
			createdAt: new Date(),
		},

		{
			id: 3,
			packageNumber: 'PKG-1003',
			packageName: 'Enterprise Plan',
			price: 99,
			usersLimit: 100,
			storage: '200 GB',
			status: 'INACTIVE',
			createdAt: new Date(),
		},
	]);

	/* ================= FILTER ================= */

	const filteredPackages = packages.filter((pkg) => {
		const matchSearch =
			pkg.packageName.toLowerCase().includes(search.toLowerCase()) ||
			pkg.packageNumber.toLowerCase().includes(search.toLowerCase());

		const matchStatus =
			statusFilter === 'all' ? true : pkg.status === statusFilter;

		return matchSearch && matchStatus;
	});

	/* ================= STATS ================= */

	const stats = [
		{
			title: 'Total Packages',
			value: packages.length,
			icon: Package,
			iconColor: 'text-primary',
			bgColor: 'bg-primary/10',
		},

		{
			title: 'Active Packages',
			value: packages.filter((p) => p.status === 'ACTIVE').length,
			icon: CheckCircle,
			iconColor: 'text-success',
			bgColor: 'bg-success/10',
		},

		{
			title: 'Inactive Packages',
			value: packages.filter((p) => p.status === 'INACTIVE').length,
			icon: Ban,
			iconColor: 'text-destructive',
			bgColor: 'bg-destructive/10',
		},

		{
			title: 'Revenue Plans',
			value: `$${packages.reduce((a, b) => a + b.price, 0)}`,
			icon: DollarSign,
			iconColor: 'text-warning',
			bgColor: 'bg-warning/10',
		},
	];

	/* ================= ACTIONS ================= */

	const handleAdd = () => {
		setEditingPackage(null);
		setOpenModal(true);
	};

	const handleEdit = (pkg) => {
		setEditingPackage(pkg);
		setOpenModal(true);
	};

	const handleDelete = (pkg) => {
		setPackages((prev) => prev.filter((p) => p.id !== pkg.id));
	};

	const handleSubmit = (data) => {
		if (editingPackage) {
			setPackages((prev) =>
				prev.map((p) =>
					p.id === editingPackage.id ? { ...editingPackage, ...data } : p,
				),
			);
		} else {
			setPackages((prev) => [
				...prev,
				{
					id: Date.now(),
					packageNumber: `PKG-${Date.now()}`,
					createdAt: new Date(),
					...data,
				},
			]);
		}

		setOpenModal(false);
		setEditingPackage(null);
	};

	/* ================= RENDER ================= */

	return (
		<>
			<div className="mb-6 flex justify-end">
				<Button variant="outline" icon={RefreshCw}>
					Refresh
				</Button>
			</div>

			<QuickStats stats={stats} />

			<PackagesTable
				packages={filteredPackages}
				total={filteredPackages.length}
				page={page}
				perPage={perPage}
				onPageChange={setPage}
				search={search}
				onSearch={(v) => {
					setSearch(v);
					setPage(1);
				}}
				statusFilter={statusFilter}
				onStatusFilterChange={(v) => {
					setStatusFilter(v);
					setPage(1);
				}}
				onAddPackage={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			{openModal && (
				<PackageModal
					open={openModal}
					onClose={() => {
						setOpenModal(false);
						setEditingPackage(null);
					}}
					onSubmit={handleSubmit}
					initialData={editingPackage}
				/>
			)}
		</>
	);
}
