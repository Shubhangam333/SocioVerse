import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  conversations: [],
  selectedImages: [],
  imagePreviews: [],
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
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    updateConversations: (state, action) => {
      state.conversations = [action.payload, ...state.conversations];
    },
  },
});

export const {
  setMessages,
  updateMessages,
  setConversations,
  updateConversations,
} = messageSlice.actions;

export default messageSlice.reducer;
