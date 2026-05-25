'use client';

import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }) {
	return (
		<div className="min-h-screen bg-slate-50 flex overflow-hidden">
			<Sidebar />

			<div className="flex flex-col flex-1 md:ml-20 lg:ml-64 min-w-0 transition-all duration-300">
				<div className="sticky top-0 z-30 bg-white">
					<Navbar />
				</div>

				<main className="flex-1 overflow-y-auto overflow-x-hidden">
					<div className="p-4 md:p-6">{children}</div>
				</main>
			</div>

			<Toaster
				position="top-right"
				toastOptions={{
					duration: 3000,
				}}
			/>
		</div>
	);
}
