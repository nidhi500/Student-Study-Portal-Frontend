import React from "react";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center text-indigo-600 animate-pulse">
        <svg
          className="w-12 h-12 mb-4 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v1m0 14v1m8.66-8.66h-1M4.34 12H3.33m15.36 4.95l-.71-.71M6.05 6.05l-.71-.71m12.02 12.02l-.71-.71M6.05 17.95l-.71-.71"
          />
        </svg>
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}
