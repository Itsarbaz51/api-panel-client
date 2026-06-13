"use client";

import { useMyPermissions } from "@/hooks/usePermission";
import PermissionCard from "@/components/PermissionCard";

export default function MyPermissionClient() {
  const { data: permissions, isLoading, error } = useMyPermissions();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-44 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive">Failed to load permissions</div>;
  }

  const data = permissions?.data || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {data.map((permission) => (
        <PermissionCard key={permission.serviceId} permission={permission} />
      ))}
    </div>
  );
}
