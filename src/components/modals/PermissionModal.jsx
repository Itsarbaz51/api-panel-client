"use client";

import {
  useCreatePermission,
  useUpdatePermission,
} from "@/hooks/usePermission";

import PermissionForm from "../forms/PermissionForm";

export default function PermissionModal({
  open,
  onClose,
  selectedItem,
  services = [],
  scope = "USER",
  onSuccess,
}) {
  const createPermission = useCreatePermission();
  const updatePermission = useUpdatePermission();

  if (!open || !selectedItem) return null;

  const handleSubmit = async (permissions) => {
    try {
      await Promise.all(
        permissions.map(async (item) => {
          if (item.exists) {
            return updatePermission.mutateAsync({
              id: item.id,
              payload: {
                canView: item.canView,
                canProcess: item.canProcess,
                isActive: item.isActive,
              },
            });
          }

          return createPermission.mutateAsync({
            scope,
            ...(scope === "USER"
              ? { userId: selectedItem.id }
              : { packageId: selectedItem.id }),

            serviceId: item.serviceId,
            canView: item.canView,
            canProcess: item.canProcess,
            isActive: item.isActive,
          });
        }),
      );

      await onSuccess?.();

      onClose();
    } catch (err) {
      console.log(err);

      alert(err?.response?.data?.message || "Permission Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/50" />

      <div className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold">Manage Permissions</h2>

            <p className="text-sm text-slate-500">
              {scope === "USER" ? selectedItem.fullName : selectedItem.name}
            </p>
          </div>

          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          <PermissionForm
            selectedItem={selectedItem}
            services={services}
            scope={scope}
            onCancel={onClose}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
