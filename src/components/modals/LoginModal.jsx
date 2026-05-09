"use client";

import LoginForm from "../form/LoginForm";

export default function LoginModal({ isOpen, onClose }) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">

      <div className="w-full max-w-md bg-[#0F172A] border border-gray-800 rounded-3xl p-8 relative shadow-2xl">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

        <LoginForm onClose={onClose} />
      </div>
    </div>
  );
}