"use client";

import Image from "next/image";
import { 
  signInWithPopup,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, provider, db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const facebookProvider = new FacebookAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  const loginWithEmail = async () => {
    console.log("Email:", email);
    console.log("Password:", password);
    // Check if email is empty
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    // Check if password is empty
    if (!password.trim()) {
      alert("Please enter your password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      router.replace("/");
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-email":
          alert("Please enter a valid email address.");
          break;

        case "auth/user-not-found":
          alert("No account found with this email.");
          break;

        case "auth/wrong-password":
          alert("Incorrect password.");
          break;

        case "auth/invalid-credential":
          alert("Incorrect email or password.");
          break;

        default:
          alert(error.message);
      }
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        facebookProvider
      );

      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        },
        { merge: true }
      );

      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  const forgotPassword = async () => {
    if (!email) {
      alert("Enter your email first.");
      return;
    }

    await sendPasswordResetEmail(auth, email);

    alert("Password reset email sent.");
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
        <source src="/Login.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Login Card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">

        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur-xl shadow-2xl">

          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="FS Enterprises"
              width={200}
              height={200}
            />
          </div>

          <h1 className="mt-3 text-center text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-3 mb-6 text-center text-gray-200">
            Sign in to continue to FS Enterprises
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl px-4 py-3 bg-white/90"
          />

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

          <button
            onClick={loginWithEmail}
            className="mt-5 w-full cursor-pointer rounded-xl bg-primary py-4 text-white transition hover:scale-[1.02] hover:shadow-xl"
          >
            Sign In
          </button>

          <button
            onClick={forgotPassword}
            className="mt-3 cursor-pointer text-white underline"
          >
            Forgot Password?
          </button>

          <button
            onClick={login}
            className="mt-10 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 font-semibold text-black transition hover:scale-[1.02] hover:shadow-xl cursor-pointer"
          >
            <Image
              src="/google.svg"
              alt="Google"
              width={22}
              height={22}
            />

            Continue with Google
          </button>

          <Link
            href="/signup"
            className="mt-6 block text-center text-white underline"
          >
            Create Account
          </Link>

          <p className="mt-6 text-center text-sm text-gray-300">
            Secure authentication powered by Google
          </p>
        </div>

      </div>
    </div>
  );
}