"use client";

import { useState } from "react";

import {
	Webhook,
	Plus,
	Zap,
	RefreshCw,
	CheckCircle2,
	XCircle,
	Clock3,
} from "lucide-react";


import QuickStats from "@/components/QuickStats";

import Button from "@/components/ui/Button";

import WebhooksTable from "@/components/tables/WebhooksTable";

import WebhookModal from "@/components/modals/WebhookModal";

import Header from "../ui/Header";

export default function WebhooksClient() {
	/* =====================================================
	   UI STATE
	===================================================== */

	const [page, setPage] = useState(1);

	const [search, setSearch] =
		useState("");

	const [statusFilter, setStatusFilter] =
		useState("all");

	const [openModal, setOpenModal] =
		useState(false);

	const [editingWebhook, setEditingWebhook] =
		useState(null);

	const perPage = 10;

	/* =====================================================
	   DUMMY DATA
	===================================================== */

	const [webhooks, setWebhooks] =
		useState([
			{
				id: 1,
				name: "Slack Notifications",
				url: "https://hooks.slack.com/services/...",
				events: [
					"USER_CREATED",
					"ORDER_COMPLETED",
				],
				status: "ACTIVE",
				lastTriggered:
					"2 mins ago",
			},

			{
				id: 2,
				name: "Discord Bot",
				url: "https://discord.com/api/webhooks/...",
				events: [
					"PAYMENT_SUCCESS",
				],
				status: "ACTIVE",
				lastTriggered:
					"1 hour ago",
			},

			{
				id: 3,
				name: "ERP Sync",
				url: "https://api.company.com/webhook",
				events: [
					"INVENTORY_UPDATED",
				],
				status: "FAILED",
				lastTriggered:
					"Yesterday",
			},
		]);

	/* =====================================================
	   FILTER
	===================================================== */

	const filteredWebhooks =
		webhooks.filter((hook) => {
			const matchSearch =
				hook.name
					.toLowerCase()
					.includes(
						search.toLowerCase()
					) ||
				hook.url
					.toLowerCase()
					.includes(
						search.toLowerCase()
					);

			const matchStatus =
				statusFilter === "all"
					? true
					: hook.status ===
					  statusFilter;

			return (
				matchSearch &&
				matchStatus
			);
		});

	/* =====================================================
	   STATS
	===================================================== */

	const stats = [
		{
			title: "Total Webhooks",
			value: webhooks.length,
			icon: Webhook,
			iconColor: "text-primary",
			bgColor: "bg-primary/10",
		},

		{
			title: "Active Hooks",
			value: webhooks.filter(
				(w) =>
					w.status ===
					"ACTIVE"
			).length,
			icon: CheckCircle2,
			iconColor:
				"text-success",
			bgColor:
				"bg-success/10",
		},

		{
			title: "Failed Hooks",
			value: webhooks.filter(
				(w) =>
					w.status ===
					"FAILED"
			).length,
			icon: XCircle,
			iconColor:
				"text-destructive",
			bgColor:
				"bg-destructive/10",
		},

		{
			title: "Realtime Events",
			value: "24.5k",
			icon: Zap,
			iconColor:
				"text-warning",
			bgColor:
				"bg-warning/10",
		},
	];

	/* =====================================================
	   ACTIONS
	===================================================== */

	const handleAdd = () => {
		setEditingWebhook(null);

		setOpenModal(true);
	};

	const handleEdit = (hook) => {
		setEditingWebhook(hook);

		setOpenModal(true);
	};

	const handleDelete = (hook) => {
		setWebhooks((prev) =>
			prev.filter(
				(w) => w.id !== hook.id
			)
		);
	};

	const handleSubmit = (data) => {
		if (editingWebhook) {
			setWebhooks((prev) =>
				prev.map((w) =>
					w.id ===
					editingWebhook.id
						? {
								...editingWebhook,
								...data,
						  }
						: w
				)
			);
		} else {
			setWebhooks((prev) => [
				...prev,

				{
					id: Date.now(),

					lastTriggered:
						"Just now",

					...data,
				},
			]);
		}

		setOpenModal(false);

		setEditingWebhook(null);
	};

	/* =====================================================
	   RENDER
	===================================================== */

	return (
		<div className="space-y-6">

			{/* HEADER */}
			<Header
				title="Webhooks"
				subtitle="Send realtime events to external systems and applications."
				icon={
					<Webhook className="h-8 w-8" />
				}
				actions={
					<div className="flex items-center gap-3">

						<Button
							variant="outline"
							leftIcon={
								<RefreshCw className="h-4 w-4" />
							}
						>
							Refresh
						</Button>

						<Button
							variant="primary"
							leftIcon={
								<Plus className="h-4 w-4" />
							}
							onClick={
								handleAdd
							}
						>
							Create Webhook
						</Button>

					</div>
				}
			/>

			{/* STATS */}
			<QuickStats
				stats={stats}
			/>

			{/* ALERT */}
			<div className="rounded-2xl border border-primary/10 bg-primary/5 p-5">

				<div className="flex items-start gap-4">

					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">

						<Zap className="h-5 w-5 text-primary" />

					</div>

					<div>

						<h3 className="font-semibold text-foreground">
							Webhooks Information
						</h3>

						<p className="mt-1 text-sm text-muted-foreground leading-relaxed">
							Webhooks allow external services to receive realtime event notifications whenever something happens inside your platform.
						</p>

					</div>

				</div>

			</div>

			{/* TABLE */}
			<WebhooksTable
				webhooks={
					filteredWebhooks
				}
				total={
					filteredWebhooks.length
				}
				page={page}
				perPage={perPage}
				onPageChange={setPage}
				search={search}
				onSearch={(v) => {
					setSearch(v);

					setPage(1);
				}}
				statusFilter={
					statusFilter
				}
				onStatusFilterChange={(
					v
				) => {
					setStatusFilter(v);

					setPage(1);
				}}
				onAddWebhook={
					handleAdd
				}
				onEdit={handleEdit}
				onDelete={
					handleDelete
				}
			/>

			{/* MODAL */}
			{openModal && (
				<WebhookModal
					open={openModal}
					onClose={() => {
						setOpenModal(
							false
						);

						setEditingWebhook(
							null
						);
					}}
					onSubmit={
						handleSubmit
					}
					initialData={
						editingWebhook
					}
				/>
			)}

		</div>
	);
}