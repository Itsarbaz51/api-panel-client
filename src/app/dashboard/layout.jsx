'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }) {
	return (
		<div className="min-h-screen bg-slate-50 flex overflow-hidden">

			{/* Sidebar already handles collapse + mobile */}
			<Sidebar />

			{/* Main Content */}
			<div className="flex flex-col flex-1 md:ml-20 lg:ml-64 min-w-0 transition-all duration-300">

				{/* Navbar */}
				<div className="sticky top-0 z-30 bg-white">
					<Navbar />
				</div>

				{/* Page */}
				<main className="flex-1 overflow-y-auto overflow-x-hidden">
					<div className="p-4 md:p-6">
						{children}
					</div>
				</main>

			</div>
		</div>
	);
}