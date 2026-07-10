"use client";

import { usePathname } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import Tabs from "@/components/ui/Tabs";

export default function ApiIntegrationLayout({ children }) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Docs",
      value: "docs",
      icon: ShieldCheck,
      href: "/dashboard/settings/docs-Configuration",
    },
  ];

  const activeTab = tabs.find((tab) => pathname.startsWith(tab.href))?.value;

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
