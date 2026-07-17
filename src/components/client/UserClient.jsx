"use client";

import { useEffect, useState } from "react";
import { Users, UserPlus, UserCheck, UserX } from "lucide-react";

import UsersTable from "@/components/tables/UsersTable";
import QuickStats from "@/components/QuickStats";
import UserModal from "../modals/UserModal";
import Header from "../ui/Header";
import Button from "@/components/ui/Button";
import CredentialsModal from "../ui/Credentials";

import {
  useGetAllUsers,
  useCreateUser,
  useUpdateUser,
  useGetOneUser,
  useGetCredentials,
} from "@/hooks/useUser";

import {
  useGetCredentials as useGetApiCredentials,
  useCreateApiKey,
  useUpdateApiKey,
} from "@/hooks/useApiKey";

import { useGetAll } from "@/hooks/usePackage";
import ApiKeyModal from "@/components/modals/ApiKeyModal";
import { useSelector } from "react-redux";
import ConfirmDialog from "../ConfirmDialog";
import PermissionModal from "../modals/PermissionModal";
import { useGetAllServices } from "@/hooks/useService";
import UserProfileModal from "../ui/ViewUser";

export default function UserClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [credentialOpen, setCredentialOpen] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const [apiKeyOpen, setApiKeyOpen] = useState(false);
  const [apiKeyData, setApiKeyData] = useState(null);
  const [apiKeyErrorDialog, setApiKeyErrorDialog] = useState({
    open: false,
    message: "",
  });

  const [permissionDialog, setPermissionDialog] = useState({
    open: false,
    message: "",
  });
  const [permissionOpen, setPermissionOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const limit = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const [status, setStatus] = useState("");

  const {
    data: usersResponse,
    refetch,
    isLoading,
    isFetching,
  } = useGetAllUsers({
    page: currentPage,
    limit,
    search: searchTerm,
    status,
  });

  const { data: packageData, isLoading: packageLoading } = useGetAll({
    page: 1,
    limit: 100,
    search: "",
  });

  const { data: services } = useGetAllServices({
    page: 1,
    limit: 100,
    search: "",
  });

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const getOneUser = useGetOneUser();
  const getCredentials = useGetCredentials();
  const getApiCredentials = useGetApiCredentials();
  const createApiKey = useCreateApiKey();
  const updateApiKey = useUpdateApiKey();

  const users = usersResponse?.data?.data || [];

  const total = usersResponse?.data?.total || 0;

  const activeUsers = users.filter((user) => user.status === "ACTIVE").length;

  const inactiveUsers = users.filter(
    (user) => user.status === "IN_ACTIVE",
  ).length;

  const handleUserModalSubmit = async (payload) => {
    try {
      if (editingUser) {
        await updateUser.mutateAsync({ id: editingUser.id, payload });
      } else {
        await createUser.mutateAsync(payload);
      }

      setOpenModal(false);
      setEditingUser(null);
      try {
        await refetch();
      } catch (err) {
        // ignore refetch errors
      }
    } catch (err) {
      console.log(err);
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

  const handleApiKeyChange = (field, value, index) => {
    if (field === "allowedIps") {
      const ips = [...(apiKeyData?.allowedIps || [])];
      ips[index] = value;

      setApiKeyData((prev) => ({
        ...prev,
        allowedIps: ips,
      }));
      return;
    }

    setApiKeyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddIp = () => {
    setApiKeyData((prev) => ({
      ...prev,
      allowedIps: [...(prev?.allowedIps || []), ""],
    }));
  };

  const handleRemoveIp = (index) => {
    setApiKeyData((prev) => ({
      ...prev,
      allowedIps: prev.allowedIps.filter((_, i) => i !== index),
    }));
  };

  const handleApiKeySubmit = async () => {
    try {
      let payload = {};

      if (user?.role === "SUPER_ADMIN") {
        payload = {
          name: apiKeyData.name || "",
          callbackUrl:
            apiKeyData.callbackUrl == null ? "" : apiKeyData.callbackUrl || "",
          allowedIps: apiKeyData.allowedIps || [],
          maxIpLimit: apiKeyData.maxIpLimit || 0,
          requestsPerMinute: apiKeyData.requestsPerMinute || 0,
          requestsPerDay: apiKeyData.requestsPerDay || 0,
          remarks: apiKeyData.remarks == null ? "" : apiKeyData.remarks || "",
          isActive: apiKeyData.isActive,
        };
      } else {
        payload = {
          allowedIps: apiKeyData.allowedIps || [],
        };
      }

      const res = await updateApiKey.mutateAsync({
        id: apiKeyData.id,
        payload,
      });

      setApiKeyData(res);

      setApiKeyErrorDialog({
        open: true,
        message: "API Key Updated Successfully",
      });

      setApiKeyOpen(false);
    } catch (err) {
      const validationErrors = err?.response?.data?.errors;

      if (Array.isArray(validationErrors) && validationErrors.length) {
        const message = validationErrors
          .map((e) => `• ${e.field}: ${e.message}`)
          .join("\n");

        setApiKeyErrorDialog({
          open: true,
          message,
        });

        return;
      }

      setApiKeyErrorDialog({
        open: true,
        message:
          err?.response?.data?.message ||
          err?.message ||
          "API Key Update Failed",
      });
    }
  };

  const handleViewApiKey = async (selectedUser) => {
    try {
      let res;
      try {
        res = await getApiCredentials.mutateAsync(selectedUser.id);
      } catch (err) {
        if (err?.status === 404 || err?.response?.status === 404) {
          res = await createApiKey.mutateAsync({
            userId: selectedUser.id,
          });
        } else {
          throw err;
        }
      }

      setApiKeyData(res.data);
      setApiKeyOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePermissions = async (user) => {
    setSelectedUser(user);
    setPermissionOpen(true);
  };

  const handlePermissionSuccess = async () => {
    try {
      await refetch();
      setPermissionDialog({
        open: true,
        message: "Permissions Updated Successfully",
      });
    } catch (err) {
      console.log(err);
    }
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
        onView={handleView}
        onEdit={handleEdit}
        onViewPassword={handleViewPassword}
        handleViewApiKey={handleViewApiKey}
        handlePermissions={handlePermissions}
        onRefresh={refetch}
        isLoading={isLoading || isFetching}
        status={status}
        setStatus={setStatus}
      />

      <UserModal
        open={openModal}
        initialData={editingUser}
        onSubmit={handleUserModalSubmit}
        packages={packageData?.data || []}
        packageLoading={packageLoading}
        onClose={() => {
          setOpenModal(false);
          setEditingUser(null);
        }}
      />

      {/* Profile Viewer Popup (Image_8f1761.png context details mapped correctly) */}
      <UserProfileModal
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

      <ApiKeyModal
        open={apiKeyOpen}
        onClose={() => {
          setApiKeyOpen(false);
          setApiKeyData(null);
        }}
        data={apiKeyData}
        role={user?.role}
        loading={updateApiKey?.isPending}
        onChange={handleApiKeyChange}
        onAddIp={handleAddIp}
        onRemoveIp={handleRemoveIp}
        onSubmit={handleApiKeySubmit}
      />
      <PermissionModal
        open={permissionOpen}
        scope="USER"
        selectedItem={selectedUser}
        services={services?.data?.data || []}
        onSuccess={handlePermissionSuccess}
        onClose={() => {
          setPermissionOpen(false);
          setSelectedUser(null);
        }}
      />

      <ConfirmDialog
        open={apiKeyErrorDialog.open}
        onClose={() =>
          setApiKeyErrorDialog({
            open: false,
            message: "",
          })
        }
        title="Notification"
        variant="danger"
        description={apiKeyErrorDialog.message}
        cancelText="Close"
      />

      <ConfirmDialog
        open={permissionDialog.open}
        onClose={() =>
          setPermissionDialog({
            open: false,
            message: "",
          })
        }
        title="Success"
        variant="success"
        description={permissionDialog.message}
        cancelText="Close"
      />
    </div>
  );
}
