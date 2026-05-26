import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  apiKeys: [],
  credential: null,
};

const apiKeySlice = createSlice({
  name: "apiKey",

  initialState,

  reducers: {
    setApiKeys: (state, action) => {
      state.apiKeys = action.payload;
    },

    setCredential: (state, action) => {
      state.credential = action.payload;
    },

    clearCredential: (state) => {
      state.credential = null;
    },

    updateAllowedIps: (state, action) => {
      if (state.credential) {
        state.credential.allowedIps = action.payload;
      }
    },
  },
});

export const { setApiKeys, setCredential, clearCredential, updateAllowedIps } =
  apiKeySlice.actions;

export default apiKeySlice.reducer;
