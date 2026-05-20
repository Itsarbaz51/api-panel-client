'use client';

import { useState } from 'react';

import {
	Package,
	CheckCircle,
	Ban,
	DollarSign,
	Plus,
} from 'lucide-react';


import PackagesTable from '@/components/tables/PackagesTable';
import PackageModal from '@/components/modals/PackageModal';

import QuickStats from '@/components/QuickStats';
import Button from '@/components/ui/Button';
import Header from '../ui/Header';

export default function PackagesClient({
	tabs = [],
	activeTab,
}) {
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
			pkg.packageName
				.toLowerCase()
				.includes(search.toLowerCase()) ||
			pkg.packageNumber
				.toLowerCase()
				.includes(search.toLowerCase());

		const matchStatus =
			statusFilter === 'all'
				? true
				: pkg.status === statusFilter;

		return matchSearch && matchStatus;
	});

	/* ================= STATS ================= */

	const stats = [
		{
			title: 'Total Packages',
			value: packages.length,
			icon: Package,
		},
		{
			title: 'Active Packages',
			value: packages.filter(
				(p) => p.status === 'ACTIVE'
			).length,
			icon: CheckCircle,
		},
		{
			title: 'Inactive Packages',
			value: packages.filter(
				(p) => p.status === 'INACTIVE'
			).length,
			icon: Ban,
		},
		{
			title: 'Revenue Plans',
			value: `$${packages.reduce(
				(a, b) => a + b.price,
				0
			)}`,
			icon: DollarSign,
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
		setPackages((prev) =>
			prev.filter((p) => p.id !== pkg.id)
		);
	};

	const handleSubmit = (data) => {
		if (editingPackage) {
			setPackages((prev) =>
				prev.map((p) =>
					p.id === editingPackage.id
						? {
								...editingPackage,
								...data,
						  }
						: p
				)
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

	return (
		<div className="space-y-8">

			{/* HEADER */}
			<Header
				title="Packages Management"
				subtitle="Manage subscription packages, pricing and plan access."
				actions={
					<Button
						variant="primary"
						className="bg-emerald-600 hover:bg-emerald-700 text-white"
						leftIcon={<Plus size={18} />}
						onClick={handleAdd}
					>
						Add Package
					</Button>
				}
			>
			</Header>

			{/* QUICK STATS */}
			<QuickStats stats={stats} />

			{/* TABLE */}
			<div className="bg-white rounded-[32px] border border-slate-200/60 shadow-xl overflow-hidden">
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
			</div>

			{/* MODAL */}
			<PackageModal
				open={openModal}
				onClose={() => {
					setOpenModal(false);
					setEditingPackage(null);
				}}
				onSubmit={handleSubmit}
				initialData={editingPackage}
			/>
		</div>
	);
}