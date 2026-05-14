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
  Menu // Hamburger menu icon for mobile if needed
} from "lucide-react";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 md:h-20  border-b border-gray-100 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Left Side: Search Bar (Hidden on small mobile, visible on tablet/desktop) */}
      <div className="flex items-center flex-1 max-w-xs md:max-w-md">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-emerald-500 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2 border md:py-2.5 border-gray-200 rounded-xl bg-gray-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-1 md:gap-4 ml-2 md:ml-auto">
        
        {/* Quick Action Icons (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-1 border-r border-gray-100 pr-4 mr-2">
          <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-emerald-600 rounded-xl transition-all" title="Messages">
            <MessageCircle size={20} />
          </button>
          
          <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-emerald-600 rounded-xl transition-all" title="Full Screen">
            <Maximize size={20} />
          </button>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 md:p-2.5 text-gray-500 hover:bg-gray-100 hover:text-emerald-600 rounded-xl transition-all relative"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-[-50px] md:right-0 mt-3 w-72 md:w-80 bg-white border border-gray-100 rounded-2xl shadow-xl py-4 z-50">
              <div className="px-4 pb-2 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-sm text-gray-800">Notifications</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-bold">4 NEW</span>
              </div>
              <div className="max-h-60 overflow-y-auto py-2">
                <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                  <p className="text-xs text-gray-800 font-medium">New Student Enrollment</p>
                  <p className="text-[10px] text-gray-400 mt-1">2 minutes ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 md:p-1.5 hover:bg-gray-100 rounded-2xl transition-all"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-md shadow-emerald-100">
              JD
            </div>
            
            {/* Desktop Only Text */}
            <div className="hidden sm:block text-left mr-1">
              <p className="text-[12px] md:text-[13px] font-bold text-gray-800 leading-none">John Doe</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold tracking-wider">Admin</p>
            </div>
            
            <ChevronDown size={14} className={`text-gray-400 transition-transform hidden sm:block ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 md:w-56 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-50 md:hidden">
                <p className="text-xs font-bold text-gray-800">John Doe</p>
                <p className="text-[10px] text-gray-400 uppercase">Admin</p>
              </div>
              <div className="px-4 py-2 border-b border-gray-50 hidden md:block">
                <p className="text-xs font-medium text-gray-400">Account Settings</p>
              </div>

              <Link 
                href="/dashboard/profile" 
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              >
                <User size={16} /> My Profile
              </Link>

              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                <Settings size={16} /> Preferences
              </button>

              <div className="my-1 border-t border-gray-50"></div>
              
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors font-medium">
                <LogOut size={16} /> Log out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}