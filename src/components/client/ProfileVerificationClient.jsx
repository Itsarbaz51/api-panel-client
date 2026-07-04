"use client";

import { useState } from "react";
import { Users, UserPlus, UserCheck, UserX } from "lucide-react";

import Header from "../ui/Header";
import QuickStats from "@/components/QuickStats";
import ProfileVerificationTable from "@/components/tables/ProfileVerificationTable";

import { useGetAllKyc, useUpdateKyc } from "@/hooks/useProfileVerification";
import ProfileVerificationView from "../ProfileVerificationView";
import ConfirmDialog from "../ConfirmDialog";

export default function ProfileVerificationClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedKyc, setSelectedKyc] = useState(null);

  const [verifiedOpen, setVerifiedOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const limit = 10;
  const { mutate: updateKyc, isPending } = useUpdateKyc();

  const { data: kycResponse, refetch } = useGetAllKyc({
    page: currentPage,
    limit,
    search: searchTerm,
  });

  const allKycs = kycResponse?.data?.data || [];

  const total = kycResponse?.data?.total || 0;

  const pending = allKycs.filter((item) => item.status === "PENDING").length;

  const verified = allKycs.filter((item) => item.status === "VERIFIED").length;

  const rejected = allKycs.filter((item) => item.status === "REJECTED").length;

  const handleVerified = () => {
    if (!selectedKyc) return;

    updateKyc(
      {
        id: selectedKyc.id,
        payload: {
          status: "VERIFIED",
        },
      },
      {
        onSuccess: () => {
          setVerifiedOpen(false);
          setSelectedKyc(null);
          refetch();
        },
      },
    );
  };

  const handleReject = () => {
    if (!selectedKyc) return;

    if (!rejectReason.trim()) {
      return alert("Reject reason is required");
    }

    updateKyc(
      {
        id: selectedKyc.id,
        payload: {
          status: "REJECTED",
          rejectionReason: rejectReason,
        },
      },
      {
        onSuccess: () => {
          setRejectOpen(false);
          setSelectedKyc(null);
          setRejectReason("");
          refetch();
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      <Header
        title="KYC Management"
        subtitle="Manage Profile Verification Requests"
      />

      <QuickStats
        stats={[
          {
            title: "Total KYC",
            value: total,
            icon: Users,
          },
          {
            title: "Pending",
            value: pending,
            icon: UserPlus,
          },
          {
            title: "Verified",
            value: verified,
            icon: UserCheck,
          },
          {
            title: "Rejected",
            value: rejected,
            icon: UserX,
          },
        ]}
      />

      <ProfileVerificationTable
        users={allKycs}
        total={total}
        page={currentPage}
        perPage={limit}
        search={searchTerm}
        onSearch={setSearchTerm}
        onPageChange={setCurrentPage}
        onView={(row) => {
          setSelectedKyc(row);
          setViewOpen(true);
        }}
        onVerified={(row) => {
          setSelectedKyc(row);
          setVerifiedOpen(true);
        }}
        onReject={(row) => {
          setSelectedKyc(row);
          setRejectOpen(true);
        }}
      />

      <ProfileVerificationView
        open={viewOpen}
        onClose={() => {
          setViewOpen(false);
          setSelectedKyc(null);
        }}
        data={selectedKyc}
      />
      <ConfirmDialog
        open={verifiedOpen}
        onClose={() => {
          setVerifiedOpen(false);
          setSelectedKyc(null);
        }}
        onConfirm={handleVerified}
        title="Verified KYC"
        description="Are you sure you want to verify this KYC?"
        confirmText="Verify"
        variant="success"
        loading={isPending}
      />

      <ConfirmDialog
        open={rejectOpen}
        onClose={() => {
          setRejectOpen(false);
          setSelectedKyc(null);
          setRejectReason("");
        }}
        onConfirm={handleReject}
        title="Reject KYC"
        description="Please provide the reason for rejecting this KYC."
        confirmText="Reject"
        variant="danger"
        loading={isPending}
        showReason
        reason={rejectReason}
        setReason={setRejectReason}
      />
    </div>
  );
}
