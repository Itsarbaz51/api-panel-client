'use client';

import React from 'react';

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  fullWidth = true,
  disabled = false,
  className = '',

  // ✅ custom props ko yaha destructure karo
  iconPosition,
  leftIcon,
  rightIcon,

  ...props
}) {
  const baseStyles = `
    font-bold
    py-3
    px-4
    rounded-lg
    transition-all
    duration-200
    flex
    items-center
    justify-center
    gap-2
  `;

  const variants = {
    primary:
      'bg-[#10a37f] hover:bg-[#0e8a6b] text-white shadow-lg shadow-[#10a37f]/30',

    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-800',

    outline:
      'border-2 border-[#10a37f] text-[#10a37f] hover:bg-[#10a37f] hover:text-white',
  };

  const widthStyle = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${widthStyle}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {/* LEFT ICON */}
      {leftIcon && iconPosition !== 'right' && (
        <span className="flex items-center">
          {leftIcon}
        </span>
      )}

      {/* BUTTON TEXT */}
      <span>{children}</span>

      {/* RIGHT ICON */}
      {rightIcon && (
        <span className="flex items-center">
          {rightIcon}
        </span>
      )}
    </button>
  );
}