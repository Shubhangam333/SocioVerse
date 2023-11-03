import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  online: [],
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setAvailableUser: (state, action) => {
      // console.log("act", action.payload);
      state.online.push(action.payload);
      // localStorage.setItem("availableUser", JSON.stringify(action.payload));
    },
    setUnAvailableUser: (state, action) => {
      // console.log("act", action.payload);
      state.online = state.online.filter((id) => id !== action.payload);
      // localStorage.setItem("availableUser", JSON.stringify(action.payload));
    },
  },
});

export default statusSlice.reducer;

export const { setAvailableUser, setUnAvailableUser } = statusSlice.actions;
