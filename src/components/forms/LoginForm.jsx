'use client';

import React, { useState } from 'react';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import InputField from '../ui/InputField';

export default function LoginForm({ onForgotPasswordClick, onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-shadow-lg">
      <InputField
        label="Email Address"
        type="email"
        name="email"
        placeholder="eldo.nawawi@edufactory.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required  
      />

      <div>
        <div className="flex justify-between mb-2">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Password
          </label>
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-xs font-bold text-[#10a37f] hover:underline text-shadow-lg"
          >
            Forgot Password?
          </button>
        </div>
        <InputField
          type="password"
          name="password"
          placeholder="••••••"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
      </div>

      <Checkbox
        label="Keep me logged in"
        name="rememberMe"
        checked={formData.rememberMe}
        onChange={handleChange}
      />

      <Button type="submit" variant="primary">
        Sign In
      </Button>
    </form>
  );
}