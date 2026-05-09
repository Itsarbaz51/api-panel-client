'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';

export default function ForgotPasswordForm({ onBackToLogin, onSuccess }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    
    setIsSubmitted(true);
    onSuccess?.(email);
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800">Check Your Email</h3>
        <p className="text-slate-600">
          We&apos;ve sent a password reset link to <strong>{email}</strong>
        </p>
        <button
          onClick={onBackToLogin}
          className="text-[#10a37f] hover:underline font-semibold"
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-slate-600 text-sm">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <InputField
        label="Email Address"
        type="email"
        name="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        error={error}
        required
      />

      <Button type="submit" variant="primary">
        Send Reset Link
      </Button>
      
      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full text-center text-sm text-slate-500 hover:text-[#10a37f] transition-colors"
      >
        ← Back to Sign In
      </button>
    </form>
  );
}