import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceProviders: [],
};

const serviceProviderSlice = createSlice({
  name: "serviceProvider",

  initialState,

  reducers: {
    setServiceProviders: (state, action) => {
      state.serviceProviders = action.payload;
    },
  },
});

export const { setServiceProviders } =
  serviceProviderSlice.actions;

export default serviceProviderSlice.reducer;