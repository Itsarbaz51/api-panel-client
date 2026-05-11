"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Users } from "lucide-react";

export default function UserManagementLayout({ children }) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "User Directory",
      value: "users",
      icon: Users,
      href: "/dashboard/user-management/users",
    },
    {
      label: "Service Packages",
      value: "packages",
      icon: Building2,
      href: "/dashboard/user-management/packages",
    },
  ];

  return (
    <div className="relative min-h-screen max-w-7xl mx-auto p-4 md:p-10 animate-in fade-in duration-700">
      
      {/* Background Glows */}
      <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-[#00b37e]/10 blur-[120px] rounded-full -z-10" />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-1 bg-[#00b37e] rounded-full" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00b37e]/80">Management Console</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[#0f172a]">
            User <span className="text-[#00b37e]">Management</span>
          </h1>
        </div>

        <nav className="flex items-center gap-4 bg-[#f8fafc] p-2 rounded-[28px] border border-slate-100 shadow-inner">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.value}
                href={tab.href}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-[22px] text-sm font-bold transition-all duration-300
                  ${isActive 
                    ? "bg-white text-[#00b37e] shadow-[0_10px_25px_-5px_rgba(0,179,126,0.15)] border border-[#00b37e]/10" 
                    : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                  }
                `}
              >
                <tab.icon className={`w-4 h-4 ${isActive ? "text-[#00b37e]" : "text-slate-400"}`} />
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* --- CONTENT AREA (Double Div structure removed) --- */}
      <main className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
      </main>
    </div>
  );
}