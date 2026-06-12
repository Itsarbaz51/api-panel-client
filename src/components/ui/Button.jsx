'use client';

import React from 'react';

export default function Button({
	children,
	onClick,
	type = 'button',
	variant = 'primary',
	size = 'md',
	fullWidth = false,
	disabled = false,
	loading = false,
	className = '',
	leftIcon,
	rightIcon,
	iconPosition = 'left',
	...props
}) {
	const isDisabled = disabled || loading;

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
	disabled:pointer-events-none
	disabled:cursor-not-allowed
	disabled:active:scale-100
	`;

	const variants = {
		primary:
			'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600',

		secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border',

		outline: 'border border-slate-300 bg-transparent',

		white: 'bg-white text-emerald-600 border',

		ghost: 'bg-transparent',

		danger: 'bg-red-600 text-white',

		dark: 'bg-slate-900 text-white',
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-xs rounded-lg',

		md: 'px-5 py-2.5 text-sm rounded-xl',

		lg: 'px-6 py-3 text-base rounded-2xl',
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={isDisabled}
			className={`
				${baseStyles}
				${variants[variant]}
				${sizes[size]}
				${fullWidth ? 'w-full' : ''}
				${className}
			`}
			{...props}>
			{loading ? (
				<>
					<svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
						<circle
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="3"
							opacity=".3"
						/>

						<path
							d="M22 12a10 10 0 0 1-10 10"
							stroke="currentColor"
							strokeWidth="3"
						/>
					</svg>
					Loading...
				</>
			) : (
				<>
					{leftIcon && iconPosition === 'left' && <span>{leftIcon}</span>}

					<span>{children}</span>

					{rightIcon && iconPosition === 'right' && <span>{rightIcon}</span>}
				</>
			)}
		</button>
	);
}
