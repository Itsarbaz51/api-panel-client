'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/forms/LoginForm';
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal';
import SignUpModal from '@/components/modals/SignUpModal';

export default function LoginPage() {
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const handleLogin = (formData) => {
    console.log('Login submitted:', formData);
  };

  const handleSignUp = (formData) => {
    console.log('Sign Up submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#76c8b1] flex items-center justify-center p-4 md:p-8">
      
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        
        {/* LEFT SIDE - VIDEO SECTION */}
        <div className="w-full md:w-1/2 relative min-h-[400px] overflow-hidden">
          
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/video.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#10a37f]/70 to-[#0e8a6b]/90"></div>

          {/* TEXT CONTENT (FIXED) */}
          <div className="relative z-10 h-full flex items-center justify-center md:justify-start p-8 md:p-12">
            
            <div className="max-w-md space-y-6 text-center md:text-left">
              
              <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
                Let's Grow Up <br />
                <span className="text-white/90">Your Future</span> <br />
                With Edufactory
              </h1>

              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                Learn important new skills, discover passions or hobbies,
                and find ideas to transform your career path into something amazing.
              </p>

            </div>

          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white">
          
          {/* Logo + Sign Up */}
          <div className="mb-8 flex items-center justify-between">
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#10a37f] rotate-45 flex items-center justify-center rounded-sm">
                <div className="w-4 h-4 border-2 border-white -rotate-12"></div>
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800 uppercase">
                Edufactory
              </span>
            </div>

            <button
              onClick={() => setIsSignUpModalOpen(true)}
              className="text-sm font-semibold text-[#10a37f] hover:text-[#0e8a6b] transition-colors"
            >
              Sign Up →
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-slate-800 mb-8">
            Sign in to your account
          </h2>

          {/* Login Form */}
          <LoginForm 
            onForgotPasswordClick={() => setIsForgotPasswordModalOpen(true)}
            onSubmit={handleLogin}
          />

          {/* Footer */}
          <p className="mt-auto pt-8 text-center text-[10px] text-slate-400 uppercase tracking-widest">
            © 2021 PT. Edufactory. All rights reserved.
          </p>
        </div>
      </div>

      {/* MODALS */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
        onBackToLogin={() => console.log('Back to login')}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSuccess={handleSignUp}
      />
    </div>
  );
}