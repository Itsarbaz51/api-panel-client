"use client";

import TabsNav from "@/components/details/TabsNav";
import { Building2 } from "lucide-react";
import { Users } from "lucide-react";

export default function UserManagementLayout({ children }) {

  const tabs = [
    {
      label: "Users",
      value: "users",
      icon: Users,
    },
    {

      label: "Packages",
      value: "packages",
      icon: Building2,
    },
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold">User Management</h1>
        <p className="text-sm text-muted-foreground">Manage users and packages</p>
      </div>

      <TabsNav tabs={tabs} basePath="/dashboard/user-management" />

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
