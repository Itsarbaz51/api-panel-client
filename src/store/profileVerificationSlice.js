import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	kycs: [],
};

const kycSlice = createSlice({
	name: 'kyc',

	initialState,

	reducers: {
		addKyc: (state, action) => {
			state.kycs.unshift(action.payload);
		},

		setKyc: (state, action) => {
			state.kycs = action.payload;
		},
	},
});

export const { addKyc, setKyc } = kycSlice.actions;

export default kycSlice.reducer;