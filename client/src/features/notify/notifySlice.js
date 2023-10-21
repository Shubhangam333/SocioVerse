import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notify: [],
};

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notify = action.payload;
    },
  },
});

export const { setNotification } = notifySlice.actions;

export default notifySlice.reducer;
