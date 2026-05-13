'use client';

import React from 'react';

export default function Button({
	children,
	onClick,
	type = 'button',
	variant = 'primary', // primary, secondary, outline, white, ghost, danger
	size = 'md', // sm, md, lg
	fullWidth = false, // Changed default to false for dashboard usage
	disabled = false,
	className = '',
	leftIcon,
	rightIcon,
	...props
}) {
	// Base styles: Clean and aligned
	const baseStyles = `
    inline-flex
    items-center
    justify-center
    font-bold
    transition-all
    duration-200
    gap-2
    active:scale-[0.98]
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:active:scale-100
  `;

	// Modern Variants
	const variants = {
		primary:
			'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200/50 border border-emerald-600',

		secondary:
			'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200',

		outline:
			'border border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300',

		white:
			'bg-white border border-slate-100 shadow-sm text-emerald-600 hover:bg-slate-50',

		ghost:
			'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-800',

		danger:
			'bg-red-50 text-red-600 border border-red-100 hover:bg-red-500 hover:text-white',
	};

	// Sizes for flexibility
	const sizes = {
		sm: 'px-3 py-1.5 text-xs rounded-lg',
		md: 'px-5 py-2.5 text-sm rounded-xl',
		lg: 'px-6 py-3 text-base rounded-2xl',
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
        ${sizes[size]}
        ${widthStyle}
        ${className}
      `}
			{...props}>
			{leftIcon && <span className="shrink-0">{leftIcon}</span>}

			<span className="truncate">{children}</span>

			{rightIcon && <span className="shrink-0">{rightIcon}</span>}
		</button>
	);
}
