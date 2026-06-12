"use client";

import { usePathname } from "next/navigation";
import { Settings, ShieldCheck, Bell } from "lucide-react";

import Tabs from "@/components/ui/Tabs";

export default function ApiIntegrationLayout({ children }) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Services",
      value: "services",
      icon: Settings,
      href: "/dashboard/settings/api-integration/services",
    },
    {
      label: "Providers",
      value: "providers",
      icon: ShieldCheck,
      href: "/dashboard/settings/api-integration/providers",
    },
    {
      label: "Service Provider",
      value: "service-provider",
      icon: Bell,
      href: "/dashboard/settings/api-integration/service-provider",
    },
  ];

  const activeTab =
    tabs.find((tab) => pathname.startsWith(tab.href))?.value || "services";

  return (
    <div className="relative">
      {/* Theme Glow */}
      <div className="absolute top-0 left-0 h-56 w-56 bg-theme/10 blur-3xl rounded-full -z-10" />

      <div className="mb-8">
        <Tabs tabs={tabs} activeTab={activeTab} />
      </div>

      <div>{children}</div>
    </div>
  );
}
