import { configureStore } from "@reduxjs/toolkit";
import { authapi } from "../auth/authapi";
import authReducer from "../auth/authSlice.js";
import { profileapi } from "../profile/profileapi";
import { postapi } from "../posts/postapi";
import profileReducer from "../profile/profileSlice";

export const store = configureStore({
  reducer: {
    [authapi.reducerPath]: authapi.reducer,
    [profileapi.reducerPath]: profileapi.reducer,
    [postapi.reducerPath]: postapi.reducer,
    auth: authReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authapi.middleware,
      profileapi.middleware,
      postapi.middleware
    ),
});
