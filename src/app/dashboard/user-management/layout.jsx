'use client';

import { usePathname } from 'next/navigation';
import { Users, Building2 } from 'lucide-react';

import Tabs from '@/components/ui/Tabs';

export default function UserManagementLayout({ children }) {
	const pathname = usePathname();

	const tabs = [
		{
			label: 'User Directory',
			value: 'users',
			icon: Users,
			href: '/dashboard/user-management/users',
		},
		{
			label: 'Packages',
			value: 'packages',
			icon: Building2,
			href: '/dashboard/user-management/packages',
		},
	];

	const activeTab = pathname.includes('/packages') ? 'packages' : 'users';

	return (
		<div className="relative min-h-screen p-4 md:p-8">
			{/* BG GLOW */}
			<div className="absolute top-0 left-0 h-75 w-75 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

			<Tabs tabs={tabs} activeTab={activeTab} />

			{/* PAGE */}
			<div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-3">
				{children}
			</div>
			
		</div>
	);
}
