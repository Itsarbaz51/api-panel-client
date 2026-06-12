"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { DownloadCloudIcon, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import Header from "@/components/ui/Header";

export default function DeveloperAPILayout({ children }) {
	const pathname = usePathname();

	const tabs = [
		{
			label: "API Docs",
			value: "docs",
			icon: DownloadCloudIcon,
			href: "/dashboard/developer-api/docs",
		},
		{
			label: "Permissions",
			value: "permissions",
			icon: ShieldCheck,
			href: "/dashboard/developer-api/permissions",
		},
	];

	const activeTab = pathname.includes("/permissions")
		? "permissions"
		: "docs";

	return (
		<div className="relative min-h-screen p-4 md:p-8">
			{/* BG GLOW */}
			<div className="absolute top-0 left-0 h-75 w-75 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

			{/* HEADER */}
			<Header
				title="Developer API"
				subtitle="Manage API documentation, access permissions, integrations, and developer tools from one central dashboard."
			/>

			{/* TABS */}
			<nav className="flex items-center w-fit p-1.5 bg-[#f1f5f9]/80 backdrop-blur-md border border-slate-200/50 rounded-4xl shadow-inner relative mt-6">
				{tabs.map((tab) => {
					const isActive = activeTab === tab.value;

					return (
						<Link
							key={tab.value}
							href={tab.href}
							className={`
                relative flex items-center gap-2.5 px-7 py-3 rounded-[26px]
                text-sm font-bold transition-all duration-300 whitespace-nowrap outline-none
                ${
									isActive
										? "text-[#00b37e]"
										: "text-slate-500 hover:text-slate-800"
								}
              `}
						>
							{/* ACTIVE PILL */}
							{isActive && (
								<motion.div
									layoutId="activeTabPill"
									className="absolute inset-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100 rounded-[26px]"
									transition={{
										type: "spring",
										stiffness: 380,
										damping: 30,
									}}
								/>
							)}

							{/* TAB CONTENT */}
							<span className="relative z-10 flex items-center gap-2.5">
								<tab.icon
									className={`w-4 h-4 ${
										isActive
											? "text-[#00b37e]"
											: "text-slate-400"
									}`}
								/>
								{tab.label}
							</span>
						</Link>
					);
				})}
			</nav>

			{/* PAGE */}
			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
				{children}
			</div>
		</div>
	);
}