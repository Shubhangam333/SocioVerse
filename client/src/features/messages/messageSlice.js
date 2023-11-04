import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    updateMessages: (state, action) => {
      state.messages = [action.payload, ...state.messages];
    },
  },
});

export const { setMessages, updateMessages } = messageSlice.actions;

export default messageSlice.reducer;
