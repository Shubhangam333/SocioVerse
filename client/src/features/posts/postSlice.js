import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
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
  },
});

export const { setPosts, updatePosts } = postSlice.actions;

export default postSlice.reducer;
