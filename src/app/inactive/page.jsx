"use client";

import { Ban, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useAuth";
import { logout } from "@/store/authSlice";
import { useDispatch } from "react-redux";

export default function InactivePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate: logoutUser, isPending } = useLogout();

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        dispatch(logout());
        router.replace("/login");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-xl p-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <Ban className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-foreground">Account Inactive</h1>

        <p className="mt-3 text-muted-foreground">
          Your account has been marked as inactive by the administrator. Please
          contact support to reactivate your account.
        </p>

        <button
          onClick={handleLogout}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-primary-foreground transition hover:opacity-90"
        >
          <LogOut className="h-4 w-4" />
          {isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
