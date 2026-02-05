"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";
// Removed: import { useRouter } from "next/navigation";

export default function AuthenticatedContent({ session }: { session: Session | null }) {
  // Removed: const router = useRouter();

  return (
    <>
      <h2>Welcome, {session?.user?.name}</h2>
      {session?.user?.image && (
        <img src={session.user.image} className="rounded-full w-20 h-20" />
      )}
      <button
        onClick={() => {
          signOut({ callbackUrl: '/' });
        }}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        Logout
      </button>
      {/* 🚀 Dashboard Link */}
      <Link
        href="/dashboard"
        className="text-blue-600 underline mt-4 inline-block"
      >
        Go to Dashboard
      </Link>
    </>
  );
} 