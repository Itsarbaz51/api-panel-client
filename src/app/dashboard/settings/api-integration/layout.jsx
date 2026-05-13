"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, ShieldCheck, Bell } from "lucide-react";
import { motion } from "framer-motion";

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
      label: "Mapping",
      value: "mapping",
      icon: Bell,
      href: "/dashboard/settings/api-integration/mapping",
    },
  ];

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto p-4 md:p-10 animate-in fade-in duration-700 font-sans">
      
      {/* Background Glow Effects */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[#00b37e]/10 blur-[120px] rounded-full -z-10" />

      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-[#00b37e] rounded-full" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00b37e]/80">Config</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[#0f172a]">
            API <span className="text-[#00b37e]">Integration</span>
          </h1>
        </div>

        {/* Floating Navigation (Animated Pill Style) */}
        <nav className="flex items-center p-1.5 bg-[#f1f5f9]/80 backdrop-blur-md border border-slate-200/50 rounded-[32px] shadow-inner relative overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.value}
                href={tab.href}
                className={`
                  relative flex items-center gap-2.5 px-7 py-3 rounded-[26px] text-sm font-bold transition-all duration-300 whitespace-nowrap outline-none
                  ${isActive ? "text-[#00b37e]" : "text-slate-500 hover:text-slate-800"}
                `}
              >
                {/* Framer Motion Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeApiTab"
                    className="absolute inset-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-slate-100 rounded-[26px]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Tab Content */}
                <span className="relative z-10 flex items-center gap-2.5">
                  <tab.icon className={`w-4 h-4 ${isActive ? "text-[#00b37e]" : "text-slate-400"}`} />
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Content Area */}
      <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {children}
      </main>
    </div>
  );
}