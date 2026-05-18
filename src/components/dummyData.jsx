import {
	Shield,
	Database,
	Zap,
	Cloud,
	Server,
} from "lucide-react";

export const dummyUsers = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun@example.com",
    role: "Admin",
    status: "ACTIVE",
    joined: "12 May 2024",
  },
  {
    id: 2,
    name: "Sneha Patel",
    email: "sneha.p@company.in",
    role: "Editor",
    status: "INACTIVE",
    joined: "05 Jan 2024",
  },
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul.v@dev.com",
    role: "Viewer",
    status: "ACTIVE",
    joined: "20 Mar 2024",
  },
  {
    id: 4,
    name: "Priya Singh",
    email: "priya@startup.io",
    role: "Admin",
    status: "ACTIVE",
    joined: "15 Feb 2024",
  },
];

export const apiKeysData = [
  {
    id: "1",
    name: "Production Key",
    key: "sk_live_abc123...xyz",
    status: "active",
    created: "2024-05-10",
    lastUsed: "2024-12-10",
    expiresIn: "45 days",
  },
  {
    id: "2",
    name: "Development Key",
    key: "sk_test_def456...uvw",
    status: "active",
    created: "2024-06-15",
    lastUsed: "2024-12-11",
    expiresIn: "72 days",
  },
  {
    id: "3",
    name: "Legacy Key",
    key: "sk_old_ghi789...rst",
    status: "revoked",
    created: "2024-01-01",
    lastUsed: "2024-03-15",
    expiresIn: "Expired",
  },
];

export const MOCK_TRAFFIC_LOGS = [
	{
		id: "1",
		timestamp: "2026-05-16 12:04:22",
		method: "GET",
		path: "/api/v1/users",
		status: 200,
		latency: "45ms",
		latencyVal: 45,
		ip: "192.168.1.1",
	},

	{
		id: "2",
		timestamp: "2026-05-16 12:05:01",
		method: "POST",
		path: "/api/v1/auth/login",
		status: 201,
		latency: "120ms",
		latencyVal: 120,
		ip: "192.168.1.50",
	},

	{
		id: "3",
		timestamp: "2026-05-16 12:06:15",
		method: "GET",
		path: "/api/v1/analytics",
		status: 500,
		latency: "310ms",
		latencyVal: 310,
		ip: "172.16.254.1",
	},
];

export const endpoints = [
	{
		name: "PAN Lite",
		method: "POST",
		group: "Verifications",
		description:
			"Verify PAN card details instantly",
		icon: Shield,
		color: "emerald",
	},

	{
		name: "Bank Verification",
		method: "POST",
		group: "Verifications",
		description:
			"Validate bank account credentials",
		icon: Database,
		color: "blue",
	},

	{
		name: "Penniless Verification",
		method: "POST",
		group: "Payments",
		description:
			"Zero-balance account verification",
		icon: Zap,
		color: "amber",
	},

	{
		name: "Initiate Payout",
		method: "POST",
		group: "Payments",
		description:
			"Process bulk payouts seamlessly",
		icon: Cloud,
		color: "purple",
	},

	{
		name: "Fetch Balance",
		method: "GET",
		group: "System",
		description:
			"Check account balance in real-time",
		icon: Server,
		color: "slate",
	},
];

export const COLORS = {
	emerald: {
		bg: "bg-emerald-50",
		text: "text-emerald-600",
		border: "border-emerald-200",
	},

	blue: {
		bg: "bg-blue-50",
		text: "text-blue-600",
		border: "border-blue-200",
	},

	amber: {
		bg: "bg-amber-50",
		text: "text-amber-600",
		border: "border-amber-200",
	},

	purple: {
		bg: "bg-purple-50",
		text: "text-purple-600",
		border: "border-purple-200",
	},

	slate: {
		bg: "bg-slate-100",
		text: "text-slate-500",
		border: "border-slate-200",
	},
};