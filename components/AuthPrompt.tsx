"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AuthPrompt() {
  const [hovered, setHovered] = useState(false);

  // Data URI for a white hand pointer SVG (index finger open)
  const handCursor =
    "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><path fill=\"white\" stroke=\"black\" stroke-width=\"1.5\" d=\"M16 4c1.1 0 2 .9 2 2v10.5h1V8c0-1.1.9-2 2-2s2 .9 2 2v8.5h1V12c0-1.1.9-2 2-2s2 .9 2 2v10c0 4-2.5 6-6 6h-2c-3.5 0-6-2-6-6V8c0-1.1.9-2 2-2s2 .9 2 2v8.5h1V6c0-1.1.9-2 2-2z\"/></svg>') 8 0, pointer";

  return (
    <>
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Welcome to SkillBridge</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Connect, learn, and grow with a powerful AI-powered peer learning platform.
      </p>
      <button
        onClick={() => signIn("google")}
        className="relative flex items-center gap-2 bg-white border border-gray-300 shadow px-6 py-3 rounded-lg text-gray-700 font-semibold hover:bg-gray-100 transition"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={hovered ? { cursor: handCursor } : {}}
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" className="w-6 h-6" />
        Sign in with Google
      </button>
    </>
  );
} 