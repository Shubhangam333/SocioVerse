import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  accessToken: localStorage.getItem("accessToken")
    ? JSON.parse(localStorage.getItem("accessToken"))
    : "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.user;
      state.accessToken = action.payload.access_token;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(action.payload.access_token)
      );
    },
    logout: (state) => {
      state.userInfo = null;
      state.accessToken = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
