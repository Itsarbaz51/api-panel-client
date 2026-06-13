"use client";

import { usePathname } from "next/navigation";
import { DownloadCloudIcon, ShieldCheck } from "lucide-react";
import Header from "@/components/ui/Header";
import Tabs from "@/components/ui/Tabs";

export default function DeveloperAPILayout({ children }) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "API Docs",
      value: "docs",
      icon: DownloadCloudIcon,
      href: "/dashboard/developer-api/docs",
    },
    {
      label: "Permissions",
      value: "permissions",
      icon: ShieldCheck,
      href: "/dashboard/developer-api/permissions",
    },
  ];

  const activeTab = pathname.includes("/permissions") ? "permissions" : "docs";

  return (
    <div className="relative min-h-screen p-4 md:p-8">
      {/* BG GLOW */}
      <div className="absolute top-0 left-0 h-75 w-75 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER */}
      <Header
        title="Developer API"
        subtitle="Manage API documentation, access permissions, integrations, and developer tools from one central dashboard."
      />

      {/* BG GLOW */}
      <div className="absolute top-0 left-0 h-75 w-75 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <Tabs tabs={tabs} activeTab={activeTab} />

      {/* PAGE */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6">
        {children}
      </div>
    </div>
  );
}
