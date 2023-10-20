import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notify: localStorage.getItem("notification")
    ? JSON.parse(localStorage.getItem("notification"))
    : [],
};

export const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notify = [...state.notify, action.payload];
      localStorage.setItem("notification", JSON.stringify(state.notify));
    },
  },
});

export const { setNotification } = notifySlice.actions;

export default notifySlice.reducer;
