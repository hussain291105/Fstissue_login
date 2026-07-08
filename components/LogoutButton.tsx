"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.replace("/");
  };

  return (
    <button
      onClick={logout}
      className="rounded-full bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
    >
      Logout
    </button>
  );
}