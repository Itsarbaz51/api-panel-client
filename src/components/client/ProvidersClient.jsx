"use client";

import { useState } from "react";

import {
	RotateCw,
	Layers,
	CheckCircle,
} from "lucide-react";

import ProvidersTable from "@/components/tables/ProvidersTable";
import ProviderModal from "@/components/modals/ProviderModal";

import QuickStats from "@/components/QuickStats";
import Button from "@/components/ui/Button";

export default function ProvidersClient() {
	const [page, setPage] = useState(1);

	const [search, setSearch] = useState("");

	const [openModal, setOpenModal] = useState(false);

	const [editingProvider, setEditingProvider] =
		useState(null);

	const perPage = 10;

	const [providers, setProviders] = useState([
		{
			id: 1,
			name: "Razorpay",
			code: "RAZORPAY",
			services: ["Fund Request"],
			status: "ACTIVE",
		},
		{
			id: 2,
			name: "Wonderpay",
			code: "WONDERPAY",
			services: ["Payout"],
			status: "ACTIVE",
		},
		{
			id: 3,
			name: "Bulkpe",
			code: "BULKPE",
			services: ["BBPS", "Aadhaar", "PAN"],
			status: "INACTIVE",
		},
	]);

	const filteredProviders = providers.filter(
		(provider) =>
			provider.name
				.toLowerCase()
				.includes(search.toLowerCase()) ||
			provider.code
				.toLowerCase()
				.includes(search.toLowerCase())
	);

	const stats = [
		{
			title: "Total Providers",
			value: providers.length,
			icon: Layers,
			iconColor: "text-primary",
			bgColor: "bg-primary/10",
		},

		{
			title: "Active Providers",
			value: providers.filter(
				(p) => p.status === "ACTIVE"
			).length,
			icon: CheckCircle,
			iconColor: "text-success",
			bgColor: "bg-success/10",
		},
	];

	const handleAdd = () => {
		setEditingProvider(null);
		setOpenModal(true);
	};

	const handleEdit = (provider) => {
		setEditingProvider(provider);
		setOpenModal(true);
	};

	const handleDelete = (provider) => {
		setProviders((prev) =>
			prev.filter((p) => p.id !== provider.id)
		);
	};

	const handleSubmit = (data) => {
		if (editingProvider) {
			setProviders((prev) =>
				prev.map((p) =>
					p.id === editingProvider.id
						? {
								...editingProvider,
								...data,
						  }
						: p
				)
			);
		} else {
			setProviders((prev) => [
				...prev,
				{
					id: Date.now(),
					...data,
				},
			]);
		}

		setOpenModal(false);
	};

	return (
		<>
			<div className="mb-6 flex justify-end">

				<Button
					variant="outline"
					icon={RotateCw}
				>
					Refresh
				</Button>

			</div>

			<QuickStats stats={stats} />

			<ProvidersTable
				providers={filteredProviders}
				total={filteredProviders.length}
				page={page}
				perPage={perPage}
				onPageChange={setPage}
				search={search}
				onSearch={setSearch}
				onAddProvider={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			{openModal && (
				<ProviderModal
					open={openModal}
					onClose={() =>
						setOpenModal(false)
					}
					onSubmit={handleSubmit}
					initialData={editingProvider}
				/>
			)}
		</>
	);
}