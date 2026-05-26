"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Settings, ChevronDown, User, LogOut } from "lucide-react";

import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";
import usePermission from "@/hooks/usePermission";

import {
  useGetCredentials,
  useCreateApiKey,
  useUpdateApiKey,
} from "@/hooks/useApiKey";

import ApiKeyModal from "./modals/ApiKeyModal";

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [credential, setCredential] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.auth.user);

  const { isApiHolder, isSuperAdmin } = usePermission();
  const { mutate: logoutUser, isPending } = useLogout();
  const getCredentials = useGetCredentials();
  const createApiKey = useCreateApiKey();
  const updateApiKey = useUpdateApiKey();

  // OPEN MODAL
  const handleCredentialOpen = async () => {
    try {
      // already local
      if (credential) {
        setModalOpen(true);
        return;
      }

      try {
        // GET EXISTING
        const res = await getCredentials.mutateAsync(user.id);

        setCredential(res.data);

        setModalOpen(true);
      } catch (err) {
        // FIRST TIME CREATE
        if (err?.status === 404 || err?.response?.status === 404) {
          const created = await createApiKey.mutateAsync({
            userId: user.id,
          });

          setCredential(created.data);

          setModalOpen(true);
        } else {
          throw err;
        }
      }
    } catch (e) {
      console.log(e);

      alert(e?.message || "Credential error");
    }
  };

  // CHANGE FIELD
  const handleCredentialChange = (field, value, index) => {
    if (field === "allowedIps") {
      const ips = [...(credential?.allowedIps || [])];

      ips[index] = value;

      setCredential({
        ...credential,
        allowedIps: ips,
      });

      return;
    }

    setCredential({
      ...credential,
      [field]: value,
    });
  };

  // ADD IP
  const handleAddIp = () => {
    setCredential({
      ...credential,
      allowedIps: [...(credential?.allowedIps || []), ""],
    });
  };

  // REMOVE IP
  const handleRemoveIp = (index) => {
    const ips = credential.allowedIps.filter((_, i) => i !== index);

    setCredential({
      ...credential,
      allowedIps: ips,
    });
  };

  // UPDATE
  const handleCredentialUpdate = async () => {
    try {
      let payload = {};

      // API HOLDER
      if (isApiHolder) {
        payload = {
          allowedIps: credential.allowedIps,
        };
      }

      // SUPER ADMIN
      else if (isSuperAdmin) {
        payload = {
          name: credential.name,
          callbackUrl: credential.callbackUrl,
          allowedIps: credential.allowedIps,
          maxIpLimit: credential.maxIpLimit,
          requestsPerMinute: credential.requestsPerMinute,
          requestsPerDay: credential.requestsPerDay,
          remarks: credential.remarks,
          isActive: credential.isActive,
        };
      }

      const res = await updateApiKey.mutateAsync({
        id: credential.id,
        payload,
      });

      setCredential(res.data);
      alert("Updated successfully");
    } catch (e) {
      alert(e?.message || "Update failed");
    }
  };

  // LOGOUT
  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        dispatch(logout());

        localStorage.removeItem("user");

        setShowProfileMenu(false);

        router.replace("/login");
      },

      onError: (error) => {
        console.log(error);

        alert(error?.message || "Logout failed");
      },
    });
  };

  return (
    <>
      <header className="h-16 md:h-20 border-b border-gray-100 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2 ml-auto">
          {/* Credential */}
          {isApiHolder && (
            <button
              onClick={handleCredentialOpen}
              className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-600"
            >
              View Credential
            </button>
          )}

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center overflow-hidden text-white font-semibold">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user?.fullName?.charAt(0)?.toUpperCase() || "U"
                )}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold capitalize">{user?.fullName}</p>

                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>

              <ChevronDown size={14} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border shadow overflow-hidden">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                >
                  <User size={16} />
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  disabled={isPending}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />

                  {isPending ? "Logging out..." : "Log out"}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* API MODAL */}
      <ApiKeyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={credential}
        role={user?.role}
        loading={updateApiKey.isPending}
        onChange={handleCredentialChange}
        onAddIp={handleAddIp}
        onRemoveIp={handleRemoveIp}
        onSubmit={handleCredentialUpdate}
      />
    </>
  );
}
