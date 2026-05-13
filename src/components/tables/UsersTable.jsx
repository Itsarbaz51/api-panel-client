"use client";

import React from "react";
import UserRow from "@/components/ui/UserRow";

// Table Components
import TableShell from "@/components/tables/core/TableShell";
import TableHeader from "@/components/tables/core/TableHeader";
import TableBody from "@/components/tables/core/TableBody";
import DataTableSearchEmpty from "@/components/tables/core/DataTableSearchEmpty";

export default function UserTable({
  users,
  onViewUser,
  onEditUser,
  onDeleteUser,
}) {
  if (users.length === 0) {
    return (
      <div className="px-8 pb-8">
        <DataTableSearchEmpty
          title="No users found"
          description="There are no users available right now."
        />
      </div>
    );
  }

  const columns = [
    "User Details",
    "Role",
    "Status",
    "Date Joined",
    "Actions",
  ];

  return (
    <div className="px-4 pb-8">
      <TableShell>
        
        {/* Header */}
        <TableHeader columns={columns} />

        {/* Body */}
        <TableBody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onView={onViewUser}
              onEdit={onEditUser}
              onDelete={onDeleteUser}
            />
          ))}
        </TableBody>

      </TableShell>
    </div>
  );
}