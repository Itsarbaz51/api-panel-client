'use client';

import React from 'react';

export default function Header({ title, subtitle, icon, actions, children }) {
	return (
		<div className="relative overflow-hidden rounded-4xl border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 mb-10">
			{/* Glow */}
			<div className="absolute top-0 right-0 h-40 w-40 bg-theme/10 blur-3xl rounded-full" />

			<div className="relative z-10 flex flex-col gap-8">
				{/* TOP */}
				<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
					<div className="flex items-start gap-5">
						{/* TEXT */}
						<div>
							<div className="flex items-center gap-2 mb-3">
								<div className="h-5 w-1 rounded-full bg-primary" />

								<p className="text-[11px] font-black uppercase tracking-[0.25em] text-theme">
									Management Console
								</p>
							</div>

							<h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
								{title}
							</h1>

							<p className="mt-2 text-sm md:text-base text-slate-500 max-w-2xl">
								{subtitle}
							</p>
						</div>
					</div>

					{/* ACTIONS */}
					{actions && <div className="flex items-center gap-3">{actions}</div>}
				</div>

				{/* CHILDREN */}
				{children && <div>{children}</div>}
			</div>
		</div>
	);
}
