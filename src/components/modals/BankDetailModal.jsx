"use client";

import Header from "../ui/Header";
import Button from "@/components/ui/Button";
import BankDetailForm from "@/components/forms/BankDetailForm";

export default function BankDetailModal({
  open,
  onClose,
  data,
  users,
  loading,
  onChange,
  onSubmit,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl rounded-3xl bg-card overflow-hidden shadow-2xl">
        <Header
          title={data?.id ? "Update Bank Detail" : "Add Bank Detail"}
          subtitle="Manage bank details"
          actions={
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          }
        />

        <div className="p-6">
          <BankDetailForm
            data={data}
            users={users}
            loading={loading}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}
