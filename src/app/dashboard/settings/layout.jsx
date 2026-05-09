'use client';

import TabsNav from '@/components/details/TabsNav';
import { Settings } from 'lucide-react';

export default function SettingsLayout({ children }) {
	const tabs = [
		{
			label: 'General',
			value: 'general',
			icon: Settings,
		},
	].filter(Boolean);

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-xl font-semibold">Settings</h1>
				<p className="text-sm text-muted-foreground">
					Manage system configuration and services
				</p>
			</div>

			<TabsNav tabs={tabs} basePath="/dashboard/settings" />

			{/* Content */}
			<div>{children}</div>
		</div>
	);
}
