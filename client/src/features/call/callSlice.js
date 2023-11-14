import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  call: null,
  peer: null,
  alertMsg: "",
};

export const callSlice = createSlice({
  name: "call",
  initialState,
  reducers: {
    setCall: (state, action) => {
      state.call = action.payload;
    },
    setPeer: (state, action) => {
      state.peer = action.payload;
    },
    setAlert: (state, action) => {
      state.alertMsg = action.payload;
    },
  },
});

export const { setCall, setPeer, setAlert } = callSlice.actions;

export default callSlice.reducer;
