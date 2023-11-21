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
import messageReducer from "../messages/messageSlice";
import callReducer from "../call/callSlice";
import { messageapi } from "../messages/messageapi";

export const store = configureStore({
  reducer: {
    [authapi.reducerPath]: authapi.reducer,
    [profileapi.reducerPath]: profileapi.reducer,
    [postapi.reducerPath]: postapi.reducer,
    [notifyapi.reducerPath]: notifyapi.reducer,
    [messageapi.reducerPath]: messageapi.reducer,
    auth: authReducer,
    profile: profileReducer,
    socket: socketReducer,
    notify: notifyReducer,
    post: postReducer,
    status: statusReducer,
    message: messageReducer,
    call: callReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["socket/setSocket", "call/setCall", "call/setPeer"],
        ignoredPaths: ["socket.socket", "call.call", "call.peer"],
      },
    }).concat(
      authapi.middleware,
      profileapi.middleware,
      postapi.middleware,
      notifyapi.middleware,
      messageapi.middleware
    ),
});
