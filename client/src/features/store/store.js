import { configureStore } from "@reduxjs/toolkit";
import { authapi } from "../auth/authapi";
import authReducer from "../auth/authSlice.js";

export const store = configureStore({
  reducer: {
    [authapi.reducerPath]: authapi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authapi.middleware),
});
