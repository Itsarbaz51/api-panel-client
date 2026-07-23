"use client";

import { CheckCircle2, XCircle } from "lucide-react";

export default function PreviewStep({ formData }) {
  const getDoc = (type) => formData.documents.find((d) => d.type === type);

  const renderDoc = (title, type) => {
    const doc = getDoc(type);

    const uploaded = !!doc?.file;

    return (
      <div className="flex items-center justify-between rounded-xl border p-4">
        <div>
          <p className="font-semibold">{title}</p>

          {doc?.documentNumber && (
            <p className="text-sm text-slate-500">{doc.documentNumber}</p>
          )}
        </div>

        {uploaded ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-sm font-medium">Uploaded</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-500">
            <XCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Missing</span>
          </div>
        )}
      </div>
    );
  };

  const home = formData.addresses[0];
  const office = formData.addresses[1];

  return (
    <div className="space-y-8">
      {/* Heading */}

      <div>
        <h2 className="text-2xl font-bold">Review Information</h2>

        <p className="mt-2 text-slate-500">
          Please verify all information before submitting.
        </p>
      </div>

      {/* Personal */}

      <div className="rounded-2xl border p-6">
        <h3 className="mb-5 text-lg font-bold">Personal Details</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <PreviewItem label="Full Name" value={formData.fullName} />

          <PreviewItem label="DOB" value={formData.dob} />

          <PreviewItem label="Gender" value={formData.gender} />

          <PreviewItem label="Email" value={formData.email} />

          <PreviewItem label="Phone" value={formData.phoneNumber} />
        </div>
      </div>

      {/* Business */}

      <div className="rounded-2xl border p-6">
        <h3 className="mb-5 text-lg font-bold">Business Details</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <PreviewItem label="Company" value={formData.companyName} />

          <PreviewItem label="Business Type" value={formData.businessType} />

          <PreviewItem label="KYC Type" value={formData.kycType} />

          <PreviewItem label="Remarks" value={formData.remarks || "-"} />
        </div>
      </div>

      {/* Home */}

      <AddressCard title="Home Address" data={home} />

      {/* Office */}

      <AddressCard title="Office Address" data={office} />

      {/* Documents */}

      <div className="rounded-2xl border p-6">
        <h3 className="mb-5 text-lg font-bold">Uploaded Documents</h3>

        <div className="space-y-4">
          {renderDoc("Aadhaar Card", "AADHAR")}

          {renderDoc("PAN Card", "PAN")}

          {renderDoc("GST Certificate", "GST")}

          {renderDoc("User Photo", "USER_PHOTO")}

          {renderDoc("Business Photo", "BUSINESS_PHOTO")}
        </div>
      </div>
    </div>
  );
}

function PreviewItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs uppercase text-slate-500">{label}</p>

      <p className="mt-1 font-semibold">{value || "-"}</p>
    </div>
  );
}

function AddressCard({ title, data }) {
  return (
    <div className="rounded-2xl border p-6">
      <h3 className="mb-5 text-lg font-bold">{title}</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <PreviewItem label="Address" value={data.address} />

        <PreviewItem label="Pincode" value={data.pinCode} />

        <PreviewItem label="State" value={data.state} />

        <PreviewItem label="City" value={data.city} />

        <PreviewItem label="Landmark" value={data.landmark} />
      </div>
    </div>
  );
}
