import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logs: [],
};

const logSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs: (state, action) => {
      state.logs = action.payload;
    },

    clearLogs: (state) => {
      state.logs = [];
    },
  },
});

export const { setLogs, clearLogs } = logSlice.actions;

export default logSlice.reducer;
