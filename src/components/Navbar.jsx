"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  Search,
  Bell,
  Settings,
  Maximize,
  MessageCircle,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";


export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { mutate: logoutUser, isPending } = useLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        dispatch(logout());

        localStorage.removeItem("user");

        setShowProfileMenu(false);

        router.replace("/login");
      },

      onError: (error) => {
        console.log(error);
        alert(error?.message || "Logout failed");
      },
    });
  };

  return (
    <header className="h-16 md:h-20 border-b border-gray-100 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">

      {/* Search */}
      <div className="flex items-center flex-1 max-w-xs md:max-w-md">
        <div className="relative w-full group">

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>

          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border rounded-xl bg-gray-50 text-sm"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 ml-auto">

        <div className="hidden lg:flex items-center gap-1">

          <button className="p-2 hover:bg-gray-100 rounded-xl">
            <MessageCircle size={20} />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded-xl">
            <Maximize size={20} />
          </button>

        </div>

        {/* Notification */}
        <div className="relative">

          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl hover:bg-gray-100 relative"
          >
            <Bell size={20} />

            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border shadow">

              <div className="p-4">

                <h3 className="font-semibold">
                  Notifications
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  No notifications
                </p>

              </div>

            </div>
          )}

        </div>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100"
          >

            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
              JD
            </div>

            <div className="hidden sm:block text-left">

              <p className="text-sm font-bold">
                John Doe
              </p>

              <p className="text-xs text-gray-500">
                Admin
              </p>

            </div>

            <ChevronDown size={14} />

          </button>

          {showProfileMenu && (

            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border shadow overflow-hidden">

              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
              >
                <User size={16} />
                My Profile
              </Link>

              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
              >
                <Settings size={16} />
                Preferences
              </button>

              <div className="border-t" />

              <button
                onClick={handleLogout}
                disabled={isPending}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} />

                {isPending
                  ? "Logging out..."
                  : "Log out"}
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}