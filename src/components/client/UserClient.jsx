"use client";

import { useEffect, useState } from "react";
import { Users, UserPlus, UserCheck, UserX } from "lucide-react";

import UsersTable from "@/components/tables/UsersTable";
import QuickStats from "@/components/QuickStats";
import UserModal from "../modals/UserModal";
import View from "../ui/View";
import Header from "../ui/Header";
import Button from "@/components/ui/Button";

import {
  useGetAllUsers,
  useCreateUser,
  useUpdateUser,
  useGetOneUser,
  useGetCredentials,
} from "@/hooks/useUser";

import { useGetAll } from "@/hooks/usePackage";
import CredentialsModal from "../ui/Credentials";

export default function UserClient() {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);

  const [editingUser, setEditingUser] = useState(null);

  const [viewUser, setViewUser] = useState(null);

  const [credentialOpen, setCredentialOpen] = useState(false);

  const [credentials, setCredentials] = useState(null);

  const limit = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const { data: usersResponse, refetch } = useGetAllUsers({
    page: currentPage,
    limit,
    search: searchTerm,
  });

  const { data: packageData, isLoading: packageLoading } = useGetAll({
    page: 1,
    limit: 100,
    search: "",
  });

  const createUser = useCreateUser();

  const updateUser = useUpdateUser();

  const getOneUser = useGetOneUser();

  const getCredentials = useGetCredentials();

  const allUsers = usersResponse?.data || [];

  const filteredUsers = allUsers.filter(
    (user) =>
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const total = filteredUsers.length;

  const activeUsers = filteredUsers.filter(
    (user) => user?.status === "ACTIVE",
  ).length;

  const inactiveUsers = filteredUsers.filter(
    (user) => user?.status === "IN_ACTIVE",
  ).length;

  const users = filteredUsers.slice(
    (currentPage - 1) * limit,
    currentPage * limit,
  );

  const handleSubmit = async (payload) => {
    try {
      let res;

      if (editingUser?.id) {
        res = await updateUser.mutateAsync({
          id: editingUser.id,
          payload,
        });
      } else {
        res = await createUser.mutateAsync(payload);
      }

      await refetch();

      setOpenModal(false);

      setEditingUser(null);

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  };

  const handleEdit = async (user) => {
    try {
      const res = await getOneUser.mutateAsync(user.id);

      setEditingUser(res?.data);

      setOpenModal(true);
    } catch {}
  };

  const handleView = async (user) => {
    try {
      const res = await getOneUser.mutateAsync(user.id);

      setViewUser(res?.data);

      setViewOpen(true);
    } catch {}
  };

  const handleViewPassword = async (user) => {
    try {
      const res = await getCredentials.mutateAsync(user.id);

      setCredentials(res?.data);

      setCredentialOpen(true);
    } catch {}
  };

  return (
    <div className="space-y-8">
      <Header
        title="User Management"
        subtitle="Manage users"
        actions={
          <Button
            leftIcon={<UserPlus />}
            onClick={() => {
              setEditingUser(null);

              setOpenModal(true);
            }}
          >
            Add User
          </Button>
        }
      />

      <QuickStats
        stats={[
          {
            title: "Total Users",
            value: total,
            icon: Users,
          },
          {
            title: "Active",
            value: activeUsers,
            icon: UserCheck,
          },
          {
            title: "Inactive",
            value: inactiveUsers,
            icon: UserX,
          },
        ]}
      />

      <UsersTable
        users={users}
        total={total}
        page={currentPage}
        perPage={limit}
        search={searchTerm}
        onSearch={setSearchTerm}
        onPageChange={setCurrentPage}
        onEdit={handleEdit}
        onView={handleView}
        onViewPassword={handleViewPassword}
      />

      <UserModal
        open={openModal}
        initialData={editingUser}
        onSubmit={handleSubmit}
        packages={packageData?.data || []}
        packageLoading={packageLoading}
        onClose={() => {
          setOpenModal(false);

          setEditingUser(null);
        }}
      />

      <View
        open={viewOpen}
        title="User Details"
        data={viewUser}
        onClose={() => {
          setViewOpen(false);

          setViewUser(null);
        }}
      />

      <CredentialsModal
        open={credentialOpen}
        data={credentials}
        onClose={() => {
          setCredentialOpen(false);

          setCredentials(null);
        }}
      />
    </div>
  );
}
