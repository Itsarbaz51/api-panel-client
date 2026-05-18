"use client";

import QuickStats from "@/components/QuickStats";

import {
	Server,
	ShieldAlert,
	Clock,
} from "lucide-react";

import {
	ResponsiveContainer,
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
} from "recharts";

/* =========================================================
   DUMMY CHART DATA
========================================================= */

const trafficData = [
	{
		time: "10 AM",
		requests: 120,
	},

	{
		time: "11 AM",
		requests: 210,
	},

	{
		time: "12 PM",
		requests: 340,
	},

	{
		time: "1 PM",
		requests: 280,
	},

	{
		time: "2 PM",
		requests: 390,
	},

	{
		time: "3 PM",
		requests: 480,
	},

	{
		time: "4 PM",
		requests: 420,
	},
];

export default function TrafficAnalytics({
	stats,
}) {
	/* =====================================================
	   QUICK STATS
	===================================================== */

	const quickStats = [
		{
			title: "Total Requests",
			value: stats.total,
			icon: Server,
			iconColor: "text-emerald-600",
			bgColor: "bg-emerald-50",

			change: "+12%",
			footer: "Increased from yesterday",
			isPositive: true,
		},

		{
			title: "Failed Requests",
			value: stats.errors,
			icon: ShieldAlert,
			iconColor: "text-rose-600",
			bgColor: "bg-rose-50",

			change: "-3%",
			footer: "Error rate decreased",
			isPositive: true,
		},

		{
			title: "Avg Latency",
			value: `${stats.avgLatency}ms`,
			icon: Clock,
			iconColor: "text-amber-600",
			bgColor: "bg-amber-50",

			change: "+5ms",
			footer: "Latency slightly higher",
			isPositive: false,
		},
	];

	return (
		<div className="space-y-6">

			{/* =====================================================
			    QUICK STATS
			===================================================== */}

			<QuickStats stats={quickStats}/>

			{/* =====================================================
			    CHART
			===================================================== */}

			<div className="bg-card rounded-2xl border border-border p-6 shadow-sm">

				<div className="mb-6">

					<h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
						Live Traffic Volume Distribution
					</h3>

					<p className="text-sm text-muted-foreground mt-1">
						Realtime API request traffic overview
					</p>

				</div>

				<div className="h-[320px] w-full">

					<ResponsiveContainer
						width="100%"
						height="100%"
					>

						<AreaChart
							data={trafficData}
						>

							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
							/>

							<XAxis
								dataKey="time"
							/>

							<YAxis />

							<Tooltip />

							<Area
								type="monotone"
								dataKey="requests"
								stroke="#10b981"
								fill="#10b981"
								fillOpacity={0.15}
								strokeWidth={3}
							/>

						</AreaChart>

					</ResponsiveContainer>

				</div>

			</div>

		</div>
	);
}