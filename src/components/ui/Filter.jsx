"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check, Filter } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FilterDropdown({
  value,
  onChange,
  options = [],
  placeholder = "Filter",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const activeOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className="flex items-center flex-row gap-2 px-5  py-2.5 bg-white border-slate-200 hover:bg-slate-50"
      >
        <div className="flex items-center flex-row gap-2">
          <Filter size={14} className="text-slate-500" />
          <span>{activeOption?.label || placeholder}</span>
          <ChevronDown
            size={14}
            className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 z-20 overflow-hidden">
            <div className="p-1">
              {options.map((opt) => {
                const isActive = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isActive && <Check size={14} className="" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
