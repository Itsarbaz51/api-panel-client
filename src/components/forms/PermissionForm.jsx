"use client";

import { useEffect, useState } from "react";

import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";

export default function PermissionForm({
  services = [],
  selectedItem,
  scope = "USER",
  onCancel,
  onSubmit,
}) {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (!services.length) return;

    const mapped = services.map((service) => {
      const existing = selectedItem?.permissions?.find(
        (p) => p.serviceId === service.id,
      );

      return {
        id: existing?.id || null,

        serviceId: service.id,

        serviceName: service.name,

        canView: existing?.canView ?? true,

        canProcess: existing?.canProcess ?? true,

        isActive: existing?.isActive ?? true,

        exists: !!existing,
      };
    });

    setPermissions(mapped);
  }, [services, selectedItem]);

  const handlePermissionChange = (serviceId, field, value) => {
    setPermissions((prev) =>
      prev.map((item) =>
        item.serviceId === serviceId
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    await onSubmit(permissions);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="rounded-xl border bg-slate-50 p-4">
        <div className="font-semibold text-lg">
          {scope === "USER" ? selectedItem?.fullName : selectedItem?.name}
        </div>

        <div className="text-sm text-slate-500">
          {scope === "USER"
            ? selectedItem?.registrationNumber
            : "Package Permission"}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="">
            <tr>
              <th className="w-[40%] text-left px-4 py-3">Service</th>
              <th className="w-[20%] text-center px-4 py-3">Can View</th>
              <th className="w-[20%] text-center px-4 py-3">Can Process</th>
              <th className="w-[20%] text-center px-4 py-3">Active</th>
            </tr>
          </thead>

          <tbody>
            {permissions.map((service) => (
              <tr key={service.serviceId} className="border-t">
                <td className="p-3 font-medium">{service.serviceName}</td>

                <td className="p-3">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={service.canView}
                      onChange={(e) =>
                        handlePermissionChange(
                          service.serviceId,
                          "canView",
                          e.target.checked,
                        )
                      }
                    />
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={service.canProcess}
                      onChange={(e) =>
                        handlePermissionChange(
                          service.serviceId,
                          "canProcess",
                          e.target.checked,
                        )
                      }
                    />
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex justify-center">
                    <Checkbox
                      checked={service.isActive}
                      onChange={(e) =>
                        handlePermissionChange(
                          service.serviceId,
                          "isActive",
                          e.target.checked,
                        )
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">Save Permissions</Button>
      </div>
    </form>
  );
}
