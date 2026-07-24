"use client";

import Input from "@/components/ui/InputField";
import Checkbox from "@/components/ui/Checkbox";

export default function AddressStep({
  formData,
  errors,
  sameAddress,
  handleSameAddress,
  handleAddressChange,
}) {
  const home = formData.addresses[0];
  const office = formData.addresses[1];

  return (
    <div className="space-y-10">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Address Details</h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter your home and office address.
        </p>
      </div>

      {/* HOME ADDRESS */}
      <div className="rounded-2xl border p-6">
        <h3 className="mb-6 text-lg font-semibold">Home Address</h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Address"
            value={home.address}
            error={errors?.addresses?.[0]?.address}
            onChange={(e) => handleAddressChange(0, "address", e.target.value)}
          />

          <Input
            label="Pincode"
            value={home.pinCode}
            error={errors?.addresses?.[0]?.pinCode}
            onChange={(e) => handleAddressChange(0, "pinCode", e.target.value)}
            maxLength={6}
          />

          <Input
            label="State"
            value={home.state}
            error={errors?.addresses?.[0]?.state}
            onChange={(e) => handleAddressChange(0, "state", e.target.value)}
          />

          <Input
            label="City"
            value={home.city}
            error={errors?.addresses?.[0]?.city}
            onChange={(e) => handleAddressChange(0, "city", e.target.value)}
          />

          <div className="md:col-span-2">
            <Input
              label="Landmark"
              value={home.landmark}
              error={errors?.addresses?.[0]?.landmark}
              onChange={(e) =>
                handleAddressChange(0, "landmark", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* SAME ADDRESS */}
      <Checkbox
        checked={sameAddress}
        onChange={handleSameAddress}
        label="Office Address is same as Home Address"
      />

      {/* OFFICE ADDRESS */}

      <div className="rounded-2xl border p-6">
        <h3 className="mb-6 text-lg font-semibold">Office Address</h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Address"
            disabled={sameAddress}
            value={office.address}
            error={errors?.addresses?.[1]?.address}
            onChange={(e) => handleAddressChange(1, "address", e.target.value)}
          />

          <Input
            label="Pincode"
            disabled={sameAddress}
            value={office.pinCode}
            error={errors?.addresses?.[1]?.pinCode}
            onChange={(e) => handleAddressChange(1, "pinCode", e.target.value)}
            maxLength={6}
          />

          <Input
            label="State"
            disabled={sameAddress}
            value={office.state}
            error={errors?.addresses?.[1]?.state}
            onChange={(e) => handleAddressChange(1, "state", e.target.value)}
          />

          <Input
            label="City"
            disabled={sameAddress}
            value={office.city}
            error={errors?.addresses?.[1]?.city}
            onChange={(e) => handleAddressChange(1, "city", e.target.value)}
          />

          <div className="md:col-span-2">
            <Input
              label="Landmark"
              disabled={sameAddress}
              value={office.landmark}
              error={errors?.addresses?.[1]?.landmark}
              onChange={(e) =>
                handleAddressChange(1, "landmark", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
