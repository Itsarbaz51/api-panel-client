"use client";

import Button from "@/components/ui/Button";

export default function CredentialsModal({ open, onClose, data }) {
  if (!open) return null;

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text || "");
      alert("Copied!");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-[450px] p-6">
        <h2 className="text-2xl font-bold">User Credentials</h2>

        <div className="space-y-5 mt-6">
          {/* Password */}
          <div>
            <label className="font-medium">Password</label>

            <div className="border rounded-xl p-3 flex items-center justify-between gap-3">
              <span>{data?.password}</span>

              <button
                onClick={() => handleCopy(data?.password)}
                className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-100"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Transaction Pin */}
          <div>
            <label className="font-medium">Transaction Pin</label>

            <div className="border rounded-xl p-3 flex items-center justify-between gap-3 cursor-pointer">
              <span>{data?.transactionPin}</span>

              <button
                onClick={() => handleCopy(data?.transactionPin)}
                className="text-sm px-3 py-1 rounded-lg border hover:bg-gray-100 cursor-pointer"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
