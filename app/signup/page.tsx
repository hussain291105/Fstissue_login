"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth, db } from "@/lib/firebase";

import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!password) {
      alert("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await updateProfile(result.user, {
        displayName: name,
      });

      await setDoc(
        doc(db, "users", result.user.uid),
        {
          uid: result.user.uid,
          displayName: name,
          email: email.trim(),
          photoURL: "",
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      alert("Account created successfully!");

      router.replace("/");
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          alert("This email is already registered.");
          break;

        case "auth/invalid-email":
          alert("Please enter a valid email.");
          break;

        case "auth/weak-password":
          alert("Password is too weak.");
          break;

        default:
          alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/Signup.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Signup Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="FS Enterprises"
              width={200}
              height={200}
            />
          </div>

          <h1 className="mt-5 text-center text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-center text-gray-200">
            Register to continue to FS Enterprises
          </p>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-8 w-full rounded-xl border border-white/20 bg-white/90 px-4 py-3 outline-none"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-4 w-full rounded-xl border border-white/20 bg-white/90 px-4 py-3 outline-none"
          />

          {/* Password */}
          <div className="relative mt-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-white/90 px-4 py-3 pr-12 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative mt-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl bg-white/90 px-4 py-3 pr-12 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Signup Button */}
          <button
            onClick={signup}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-primary py-4 font-semibold text-white transition hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="mt-6 text-center text-gray-200">
            Already have an account?
          </p>

          <Link
            href="/login"
            className="mt-2 block text-center font-semibold text-white underline"
          >
            Login
          </Link>

          <p className="mt-6 text-center text-sm text-gray-300">
            Secure authentication powered by Google
          </p>
        </div>
      </div>
    </div>
  );
}