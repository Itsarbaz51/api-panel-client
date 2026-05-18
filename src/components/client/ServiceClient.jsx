"use client";

import { useState } from "react";
import {
  RefreshCw,
  Layers,
  CheckCircle,
} from "lucide-react";

import ServicesTable from "@/components/tables/ServicesTable";
import ServiceModal from "@/components/modals/ServiceModal";

import QuickStats from "@/components/QuickStats";
import Button from "@/components/ui/Button";

export default function ServicesClient() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editingService, setEditingService] = useState(null);

  const perPage = 10;

  const [services, setServices] = useState([
    {
      id: 1,
      name: "BBPS",
      code: "BBPS",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Payout",
      code: "PAYOUT",
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "PAN",
      code: "PAN",
      status: "INACTIVE",
    },
  ]);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    {
      title: "Total Services",
      value: services.length,
      icon: Layers,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },

    {
      title: "Active Services",
      value: services.filter((s) => s.status === "ACTIVE").length,
      icon: CheckCircle,
      iconColor: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const handleAdd = () => {
    setEditingService(null);
    setOpenModal(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setOpenModal(true);
  };

  const handleDelete = (service) => {
    setServices((prev) =>
      prev.filter((s) => s.id !== service.id)
    );
  };

  const handleSubmit = (data) => {
    if (editingService) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id
            ? { ...editingService, ...data }
            : s
        )
      );
    } else {
      setServices((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...data,
        },
      ]);
    }

    setOpenModal(false);
  };

  return (
    <>
      <div className="mb-6 flex justify-end">

        <Button
          variant="outline"
          icon={RefreshCw}
        >
          Refresh
        </Button>

      </div>

      <QuickStats stats={stats} />

      <ServicesTable
        services={filteredServices}
        total={filteredServices.length}
        page={page}
        perPage={perPage}
        onPageChange={setPage}
        search={search}
        onSearch={setSearch}
        onAddService={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {openModal && (
        <ServiceModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmit}
          initialData={editingService}
        />
      )}
    </>
  );
}