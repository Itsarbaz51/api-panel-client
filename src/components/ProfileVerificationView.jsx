"use client";

import Button from "@/components/ui/Button";

const Badge = ({ children, color }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      color === "green"
        ? "bg-green-100 text-green-700"
        : color === "red"
          ? "bg-red-100 text-red-700"
          : color === "yellow"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-slate-100 text-slate-700"
    }`}
  >
    {children}
  </span>
);

const Row = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 py-2 border-b border-slate-100">
    <span className="font-medium text-slate-500">{label}</span>
    <span className="col-span-2 text-slate-900">{value || "-"}</span>
  </div>
);

export default function ProfileVerificationView({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-5">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">KYC Details</h2>

            <p className="text-sm text-slate-500">{data.registrationNumber}</p>
          </div>

          <Button onClick={onClose}>Close</Button>
        </div>

        <div className="p-6 space-y-8">
          {/* User */}
          <div>
            <h3 className="font-semibold text-lg mb-4">User Details</h3>

            <Row label="Name" value={data.fullName} />
            <Row label="Email" value={data.email} />
            <Row label="Phone" value={data.phoneNumber} />
            <Row label="DOB" value={new Date(data.dob).toLocaleDateString()} />
            <Row label="Gender" value={data.gender} />
          </div>

          {/* Business */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Business Details</h3>

            <Row label="Company" value={data.companyName} />
            <Row label="Business Type" value={data.businessType} />
            <Row label="KYC Type" value={data.kycType} />

            <div className="grid grid-cols-3 py-2">
              <span className="font-medium text-slate-500">Status</span>

              <div className="col-span-2">
                <Badge
                  color={
                    data.status === "VERIFIED"
                      ? "green"
                      : data.status === "REJECTED"
                        ? "red"
                        : "yellow"
                  }
                >
                  {data.status}
                </Badge>
              </div>
            </div>

            <Row label="Remarks" value={data.remarks} />
            <Row label="Rejection Reason" value={data.rejectionReason} />
          </div>

          {/* Addresses */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Addresses</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {data.addresses.map((item) => (
                <div key={item.id} className="border rounded-xl p-4">
                  <Badge>{item.type}</Badge>

                  <p className="mt-3">{item.address}</p>

                  <p>
                    {item.city}, {item.state}
                  </p>

                  <p>{item.pinCode}</p>

                  <p>{item.landmark}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Documents</h3>

            {data.documents.length === 0 ? (
              <p className="text-slate-500">No documents uploaded</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {data.documents.map((doc) => (
                  <div key={doc.id} className="border rounded-xl p-4">
                    <Row label="Type" value={doc.type} />
                    <Row label="Number" value={doc.documentNumber} />

                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      className="text-blue-600"
                    >
                      View Document
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Timeline</h3>

            <Row
              label="Created"
              value={new Date(data.createdAt).toLocaleString()}
            />

            <Row
              label="Updated"
              value={new Date(data.updatedAt).toLocaleString()}
            />

            <Row
              label="Verified At"
              value={
                data.verifiedAt
                  ? new Date(data.verifiedAt).toLocaleString()
                  : "-"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
