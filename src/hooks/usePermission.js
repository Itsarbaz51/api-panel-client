"use client";

import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function usePermission() {
  const user = useSelector((state) => state.auth.user);

  const role = user?.role;
  const permissions = user?.permissions || [];

  const isSuperAdmin = role === "SUPER_ADMIN";
  const isApiHolder = role === "API_HOLDER";

  const hasRole = (roles = []) => roles.includes(role);

  const hasPermission = (permission) =>
    isSuperAdmin || isApiHolder || permissions.includes(permission);

  return useMemo(
    () => ({
      user,
      role,
      permissions,
      isSuperAdmin,
      isApiHolder,
      hasRole,
      hasPermission,
    }),
    [user, role, permissions],
  );
}
