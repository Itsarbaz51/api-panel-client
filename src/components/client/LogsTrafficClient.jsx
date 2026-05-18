"use client";

import React, {
	useMemo,
	useState,
} from "react";

import {
	Search,
	RotateCw,
	FileText,
	Activity,
} from "lucide-react";


import Button from "@/components/ui/Button";

import TrafficLogsTable from "@/components/tables/TrafficLogsTable";

import TrafficAnalytics from "@/components/sections/TrafficAnalytics";

import Header from "../ui/Header";

import Tabs from "../ui/Tabs";
import { MOCK_TRAFFIC_LOGS } from "../dummyData";

export default function LogsTrafficClient() {
	const [activeTab, setActiveTab] =
		useState("LOGS");

	const [searchTerm, setSearchTerm] =
		useState("");

	const [statusFilter, setStatusFilter] =
		useState("ALL");

	/* ================= FILTER ================= */

	const filteredLogs = useMemo(() => {
		return MOCK_TRAFFIC_LOGS.filter(
			(log) => {
				const matchesSearch =
					log.path
						.toLowerCase()
						.includes(
							searchTerm.toLowerCase()
						) ||
					log.ip.includes(searchTerm);

				if (
					statusFilter === "SUCCESS"
				) {
					return (
						matchesSearch &&
						log.status >= 200 &&
						log.status < 300
					);
				}

				if (
					statusFilter === "ERROR"
				) {
					return (
						matchesSearch &&
						log.status >= 400
					);
				}

				return matchesSearch;
			}
		);
	}, [searchTerm, statusFilter]);

	/* ================= STATS ================= */

	const stats = useMemo(() => {
		const total =
			MOCK_TRAFFIC_LOGS.length;

		const errors =
			MOCK_TRAFFIC_LOGS.filter(
				(l) => l.status >= 400
			).length;

		const avgLatency = Math.round(
			MOCK_TRAFFIC_LOGS.reduce(
				(acc, curr) =>
					acc + curr.latencyVal,
				0
			) / total
		);

		return {
			total,
			errors,
			avgLatency,
		};
	}, []);

	const tabs = [
		{
			id: "LOGS",
			label: "Logs",
			icon: FileText,
		},

		{
			id: "TRAFFIC",
			label: "Traffic",
			icon: Activity,
		},
	];

	return (
		<div className="space-y-6">

			<Header
				title="Network Monitor"
				subtitle="Monitor real-time client requests and API performance."
				actions={
					<Button
						variant="primary"
						leftIcon={
							<RotateCw className="h-4 w-4" />
						}
					>
						Refresh
					</Button>
				}
			>

				<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-6">

					<Tabs
						tabs={tabs}
						activeTab={activeTab}
						onChange={setActiveTab}
					/>

					{activeTab === "LOGS" && (
						<div className="flex gap-3 flex-col sm:flex-row">

							<div className="relative">

								<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

								<input
									type="text"
									placeholder="Search by path or IP..."
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(
											e.target.value
										)
									}
									className="pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-primary"
								/>

							</div>

							<select
								value={statusFilter}
								onChange={(e) =>
									setStatusFilter(
										e.target.value
									)
								}
								className="rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
							>
								<option value="ALL">
									All Statuses
								</option>

								<option value="SUCCESS">
									Success
								</option>

								<option value="ERROR">
									Error
								</option>

							</select>

						</div>
					)}

				</div>

			</Header>

			{/* CONTENT */}
			{activeTab === "LOGS" ? (
				<TrafficLogsTable
					data={filteredLogs}
				/>
			) : (
				<TrafficAnalytics
					stats={stats}
				/>
			)}

		</div>
	);
}