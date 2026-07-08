"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";

export default function LoginButton() {
  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={login}
      className="rounded bg-blue-600 px-4 py-2 text-white"
    >
      Login with Google
    </button>
  );
}