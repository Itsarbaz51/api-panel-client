"use client";

import { X, Copy, Key, Globe } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CredentialDrawer({
  open,
  onClose,
  data,
  onIpChange,
  onSave,
  loading,
  editableIps = false,
}) {
  if (!open) return null;

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text || "");
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 z-50" onClick={onClose} />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-xl font-bold">API Credentials</h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage API access credentials
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto h-[calc(100%-90px)]">
          {/* API KEY */}
          <div>
            <label className="text-xs font-semibold uppercase">API KEY</label>

            <div className="border rounded-xl p-3 flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <Key size={18} />
                <span className="text-sm break-all">{data?.apiKey || "-"}</span>
              </div>

              <button
                onClick={() => copyText(data?.apiKey)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* SECRET */}
          <div>
            <label className="text-xs font-semibold uppercase">
              SECRET KEY
            </label>

            <div className="border rounded-xl p-3 flex items-center justify-between mt-2">
              <span className="text-sm break-all">
                {data?.secretKey || "-"}
              </span>

              <button
                onClick={() => copyText(data?.secretKey)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* CALLBACK URL */}
          <div>
            <label className="text-xs font-semibold uppercase">
              CALLBACK URL
            </label>

            <div className="border rounded-xl p-3 mt-2 text-sm">
              {data?.callbackUrl || "-"}
            </div>
          </div>

          {/* IPS */}
          <div>
            <label className="text-xs font-semibold uppercase flex items-center gap-2">
              <Globe size={14} />
              Allowed IPs
            </label>

            <div className="space-y-2 mt-2">
              {data?.allowedIps?.length ? (
                data.allowedIps.map((ip, i) => (
                  <input
                    key={i}
                    value={ip}
                    disabled={!editableIps}
                    onChange={(e) => onIpChange?.(i, e.target.value)}
                    className="w-full border rounded-xl p-3 text-sm"
                  />
                ))
              ) : (
                <div className="text-sm text-gray-500">No IP configured</div>
              )}
            </div>
          </div>

          {/* Limits */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase">RPM</label>

              <div className="border rounded-xl p-3 mt-2 text-sm">
                {data?.requestsPerMinute}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase">RPD</label>

              <div className="border rounded-xl p-3 mt-2 text-sm">
                {data?.requestsPerDay}
              </div>
            </div>
          </div>

          {/* SAVE */}
          {editableIps && (
            <Button onClick={onSave} loading={loading} className="w-full mt-4">
              Update IPs
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
