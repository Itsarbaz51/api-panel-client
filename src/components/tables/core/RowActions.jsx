"use client";

import { useEffect, useRef, useState } from "react";

import {
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

import Button from "@/components/ui/Button";

export default function RowActions({
  onView,
  onEdit,
  onDelete,
  extraActions = [],
}) {
  const [open, setOpen] = useState(false);

  const [openUp, setOpenUp] = useState(false);

  const ref = useRef(null);

  /* ================= OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClick = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };
  }, []);

  /* ================= TOGGLE ================= */

  const toggle = () => {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    const spaceBelow =
      window.innerHeight - rect.bottom;

    // open upward if low space
    setOpenUp(spaceBelow < 180);

    setOpen((prev) => !prev);
  };

  return (
    <div
      className="relative flex justify-end"
      ref={ref}
    >

      {/* TRIGGER */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="h-9 w-9 rounded-xl"
      >
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </Button>

      {/* DROPDOWN */}
      {open && (
        <div
          className={`absolute right-0 z-50 min-w-[180px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl ${
            openUp
              ? "bottom-full mb-2"
              : "top-full mt-2"
          }`}
        >

          {/* VIEW */}
          {onView && (
            <MenuItem
              icon={Eye}
              label="View"
              onClick={() => {
                onView();
                setOpen(false);
              }}
            />
          )}

          {/* EDIT */}
          {onEdit && (
            <MenuItem
              icon={Edit}
              label="Edit"
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
            />
          )}

          {/* EXTRA ACTIONS */}
          {extraActions.map((a, i) => (
            <MenuItem
              key={i}
              icon={a.icon}
              label={a.label}
              onClick={() => {
                a.onClick();
                setOpen(false);
              }}
            />
          ))}

          {/* DELETE */}
          {onDelete && (
            <>
              <div className="h-px bg-border" />

              <MenuItem
                icon={Trash2}
                label="Delete"
                danger
                onClick={() => {
                  onDelete();
                  setOpen(false);
                }}
              />
            </>
          )}

        </div>
      )}

    </div>
  );
}

/* ==================================================
   MENU ITEM
================================================== */

function MenuItem({
  icon: Icon,
  label,
  onClick,
  danger = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors
        ${
          danger
            ? "text-red-500 hover:bg-red-50"
            : "text-foreground hover:bg-accent"
        }
      `}
    >

      <Icon className="h-4 w-4 shrink-0 opacity-90" />

      <span className="flex-1 text-left">
        {label}
      </span>

    </button>
  );
}