'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Tabs({ tabs = [], activeTab }) {
	return (
		<div className="relative flex items-center gap-2 p-2 rounded-xl border border-slate-200/60 bg-white/70 backdrop-blur-xl  overflow-x-auto no-scrollbar w-full lg:w-fit  flex-col lg:flex-row ">
			{tabs.map((tab) => {
				const isActive = activeTab === tab.value;

				return (
					<Link
						key={tab.value}
						href={tab.href}
						className={`
							relative flex items-center gap-2.5 px-6 py-3 rounded-xl
							text-sm font-semibold whitespace-nowrap transition-all duration-300
							${isActive ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}
						`}>
						{/* ACTIVE BG */}
						{isActive && (
							<motion.div
								layoutId="activeTab"
								className="absolute inset-0 rounded-xl bg-white border border-slate-100 "
								transition={{
									type: 'spring',
									stiffness: 380,
									damping: 30,
								}}
							/>
						)}

						{/* CONTENT */}
						<div className="relative z-10 flex items-center gap-2.5">
							{tab.icon && (
								<tab.icon
									className={`h-4 w-4 ${
										isActive ? 'text-emerald-600' : 'text-slate-400'
									}`}
								/>
							)}

							<span>{tab.label}</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
}
