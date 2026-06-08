"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Key,
  Activity,
  Webhook,
  Settings,
  Menu,
  X,
  Terminal,
  ChevronLeft,
  ChevronRight,
  User,
  CirclePercent,
} from "lucide-react";

import Button from "@/components/ui/Button";
import usePermission from "@/hooks/usePermission";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { isSuperAdmin } = usePermission();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    { title: "API Overview", icon: LayoutDashboard, href: "/dashboard" },
    ...(isSuperAdmin
      ? [
          {
            title: "User Management",
            icon: User,
            href: "/dashboard/user-management",
          },
        ]
      : []),
    {
      title: "Commission Management",
      icon: CirclePercent,
      href: "/dashboard/commission-management",
    },
    {
      title: "Developer API",
      icon: Settings,
      href: "/dashboard/developer-api",
    },
    {
      title: "Logs",
      icon: Activity,
      href: "/dashboard/logs",
    },
    { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full bg-white relative">
      {/* Logo Section */}
      <div
        className={`p-6 border-b border-gray-100 flex items-center ${isCollapsed && !mobile ? "justify-center" : "justify-between"}`}
      >
        <div className="flex items-center gap-2">
          {(!isCollapsed || mobile) && (
            <div className="flex flex-col animate-in fade-in duration-300">
              <h1 className="text-lg font-bold tracking-tight text-gray-800 leading-none">
                {user?.companyName || "API_PORTAL"}
              </h1>
              <span className="text-[10px] text-emerald-600 font-bold mt-1 uppercase tracking-tighter">
                {user?.role}
              </span>
            </div>
          )}
        </div>

        {mobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:bg-gray-50"
          >
            <X size={20} />
          </Button>
        )}
      </div>

      {/* API Status Indicator */}
      {(!isCollapsed || mobile) && (
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <div className="flex flex-col">
              <p className="text-[11px] font-bold text-emerald-800 uppercase leading-none">
                System Live
              </p>
              <p className="text-[10px] text-emerald-600 mt-1">Latency: 24ms</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={index}
              href={item.href}
              title={isCollapsed ? item.title : ""}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100"
                  : "text-gray-500 hover:text-emerald-600 hover:bg-gray-50"
              } ${isCollapsed && !mobile ? "justify-center" : ""}`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className="min-w-5.5"
              />
              {(!isCollapsed || mobile) && (
                <span
                  className={`font-medium text-sm animate-in fade-in duration-300 ${isActive ? "font-semibold" : ""}`}
                >
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Usage Stats Section */}
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 px-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Terminal size={18} className="text-white" />
          </div>
          <span className="font-bold text-gray-800">API_PORTAL</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          className="hover:bg-gray-100"
        >
          <Menu size={24} className="text-gray-600" />
        </Button>
      </header>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex fixed inset-y-0 left-0 bg-white border-r border-gray-100 flex-col z-40 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-sm hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-all z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 bottom-0 w-70 bg-white transition-transform duration-300 ease-out shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <SidebarContent mobile={true} />
        </aside>
      </div>

      <div className="h-16 md:hidden" />
    </>
  );
}
