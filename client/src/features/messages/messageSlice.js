import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  conversations: [],
  selectedImages: [],
  fetchMsg: false,
  isRecipient: false,
  fetchConv: false,
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
    fetchMessages: (state, action) => {
      state.fetchMsg = action.payload;
    },
    fetchConversations: (state, action) => {
      state.fetchConv = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    updateConversations: (state, action) => {
      state.conversations = [action.payload, ...state.conversations];
    },
    setisRecipient: (state) => {
      state.isRecipient = true;
    },
  },
});

export const {
  setMessages,
  updateMessages,
  setConversations,
  updateConversations,
  fetchMessages,
  setisRecipient,
  fetchConversations,
} = messageSlice.actions;

export default messageSlice.reducer;
