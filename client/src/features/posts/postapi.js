import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../customBaseQuery/baseQueryWithReAuth";

export const postapi = createApi({
  reducerPath: "postapi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postdata) => ({
        url: "/createpost",
        method: "POST",
        body: postdata,
      }),
      invalidatesTags: ["Posts"],
    }),
    getPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),
    getUserPosts: builder.mutation({
      query: (id) => ({
        url: `/user_posts/${id}`,
        method: "GET",
      }),
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}/like`,
        method: "PUT",
      }),
    }),
    unLikePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}/unlike`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLikePostMutation,
  useGetUserPostsMutation,
  useUnLikePostMutation,
} = postapi;
