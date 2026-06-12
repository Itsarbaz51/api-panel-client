"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Check } from "lucide-react";
import Button from "@/components/ui/Button";

export default function SelectField({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  disabled = false,
  error,
  searchable = false,
  onSearch,
  loading = false,
}) {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const ref = useRef(null);

  const safeOptions = Array.isArray(options) ? options : [];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel = safeOptions.find((o) => o.value === value)?.label;

  const filteredOptions = useMemo(() => {
    if (onSearch) return safeOptions;

    return safeOptions.filter((opt) =>
      opt.label?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [safeOptions, search, onSearch]);

  return (
    <div ref={ref} className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium">{label}</label>
      )}

      <div className="relative">
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          icon={ChevronDown}
          iconPosition="right"
          className="w-full justify-between"
        >
          <span className="truncate">{selectedLabel || placeholder}</span>
        </Button>

        {open && (
          <div className="absolute z-50 mt-2 w-full rounded-xl border bg-card shadow-lg overflow-hidden">
            {searchable && (
              <input
                type="text"
                value={search}
                placeholder="Search..."
                onChange={(e) => {
                  const val = e.target.value;

                  setSearch(val);

                  onSearch?.(val);
                }}
                className="w-full border-b px-3 py-2 text-sm outline-none"
              />
            )}

            <div className="max-h-64 overflow-y-auto">
              {loading && (
                <p className="px-4 py-3 text-sm text-muted-foreground">
                  Searching...
                </p>
              )}

              {!loading && filteredOptions.length === 0 && (
                <p className="px-4 py-3 text-sm text-muted-foreground">
                  No results found
                </p>
              )}

              {!loading &&
                filteredOptions.map((opt) => {
                  const active = opt.value === value;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onChange(opt.value);

                        setSearch("");

                        setOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-left text-sm ${
                        active
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-accent"
                      }`}
                    >
                      <span className="truncate">{opt.label}</span>

                      {active && <Check className="w-4 h-4" />}
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">{error.message || error}</p>
      )}
    </div>
  );
}
