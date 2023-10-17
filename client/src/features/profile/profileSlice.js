import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserInfo } = profileSlice.actions;

export default profileSlice.reducer;
