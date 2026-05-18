"use client";

import { useState } from "react";

import {
	RotateCw,
	GitBranch,
	CheckCircle,
} from "lucide-react";

import MappingTable from "@/components/tables/MappingTable";
import MappingModal from "@/components/modals/MappingModal";

import QuickStats from "@/components/QuickStats";
import Button from "@/components/ui/Button";

export default function MappingClient() {
	const [page, setPage] = useState(1);

	const [search, setSearch] = useState("");

	const [openModal, setOpenModal] = useState(false);

	const [editingMapping, setEditingMapping] =
		useState(null);

	const perPage = 10;

	const [mappings, setMappings] = useState([
		{
			id: 1,
			service: "Fund Request",
			provider: "Razorpay",
			mode: "SURCHARGE",
			pricingType: "FLAT",
			commissionLevel: "HIERARCHY",
			providerCost: "₹2.00",
			gstTds: "GST 18%",
			slab: true,
			paymentMethod: true,
			status: "ACTIVE",
		},

		{
			id: 2,
			service: "BBPS",
			provider: "Bulkpe",
			mode: "COMMISSION",
			pricingType: "FLAT",
			commissionLevel: "ADMIN_ONLY",
			providerCost: "₹0.00",
			gstTds: "-",
			slab: false,
			paymentMethod: false,
			status: "ACTIVE",
		},
	]);

	const filteredMappings = mappings.filter(
		(item) =>
			item.service
				.toLowerCase()
				.includes(search.toLowerCase()) ||
			item.provider
				.toLowerCase()
				.includes(search.toLowerCase())
	);

	const stats = [
		{
			title: "Total Mappings",
			value: mappings.length,
			icon: GitBranch,
			iconColor: "text-primary",
			bgColor: "bg-primary/10",
		},

		{
			title: "Active Mappings",
			value: mappings.filter(
				(m) => m.status === "ACTIVE"
			).length,
			icon: CheckCircle,
			iconColor: "text-success",
			bgColor: "bg-success/10",
		},
	];

	const handleAdd = () => {
		setEditingMapping(null);
		setOpenModal(true);
	};

	const handleEdit = (mapping) => {
		setEditingMapping(mapping);
		setOpenModal(true);
	};

	const handleDelete = (mapping) => {
		setMappings((prev) =>
			prev.filter((m) => m.id !== mapping.id)
		);
	};

	const handleSubmit = (data) => {
		if (editingMapping) {
			setMappings((prev) =>
				prev.map((m) =>
					m.id === editingMapping.id
						? {
								...editingMapping,
								...data,
						  }
						: m
				)
			);
		} else {
			setMappings((prev) => [
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

			<MappingTable
				mappings={filteredMappings}
				total={filteredMappings.length}
				page={page}
				perPage={perPage}
				onPageChange={setPage}
				search={search}
				onSearch={setSearch}
				onAddMapping={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			{openModal && (
				<MappingModal
					open={openModal}
					onClose={() =>
						setOpenModal(false)
					}
					onSubmit={handleSubmit}
					initialData={editingMapping}
				/>
			)}
		</>
	);
}