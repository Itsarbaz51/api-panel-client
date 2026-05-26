"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useCurrentUser } from "@/hooks/useAuth";
import { logout, setUser } from "@/store/authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  const { data: currentUser, isLoading, isError } = useCurrentUser();

  useEffect(() => {
    if (currentUser?.data) {
      dispatch(setUser(currentUser.data));
    }

    if (isError) {
      dispatch(logout());
    }
  }, [currentUser, isError, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return children;
}
