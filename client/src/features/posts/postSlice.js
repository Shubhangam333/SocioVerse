import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isReply: false,
  postDisplay: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    updatePosts: (state, action) => {
      const post = action.payload;
      const id = post._id;

      const newData = state.posts.map((item) =>
        item._id === id ? post : item
      );

      state.posts = newData;
    },
    setPostDisplay: (state, action) => {
      state.postDisplay = action.payload;
    },
  },
});

export const { setPosts, updatePosts, setPostDisplay } = postSlice.actions;

export default postSlice.reducer;
