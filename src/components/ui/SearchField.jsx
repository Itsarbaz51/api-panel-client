"use client";

import { Search, X } from "lucide-react";

export default function SearchField({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-theme focus:border-transparent transition-all text-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X size={14} className="text-slate-400 hover:text-slate-600" />
        </button>
      )}
    </div>
  );
}