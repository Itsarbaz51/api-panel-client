'use client';

import React from 'react';

export default function Checkbox({
  label = '',
  checked = false,
  onChange = () => {},
  name = '',
  value = '',
  disabled = false,
  required = false,
  className = '',
  labelClassName = '',
  inputClassName = '',
  ...props
}) {
  return (
    <label
      className={`
        flex items-center gap-3
        select-none
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {/* CHECKBOX */}
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={Boolean(checked)}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-4
          h-4
          shrink-0
          rounded
          border-gray-300
          accent-[var(--theme-primary)]
          cursor-pointer
          disabled:cursor-not-allowed
          ${inputClassName}
        `}
        {...props}
      />

      {/* LABEL */}
      {label && (
        <span
          className={`
            text-sm
            text-gray-700
            leading-none
            ${labelClassName}
          `}
        >
          {label}
        </span>
      )}
    </label>
  );
}