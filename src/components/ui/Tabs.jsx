"use client";

import Link from "next/link";

export default function Tabs({
	tabs = [],
	activeTab,
	onChange,
}) {
	return (
		<div className="inline-flex items-center gap-2 p-1 rounded-2xl border border-border bg-card">
			{tabs.map((tab) => {
				const Icon = tab.icon;

				const tabValue =
					tab.id || tab.value;

				const isActive =
					activeTab === tabValue;

				const className = `
					flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200
					${isActive
						? "bg-background text-emerald-600 shadow-sm border border-border"
						: "text-muted-foreground hover:text-foreground"}
				`;

				/* LINK TAB */
				if (tab.href) {
					return (
						<Link
							key={tabValue}
							href={tab.href}
							className={className}
						>
							{Icon && (
								<Icon className="h-4 w-4" />
							)}

							<span>{tab.label}</span>
						</Link>
					);
				}

				/* BUTTON TAB */
				return (
					<button
						key={tabValue}
						onClick={() =>
							onChange?.(tabValue)
						}
						className={className}
					>
						{Icon && (
							<Icon className="h-4 w-4" />
						)}

						<span>{tab.label}</span>
					</button>
				);
			})}
		</div>
	);
}