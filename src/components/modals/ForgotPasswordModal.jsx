'use client';

import React, { useEffect } from 'react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
// import ForgotPasswordForm from '../form/ForgotPasswordForm';

export default function ForgotPasswordModal({ isOpen, onClose, onBackToLogin }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSuccess = (email) => {
    setTimeout(() => {
      onClose();
      onBackToLogin?.();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Forgot Password?</h2>
          <p className="text-slate-500 text-sm">Reset your password in two quick steps</p>
        </div>
        
        <ForgotPasswordForm 
          onBackToLogin={() => {
            onClose();
            onBackToLogin?.();
          }}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}