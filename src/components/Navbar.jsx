"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronDown,
  User,
  LogOut,
  Terminal,
  Menu,
  X,
  LayoutDashboard,
  Activity,
  Settings,
  CirclePercent,
  Webhook,
} from "lucide-react";

import { logout } from "@/store/authSlice";
import { useLogout } from "@/hooks/useAuth";
import usePermissionChecker from "@/hooks/usePermissionChecker";

import {
  useGetCredentials,
  useCreateApiKey,
  useUpdateApiKey,
} from "@/hooks/useApiKey";

import ApiKeyModal from "./modals/ApiKeyModal";

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [credential, setCredential] = useState(null);
  
  // 1. Dropdown को hold करने के लिए state और ref (Pure JS)
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const { isApiHolder, isSuperAdmin } = usePermissionChecker();
  const { mutate: logoutUser, isPending } = useLogout();

  const getCredentials = useGetCredentials();
  const createApiKey = useCreateApiKey();
  const updateApiKey = useUpdateApiKey();

  // बाहर क्लिक करने पर ड्रॉपडाउन बंद करने के लिए Effect
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Developer API",
      icon: Webhook,
      href: "/dashboard/developer-api",
    },
    {
      title: "Logs",
      icon: Activity,
      children: [
        {
          title: "Login History",
          href: "/dashboard/logs",
        },
        {
          title: "Audit Logs",
          href: "/dashboard/logs/audit",
        },
      ],
    },
    ...(isSuperAdmin
      ? [
          {
            title: "Users",
            icon: User,
            children: [
              {
                title: "Users List",
                href: "/dashboard/user-management/users",
              },
              {
                title: "Packages",
                href: "/dashboard/user-management/packages",
              },
            ],
          },
          {
            title: "Commission",
            icon: CirclePercent,
            href: "/dashboard/commission-management",
          },
          {
            title: "Settings",
            icon: Settings,
            children: [
              {
                title: "General Settings",
                href: "/dashboard/settings",
              },
              {
                title: "API Integration",
                href: "/dashboard/settings/api-integration",
              },
              {
                title: "Docs Configuration",
                href: "/dashboard/settings/docs-Configuration",
              },
            ],
          },
        ]
      : []),
  ];

  const isItemActive = (item) => {
    if (item.href) {
      return pathname === item.href;
    }
    if (item.children) {
      return item.children.some((child) => pathname.startsWith(child.href));
    }
    return false;
  };

  const handleCredentialOpen = async () => {
    try {
      if (credential) {
        setModalOpen(true);
        return;
      }
      try {
        const res = await getCredentials.mutateAsync(user.id);
        setCredential(res.data);
      } catch (err) {
        if (err?.response?.status === 404) {
          const created = await createApiKey.mutateAsync({
            userId: user.id,
          });
          setCredential(created.data);
        } else {
          throw err;
        }
      }
      setModalOpen(true);
    } catch (e) {
      alert(e?.message || "Credential error");
    }
  };

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        dispatch(logout());
        localStorage.removeItem("user");
        router.replace("/login");
      },
    });
  };

  const toggleDropdown = (title) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs backdrop-blur-md bg-white/95">
        <div className="h-18 px-4 lg:px-8 flex items-center justify-between">
          
          {/* Left Logo / Company Profile */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <h1 className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                {user?.companyName || "Azzunique"}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded-md mt-0.5 w-max">
                {user?.role?.replace("_", " ") || "SUPER ADMIN"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item);
              const isDropdownOpen = openDropdown === item.title;

              return (
                <div key={item.title} className="relative py-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        active
                          ? "bg-sky-50 text-sky-600 font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={16} className={active ? "text-sky-600" : "text-slate-400"} />
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      {/* Click toggle handler */}
                      <button
                        onClick={() => toggleDropdown(item.title)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                          active || isDropdownOpen
                            ? "bg-sky-50 text-sky-600 font-semibold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <Icon size={16} className={active || isDropdownOpen ? "text-sky-600" : "text-slate-400"} />
                        {item.title}
                        <ChevronDown size={14} className={`opacity-70 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {/* State-based open/close */}
                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-52 bg-white border border-slate-200/80 rounded-2xl shadow-xl mt-1 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                          {item.children?.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpenDropdown(null)}
                                className={`block px-3.5 py-2.5 text-sm rounded-xl transition-all ${
                                  isChildActive
                                    ? "bg-sky-50 text-sky-600 font-medium"
                                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                                }`}
                              >
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-4">
            {isApiHolder && (
              <button
                onClick={handleCredentialOpen}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100/80 border border-sky-100 transition-all"
              >
                View Credential
              </button>
            )}

            {/* Profile Action Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-slate-700 capitalize">
                  {user?.fullName || "Profile"}
                </span>
                <ChevronDown size={14} className="text-slate-400 hidden sm:inline" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setShowProfileMenu(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <User size={15} className="text-slate-400" />
                    My Profile
                  </Link>

                  <div className="h-px bg-slate-100 my-1" />

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-600 rounded-xl hover:bg-red-50/70 transition-colors"
                  >
                    <LogOut size={15} />
                    {isPending ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 text-slate-600 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Improved Mobile Drawer Style Navigation */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-3 py-2 space-y-1 shadow-inner max-h-[calc(100vh-4rem)] overflow-y-auto">
            {menuItems.map((item) => {
              const active = isItemActive(item);
              
              if (item.href) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenu(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                      active
                        ? "bg-sky-50 text-sky-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              }
              
              return (
                <div key={item.title} className="space-y-0.5">
                  <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                    {item.title}
                  </div>
                  {item.children?.map((child) => {
                    const isChildActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileMenu(false)}
                        className={`block px-6 py-2.5 rounded-xl text-sm font-medium ${
                          isChildActive
                            ? "bg-sky-50 text-sky-600"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {child.title}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </header>

      <ApiKeyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={credential}
        role={user?.role}
        loading={updateApiKey.isPending}
      />
    </>
  );
}