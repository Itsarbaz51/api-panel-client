"use client";

import React from "react";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginModal({ handleLogin, onForgotPassword, loading }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
      {/* LEFT */}
      <div className="w-full md:w-1/2 relative min-h-125">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex items-center h-full p-10">
          <div className="text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Let's Grow Up <br />
              Your Future
            </h1>

            <p className="mt-5 text-white/80">
              Learn important new skills and grow your career.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
        {/* Logo */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-slate-800">Edufactory</h2>
        </div>

        {/* Login Form */}
        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={onForgotPassword}
          loading={loading}
        />
      </div>
    </div>
  );
}
