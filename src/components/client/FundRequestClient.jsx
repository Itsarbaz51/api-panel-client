"use client";

import { useEffect, useState } from "react";
import { Landmark, Clock, CheckCircle, XCircle, Plus } from "lucide-react";

import { useSelector } from "react-redux";

import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import QuickStats from "@/components/QuickStats";
import ConfirmDialog from "@/components/ConfirmDialog";

import FundRequestTable from "@/components/tables/FundRequestTable";
import FundRequestModal from "@/components/modals/FundRequestModal";

import {
  useCreateFundRequest,
  useVerifyFundRequest,
} from "@/hooks/useFundRequest";
import { useGetAllTransactions } from "@/hooks/useTransaction";

export default function FundRequestClient() {
  const user = useSelector((s) => s.auth.user);
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const limit = 10;
  const [status, setStatus] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, status]);

  const { data, refetch, isLoading, isFetching } = useGetAllTransactions({
    page: currentPage,
    limit,
    search: searchTerm,
    status,
    service: "FUND_REQUEST",
  });

  const requests = data?.data?.data || [];

  const total = data?.data?.pagination?.total || 0;

  const pending = requests.filter((x) => x.status === "PENDING").length;

  const success = requests.filter((x) => x.status === "SUCCESS").length;

  const failed = requests.filter((x) => x.status === "FAILED").length;

  const createMutation = useCreateFundRequest();

  const verifyMutation = useVerifyFundRequest();

  const handleSubmit = async (payload) => {
    try {
      await createMutation.mutateAsync(payload);

      refetch();

      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const approve = () => {
    verifyMutation.mutate(
      {
        transactionId: selectedRequest?.id,
        action: "APPROVE",
      },
      {
        onSuccess() {
          refetch();

          setApproveOpen(false);

          setSelectedRequest(null);
        },
      },
    );
  };

  const reject = () => {
    verifyMutation.mutate(
      {
        transactionId: selectedRequest?.id,
        action: "REJECT",
        reason: rejectReason,
      },
      {
        onSuccess() {
          refetch();

          setRejectReason("");

          setRejectOpen(false);

          setSelectedRequest(null);
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      <Header
        title="Fund Request"
        subtitle="Manage Bank Fund Requests"
        actions={
          !isSuperAdmin && (
            <Button leftIcon={<Plus />} onClick={() => setOpenModal(true)}>
              New Request
            </Button>
          )
        }
      />

      <QuickStats
        stats={[
          {
            title: "Total",

            value: total,

            icon: Landmark,
          },

          {
            title: "Pending",

            value: pending,

            icon: Clock,
          },

          {
            title: "Success",

            value: success,

            icon: CheckCircle,
          },

          {
            title: "Rejected",

            value: failed,

            icon: XCircle,
          },
        ]}
      />

      <FundRequestTable
        requests={requests}
        total={total}
        page={currentPage}
        perPage={limit}
        search={searchTerm}
        onSearch={setSearchTerm}
        status={status}
        setStatus={setStatus}
        onPageChange={setCurrentPage}
        onApprove={(row) => {
          setSelectedRequest(row);

          setApproveOpen(true);
        }}
        onReject={(row) => {
          setSelectedRequest(row);

          setRejectOpen(true);
        }}
        onRefresh={refetch}
        isLoading={isLoading || isFetching}
      />

      <FundRequestModal
        open={openModal}
        loading={createMutation.isPending}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={approveOpen}
        title="Approve Request"
        description="Are you sure?"
        confirmText="Approve"
        variant="success"
        loading={verifyMutation.isPending}
        onConfirm={approve}
        onClose={() => {
          setApproveOpen(false);

          setSelectedRequest(null);
        }}
      />

      <ConfirmDialog
        open={rejectOpen}
        title="Reject Request"
        description="Enter reject reason."
        confirmText="Reject"
        variant="danger"
        loading={verifyMutation.isPending}
        showReason
        reason={rejectReason}
        setReason={setRejectReason}
        onConfirm={reject}
        onClose={() => {
          setRejectReason("");

          setRejectOpen(false);

          setSelectedRequest(null);
        }}
      />
    </div>
  );
}
