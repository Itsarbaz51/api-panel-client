'use client';

import React, { useState } from 'react';

import LoginModal from '../modals/LoginModal';
import ForgotPasswordModal from '@/components/modals/ForgotPasswordModal';

export default function LoginClient() {
	const [forgotOpen, setForgotOpen] = useState(false);

	const handleLogin = async (data) => {
		console.log('login', data);
	};

	const handleForgotPasswordSubmit = async (data) => {
		console.log('forgot password', data);

		// api call here
	};

	return (
		<div className="min-h-screen bg-[#76c8b1] flex items-center justify-center p-4">
			<LoginModal
				handleLogin={handleLogin}
				onForgotPassword={() => setForgotOpen(true)}
			/>

			<ForgotPasswordModal
				isOpen={forgotOpen}
				onClose={() => setForgotOpen(false)}
				onSubmit={handleForgotPasswordSubmit}
			/>
		</div>
	);
}
