"use client";

import { CheckCircle, XCircle, Shield } from "lucide-react";

export default function PermissionCard({ permission }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-foreground">
            {permission.serviceName}
          </h3>

          <p className="text-sm text-muted-foreground">
            {permission.serviceCode}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            permission.source === "USER"
              ? "bg-primary/10 text-primary"
              : "bg-accent text-accent-foreground"
          }`}
        >
          {permission.source}
        </span>
      </div>

      <div className="space-y-3">
        <StatusRow label="Permission" value={permission.hasPermission} />

        <StatusRow label="Can View" value={permission.canView} />

        <StatusRow label="Can Process" value={permission.canProcess} />
      </div>
    </div>
  );
}

function StatusRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>

      <div
        className={`flex items-center gap-1 text-sm font-medium ${
          value ? "text-success" : "text-destructive"
        }`}
      >
        {value ? (
          <CheckCircle className="h-4 w-4" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}

        {value ? "Yes" : "No"}
      </div>
    </div>
  );
}
