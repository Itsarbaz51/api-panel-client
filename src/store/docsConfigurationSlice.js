import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  docsConfigurations: [],
};

const docsConfigurationSlice =
  createSlice({
    name: "docsConfiguration",

    initialState,

    reducers: {
      setDocsConfigurations: (
        state,
        action,
      ) => {
        state.docsConfigurations =
          action.payload;
      },

      addDocsConfiguration: (
        state,
        action,
      ) => {
        state.docsConfigurations.unshift(
          action.payload
        );
      },

      updateDocsConfiguration: (
        state,
        action,
      ) => {
        state.docsConfigurations =
          state.docsConfigurations.map(
            (item) =>
              item.id === action.payload.id
                ? action.payload
                : item
          );
      },

      removeDocsConfiguration: (
        state,
        action,
      ) => {
        state.docsConfigurations =
          state.docsConfigurations.filter(
            (item) =>
              item.id !== action.payload
          );
      },

      clearDocsConfigurations: (
        state,
      ) => {
        state.docsConfigurations = [];
      },
    },
  });

export const {
  setDocsConfigurations,
  addDocsConfiguration,
  updateDocsConfiguration,
  removeDocsConfiguration,
  clearDocsConfigurations,
} = docsConfigurationSlice.actions;

export default docsConfigurationSlice.reducer;