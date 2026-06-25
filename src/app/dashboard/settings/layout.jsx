"use client";

import { usePathname } from "next/navigation";
import { Settings, ShieldCheck } from "lucide-react";

import Tabs from "@/components/ui/Tabs";

export default function SettingsLayout({ children }) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "General",
      value: "general",
      icon: Settings,
      href: "/dashboard/settings/general",
    },
    {
      label: "API Integration",
      value: "api-integration",
      icon: ShieldCheck,
      href: "/dashboard/settings/api-integration",
    },
    {
      label: "Docs Configuration",
      value: "docs-configuration",
      icon: Settings,
      href: "/dashboard/settings/docs-Configuration",
    },
  ];

  const activeTab =
    tabs.find((tab) => pathname.startsWith(tab.href))?.value || "general";

  return (
    <div className="relative">
      {/* Theme Glow */}
      <div className="absolute top-0 left-0 h-60 w-60 bg-theme/10 blur-3xl rounded-full -z-10" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-1 rounded-full bg-theme" />

            <span className="text-xs uppercase tracking-[0.2em] font-bold text-theme">
              Preferences
            </span>
          </div>

          <h1 className="text-3xl font-black text-foreground">
            System <span className="text-theme">Settings</span>
          </h1>

          <p className="text-muted-foreground mt-2">
            Configure system behaviour and integrations.
          </p>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} />
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
