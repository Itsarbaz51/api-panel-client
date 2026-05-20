"use client";

import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import Button from "@/components/ui/Button";

const VARIANTS = {
  danger: {
    icon: AlertTriangle,
    iconClass: "text-red-500",
    titleClass: "text-red-600",
  },
  success: {
    icon: CheckCircle,
    iconClass: "text-green-500",
    titleClass: "text-green-600",
  },
  info: {
    icon: Info,
    iconClass: "text-blue-500",
    titleClass: "text-blue-600",
  },
};

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description,
  confirmText = "",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}) {
  if (!open) return null;

  const Icon = VARIANTS[variant]?.icon || AlertTriangle;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-8 backdrop-blur-lg ">
      <div className="w-full max-w-md rounded-xl border bg-card shadow-lg">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Icon className={`h-6 w-6 ${VARIANTS[variant]?.iconClass}`} />
          </div>

          <h3
            className={`text-lg font-semibold ${VARIANTS[variant]?.titleClass}`}
          >
            {title}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        <div className={`flex justify-end gap-3 border-t px-6 py-4 `}>
          <Button
            variant={variant === "danger" ? "destructive" : "default"}
            onClick={onConfirm}
            {...(loading ? { loading: true } : {})}
          >
            {loading ? "Loading..." : confirmText && confirmText}
          </Button>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
}
