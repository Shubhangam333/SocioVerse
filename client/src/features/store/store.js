import { configureStore } from "@reduxjs/toolkit";
import { authapi } from "../auth/authapi";
import authReducer from "../auth/authSlice.js";
import { profileapi } from "../profile/profileapi";
import { postapi } from "../posts/postapi";
import { notifyapi } from "../notify/notifyapi";
import profileReducer from "../profile/profileSlice";
import socketReducer from "../socket/socketSlice";
import notifyReducer from "../notify/notifySlice";
import postReducer from "../posts/postSlice";
import statusReducer from "../status/statusSlice";

export const store = configureStore({
  reducer: {
    [authapi.reducerPath]: authapi.reducer,
    [profileapi.reducerPath]: profileapi.reducer,
    [postapi.reducerPath]: postapi.reducer,
    [notifyapi.reducerPath]: notifyapi.reducer,
    auth: authReducer,
    profile: profileReducer,
    socket: socketReducer,
    notify: notifyReducer,
    post: postReducer,
    status: statusReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["socket/setSocket"],
        ignoredPaths: ["socket.socket"],
      },
    }).concat(
      authapi.middleware,
      profileapi.middleware,
      postapi.middleware,
      notifyapi.middleware
    ),
});
