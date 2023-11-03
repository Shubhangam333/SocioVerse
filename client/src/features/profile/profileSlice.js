import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.profile = action.payload;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
  },
});

export const { setUserInfo } = profileSlice.actions;

export default profileSlice.reducer;
