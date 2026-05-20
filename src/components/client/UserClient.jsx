"use client";

import { useState } from "react";

import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  UserPlus,
} from "lucide-react";


import UsersTable from "@/components/tables/UsersTable";
import QuickStats from "@/components/QuickStats";
import UserModal from "../modals/UserModal";

import Button from "@/components/ui/Button";

import { dummyUsers } from "../dummyData";
import Header from "../ui/Header";

export default function UserClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(dummyUsers);

  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // FILTER USERS
  const filteredUsers = users.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // ADD / EDIT USER
  const handleAddUser = (data) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                ...data,
              }
            : user
        )
      );

      setEditingUser(null);
    } else {
      const newUser = {
        id: users.length + 1,
        ...data,
        joined: new Date().toLocaleDateString(),
      };

      setUsers((prev) => [...prev, newUser]);
    }

    setOpenModal(false);
  };

  // EDIT USER
  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpenModal(true);
  };

  // DELETE USER
  const handleDeleteUser = (user) => {
    setUsers((prev) =>
      prev.filter((u) => u.id !== user.id)
    );
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <Header
        title="User Management"
        subtitle="Manage platform users, roles and access permissions."
        actions={
          <Button
            variant="primary"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            leftIcon={<UserPlus size={18} />}
            onClick={() => {
              setEditingUser(null);
              setOpenModal(true);
            }}
          >
            Add User
          </Button>
        }
      />

      {/* QUICK STATS */}
      <QuickStats
        stats={[
          {
            title: "Total Users",
            value: users.length,
            icon: Users,
          },
          {
            title: "Active Users",
            value: users.filter(
              (u) => u.status === "ACTIVE"
            ).length,
            icon: UserCheck,
          },
          {
            title: "Inactive Users",
            value: users.filter(
              (u) => u.status === "INACTIVE"
            ).length,
            icon: UserX,
          },
          {
            title: "Admins",
            value: users.filter(
              (u) => u.role === "Admin"
            ).length,
            icon: ShieldCheck,
          },
        ]}
      />

      {/* USERS TABLE */}
      <div className="bg-white rounded-[32px] border border-slate-200/60 shadow-xl overflow-hidden">
        <UsersTable
          users={filteredUsers}
          total={filteredUsers.length}
          page={currentPage}
          perPage={5}
          onPageChange={setCurrentPage}
          search={searchTerm}
          onSearch={setSearchTerm}
          onAddUser={() => {
            setEditingUser(null);
            setOpenModal(true);
          }}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>

      {/* USER MODAL */}
      <UserModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingUser(null);
        }}
        onSubmit={handleAddUser}
        initialData={editingUser}
      />
    </div>
  );
}