"use client";

import React, { useState } from "react";
import SearchField from "@/components/ui/SearchField";
import Header from "@/components/ui/Header";
import UsersTable from "@/components/tables/UsersTable";
import Button from "@/components/ui/Button";

const dummyUsers = [
  { id: 1, name: "Arjun Sharma", email: "arjun@example.com", role: "Admin", status: "ACTIVE", joined: "12 May 2024" },
  { id: 2, name: "Sneha Patel", email: "sneha.p@company.in", role: "Editor", status: "INACTIVE", joined: "05 Jan 2024" },
  { id: 3, name: "Rahul Verma", email: "rahul.v@dev.com", role: "Viewer", status: "ACTIVE", joined: "20 Mar 2024" },
  { id: 4, name: "Priya Singh", email: "priya@startup.io", role: "Admin", status: "ACTIVE", joined: "15 Feb 2024" },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = dummyUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = () => {
    console.log('Add new member clicked');
  };

  const handleViewUser = (user) => {
    console.log('View user details:', user);
  };

  const handleEditUser = (user) => {
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (user) => {
    console.log('Delete user:', user);
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] p-4 md:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] overflow-hidden">
        
        <Header
          label="Operational Workspace"
        />

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            <SearchField 
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-[450px]"
            />
            <Button 
              variant="dark"
              size="lg"
              onClick={handleAddMember}
              className="w-full md:w-auto"
            >
              Add New Member
            </Button>
          </div>
        </div>

        <UsersTable 
          users={filteredUsers}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />

        <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex justify-between items-center px-10">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            Showing {filteredUsers.length} Users
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous Page
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next Page
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}