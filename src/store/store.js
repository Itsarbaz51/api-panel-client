import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import packageReducer from './packageSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,

		package: packageReducer,

		user: userReducer,
	},
});
