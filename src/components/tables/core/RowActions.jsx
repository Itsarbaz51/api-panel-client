"use client";

import { useEffect, useRef, useState } from "react";

import { MoreVertical, Eye, Edit, Trash2 } from "lucide-react";

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
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  /* ================= TOGGLE ================= */

  const toggle = () => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - rect.bottom;

    // open upward if low space
    setOpenUp(spaceBelow < 180);

    setOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-flex" ref={ref}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="
      h-10 w-10 rounded-xl
      bg-primary/10
      hover:bg-primary/20
      border border-border
      transition-all duration-200
    "
      >
        <MoreVertical className="h-4 w-4 text-muted-foreground" />
      </Button>

      {open && (
        <div className=" absolute right-0 top-10">
          <div
            className={`
      
      min-w-52.5
      rounded-2xl border border-border bg-card shadow-2xl
      ${openUp ? "bottom-full mb-2" : "top-full mt-2"}
    `}
          >
            {onView && (
              <MenuItem
                icon={Eye}
                label="View Details"
                onClick={() => {
                  onView();
                  setOpen(false);
                }}
              />
            )}

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

            {extraActions.length > 0 && (
              <>
                <div className="mx-3 h-px bg-border" />

                {extraActions.map((item, i) => (
                  <MenuItem
                    key={i}
                    icon={item.icon}
                    label={item.label}
                    danger={item.danger}
                    onClick={() => {
                      item.onClick();
                      setOpen(false);
                    }}
                  />
                ))}
              </>
            )}

            {onDelete && (
              <>
                <div className="mx-3 h-px bg-border" />

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
        </div>
      )}
    </div>
  );
}

/* ==================================================
   MENU ITEM
================================================== */

function MenuItem({ icon: Icon, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`
        group
        flex
        w-full
        items-center
        gap-3
        px-4
        py-3
        text-sm
        transition-all
        duration-200

        ${
          danger
            ? "text-red-500 hover:bg-red-50"
            : "text-foreground hover:bg-accent"
        }
      `}
    >
      <div
        className={`
          flex
          h-8
          w-8
          items-center
          justify-center
          rounded-lg
          transition

          ${
            danger
              ? "bg-red-100 text-red-500"
              : "bg-primary/10 text-primary group-hover:bg-primary/20"
          }
        `}
      >
        <Icon className="h-4 w-4" />
      </div>

      <span className="font-medium">{label}</span>
      <div className="absolute right-4 -top-2 h-4 w-4 rotate-45 bg-card border-l border-t border-border"></div>
    </button>
  );
}
