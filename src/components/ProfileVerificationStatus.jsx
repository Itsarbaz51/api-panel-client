"use client";

import { BadgeCheck, Clock3, CircleX, ArrowRight } from "lucide-react";

export default function ProfileVerificationStatus({ status, rejectionReason }) {
  const config = {
    PENDING: {
      icon: Clock3,
      title: "KYC Under Verification",
      subtitle:
        "Your documents have been received successfully and are currently being reviewed by our verification team.",
      color: "from-amber-500 to-yellow-500",
      badge: "bg-amber-100 text-amber-700",
    },

    REJECTED: {
      icon: CircleX,
      title: "KYC Rejected",
      subtitle: "We couldn't verify your KYC with the submitted information.",
      color: "from-red-500 to-rose-500",
      badge: "bg-red-100 text-red-700",
    },

    VERIFIED: {
      icon: BadgeCheck,
      title: "KYC Verified",
      subtitle: "Congratulations! Your account has been successfully verified.",
      color: "from-emerald-500 to-green-500",
      badge: "bg-emerald-100 text-emerald-700",
    },
  };

  const item = config[status];

  if (!item) return null;

  const Icon = item.icon;

  return (
    <div className="overflow-hidden rounded-3xl border bg-card shadow-lg">
      {/* Header */}

      <div className={`bg-gradient-to-r ${item.color} p-8 text-white`}>
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Icon className="h-10 w-10" />
          </div>

          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.badge}`}
            >
              {status}
            </span>

            <h2 className="mt-3 text-3xl font-bold">{item.title}</h2>

            <p className="mt-2 max-w-2xl text-white/90">{item.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-6 p-8">
        <div className="rounded-2xl border bg-background p-6">
          <h3 className="font-semibold">Current Status</h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 h-3 w-3 rounded-full bg-theme" />

              <div>
                <p className="font-medium">Request Submitted</p>

                <p className="text-sm text-muted-foreground">
                  Your KYC request has been received successfully.
                </p>
              </div>
            </div>

            {status === "PENDING" && (
              <div className="flex items-start gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-amber-500" />

                <div>
                  <p className="font-medium">Verification In Progress</p>

                  <p className="text-sm text-muted-foreground">
                    Our team is reviewing your submitted documents.
                  </p>
                </div>
              </div>
            )}

            {status === "VERIFIED" && (
              <div className="flex items-start gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-green-500" />

                <div>
                  <p className="font-medium">Verification Completed</p>

                  <p className="text-sm text-muted-foreground">
                    Your KYC has been approved successfully.
                  </p>
                </div>
              </div>
            )}

            {status === "REJECTED" && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                <h4 className="font-semibold text-red-700">Rejection Reason</h4>

                <p className="mt-2 text-red-600">
                  {rejectionReason || "No reason provided."}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl bg-muted p-6">
          <div className="flex items-start gap-3">
            <ArrowRight className="mt-1 h-5 w-5 text-theme" />

            <div>
              <h4 className="font-semibold">Next Step</h4>

              {status === "PENDING" && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Please wait while our compliance team reviews your
                  application. You'll be notified once verification is complete.
                </p>
              )}

              {status === "VERIFIED" && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Your account is fully verified. You can now access all
                  available platform services.
                </p>
              )}

              {status === "REJECTED" && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Update the highlighted details below and submit your KYC
                  again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
