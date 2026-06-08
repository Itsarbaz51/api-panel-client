import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commissionSettings: [],
};

const commissionSettingSlice = createSlice({
  name: "commissionSetting",

  initialState,

  reducers: {
    setCommissionSettings: (state, action) => {
      state.commissionSettings = action.payload;
    },
  },
});

export const { setCommissionSettings } = commissionSettingSlice.actions;

export default commissionSettingSlice.reducer;
