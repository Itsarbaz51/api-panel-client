"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useSelector((state) => state.auth?.user);

  useEffect(() => {
    if (!user) return;

    // INACTIVE USER
    if (user.status === "IN_ACTIVE" && pathname !== "/inactive") {
      router.replace("/inactive");
      return;
    }

    // KYC NOT VERIFIED
    if (!user.isKycVerified && pathname !== "/kyc") {
      router.replace("/kyc");
      return;
    }

    // Agar verified ho aur KYC page par ho
    if (user.isKycVerified && pathname === "/kyc") {
      router.replace("/dashboard");
    }

    // Agar active ho aur inactive page par ho
    if (user.status === "ACTIVE" && pathname === "/inactive") {
      router.replace("/dashboard");
    }
  }, [user, pathname, router]);

  useEffect(() => {
    if (user?.isKycVerified) {
      router.replace("/dashboard");
    }
  }, [user]);

  // Redirect hone tak blank screen
  if (
    user &&
    ((user.status === "IN_ACTIVE" && pathname !== "/inactive") ||
      (!user.isKycVerified && pathname !== "/kyc"))
  ) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}
