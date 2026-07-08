"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome {user.displayName}
      </h1>

      <p>{user.email}</p>

      {user.photoURL && (
        <img
          src={user.photoURL}
          alt="Profile"
          className="mt-4 h-24 w-24 rounded-full"
        />
      )}
    </div>
  );
}