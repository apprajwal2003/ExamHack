"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="ml-auto flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 text-white text-sm font-medium shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  );
}
