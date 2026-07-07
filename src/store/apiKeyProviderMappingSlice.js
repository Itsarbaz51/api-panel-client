import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mappings: [],
  mapping: null,
};

const apiKeyProviderMappingSlice = createSlice({
  name: "apiKeyProviderMapping",

  initialState,

  reducers: {
    setMappings: (state, action) => {
      state.mappings = action.payload;
    },

    setMapping: (state, action) => {
      state.mapping = action.payload;
    },

    addMapping: (state, action) => {
      state.mappings.unshift(action.payload);
    },

    updateMapping: (state, action) => {
      const index = state.mappings.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.mappings[index] = action.payload;
      }
    },

    removeMapping: (state, action) => {
      state.mappings = state.mappings.filter(
        (item) => item.id !== action.payload
      );
    },

    clearMapping: (state) => {
      state.mapping = null;
    },
  },
});

export const {
  setMappings,
  setMapping,
  addMapping,
  updateMapping,
  removeMapping,
  clearMapping,
} = apiKeyProviderMappingSlice.actions;

export default apiKeyProviderMappingSlice.reducer;