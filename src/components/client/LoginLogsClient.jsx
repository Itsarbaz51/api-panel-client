"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import Header from "../ui/Header";
import QuickStats from "@/components/QuickStats";
import LoginLogsTable from "@/components/tables/LoginLogsTable";

import { useGetAllLogs } from "@/hooks/useLogs";
import { setLogs } from "@/store/logSlice";

export default function LoginLogsClient() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleType, setRoleType] = useState("");

  const limit = 10;

  const { data, isLoading, refetch } = useGetAllLogs({
    page,
    limit,
    search,
    roleType,
  });

  const logs = useSelector((state) => state.logs.logs);

  useEffect(() => {
    if (data?.data?.data) {
      dispatch(setLogs(data.data.data));
    }
  }, [data, dispatch]);

  const stats = [
    {
      title: "Total Login Logs",
      value: data?.data?.total || 0,
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-8">
      <Header title="Login Logs" subtitle="Track user login activities" />

      <QuickStats stats={stats} />

      <div className="bg-white rounded-4xl border border-slate-200/60 shadow-xl overflow-hidden">
        <LoginLogsTable
          logs={logs}
          total={data?.data?.total || 0}
          page={page}
          perPage={limit}
          loading={isLoading}
          search={search}
          onSearch={(value) => {
            setSearch(value);
            setPage(1);
          }}
          roleType={roleType}
          setRoleType={(value) => {
            setRoleType(value);
            setPage(1);
          }}
          onPageChange={setPage}
          onRefresh={refetch}
        />
      </div>
    </div>
  );
}
