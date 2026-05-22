import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import packageReducer from "./packageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    package: packageReducer,
  },
});
