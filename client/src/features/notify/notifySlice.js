import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notify: [],
};

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notify.push(...action.payload);
    },
    updateNotification: (state, action) => {
      const res = state.notify.filter(
        (n) => n._id !== action.payload._id && n.url !== action.payload.url
      );
      console.log("res", res);
      state.notify = res;
    },
  },
});

export const { setNotification, updateNotification } = notifySlice.actions;

export default notifySlice.reducer;
