import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  languages: [],
};

const languageSlice = createSlice({
  name: "language",

  initialState,

  reducers: {
    setLanguages: (
      state,
      action
    ) => {
      state.languages =
        action.payload;
    },

    addLanguage: (
      state,
      action
    ) => {
      state.languages.unshift(
        action.payload
      );
    },

    updateLanguage: (
      state,
      action
    ) => {
      state.languages =
        state.languages.map((item) =>
          item.id === action.payload.id
            ? action.payload
            : item
        );
    },

    removeLanguage: (
      state,
      action
    ) => {
      state.languages =
        state.languages.filter(
          (item) =>
            item.id !== action.payload
        );
    },

    clearLanguages: (state) => {
      state.languages = [];
    },
  },
});

export const {
  setLanguages,
  addLanguage,
  updateLanguage,
  removeLanguage,
  clearLanguages,
} = languageSlice.actions;

export default languageSlice.reducer;