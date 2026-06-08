import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import packageReducer from "./packageSlice";
import userReducer from "./userSlice";
import apiKeyReducer from "./apiKeySlice";
import logReducer from "./logSlice";
import serviceReducer from "./serviceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    package: packageReducer,
    apiKey: apiKeyReducer,
    user: userReducer,
    logs: logReducer,
    services: serviceReducer,
  },
});
