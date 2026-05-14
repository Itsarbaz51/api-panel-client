"use client";

import { useState } from "react";

import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
} from "lucide-react";

import UsersTable from "@/components/tables/UsersTable";
import QuickStats from "@/components/QuickStats";
import UserModal from "../modals/UserModal";
import { dummyUsers } from "../dummyData";



export default function UserClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(dummyUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // FILTER USERS
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ADD USER
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
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] p-4 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">

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
                value: users.filter((u) => u.status === "ACTIVE").length,
                icon: UserCheck,
                },
                {
                title: "Inactive Users",
                value: users.filter((u) => u.status === "INACTIVE").length,
                icon: UserX,
                },
                {
                title: "Admins",
                value: users.filter((u) => u.role === "Admin").length,
                icon: ShieldCheck,
                },
            ]}
        />

        {/* MAIN CARD */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden">

          {/* USERS TABLE */}
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

          {/* FOOTER */}
          
        </div>
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