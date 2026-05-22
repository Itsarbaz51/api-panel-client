import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  packages: [],
};

const packageSlice = createSlice({
  name: "package",
  initialState,

  reducers: {
    setPackages: (state, action) => {
      state.packages = action.payload;
    },

    addPackage: (state, action) => {
      state.packages.unshift(action.payload);
    },

    updatePackage: (state, action) => {
      state.packages = state.packages.map((pkg) =>
        pkg.id === action.payload.id ? action.payload : pkg,
      );
    },

    removePackage: (state, action) => {
      state.packages = state.packages.filter(
        (pkg) => pkg.id !== action.payload,
      );
    },

    clearPackages: (state) => {
      state.packages = [];
    },
  },
});

export const {
  setPackages,
  addPackage,
  updatePackage,
  removePackage,
  clearPackages,
} = packageSlice.actions;

export default packageSlice.reducer;
