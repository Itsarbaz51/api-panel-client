"use client";

import React, { useState } from "react";
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

  const user = useSelector((state) => state.auth.user);

  const { isApiHolder, isSuperAdmin } = usePermissionChecker();

  const { mutate: logoutUser, isPending } = useLogout();

  const getCredentials = useGetCredentials();
  const createApiKey = useCreateApiKey();
  const updateApiKey = useUpdateApiKey();

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
                title: "Users",
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
                title: "General",
                href: "/dashboard/settings",
              },
              {
                title: "API Integration",
                href: "/dashboard/settings/api-integration",
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

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="h-16 px-4 lg:px-8 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-8">
            <div>
              <h1 className="font-bold text-slate-800">
                {user?.companyName || "API_PORTAL"}
              </h1>

              <p
                className="text-[10px] uppercase text-theme
"
              >
                {user?.role}
              </p>
            </div>

            {/* Desktop Menu */}
          </div>
          <nav className="hidden lg:flex items-center gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active = isItemActive(item);

              return (
                <div key={item.title} className="relative group">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                        active
                          ? "bg-theme/10 text-theme font-semibold"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <Icon size={16} />
                      {item.title}
                    </Link>
                  ) : (
                    <>
                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
                          active
                            ? "bg-theme/10 text-theme font-semibold"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <Icon size={16} />
                        {item.title}
                        <ChevronDown size={14} />
                      </button>

                      <div
                        className="
              absolute top-full left-0 
              w-56 bg-white border border-slate-200
              rounded-2xl shadow-xl
              opacity-0 invisible
              group-hover:opacity-100
              group-hover:visible
              transition-all duration-200
              z-50
            "
                      >
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-3 text-sm ${
                              pathname === child.href
                                ? "bg-theme/10 text-theme font-medium"
                                : "hover:bg-slate-50"
                            }`}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {isApiHolder && (
              <button
                onClick={handleCredentialOpen}
                className="hidden md:block px-4 py-2 rounded-xl bg-theme/10 text-theme
"
              >
                View Credential
              </button>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-theme/100 flex items-center justify-center text-white font-semibold">
                  {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span>{user?.fullName}</span>

                <ChevronDown size={16} />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-2xl shadow-lg overflow-hidden">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
                  >
                    <User size={16} />
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    {isPending ? "Logging out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenu && (
          <div className="lg:hidden border-t bg-white">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 border-b hover:bg-slate-50"
              >
                {item.title}
              </Link>
            ))}
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
