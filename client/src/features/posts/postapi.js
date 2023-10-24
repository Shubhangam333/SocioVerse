import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../customBaseQuery/baseQueryWithReAuth";

export const postapi = createApi({
  reducerPath: "postapi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Posts", "Post"],
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
      providesTags: ["Posts", "Post"],
    }),
    getPostById: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
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
      invalidatesTags: ["Post"],
    }),
    unLikePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}/unlike`,
        method: "PUT",
      }),
      invalidatesTags: ["Post"],
    }),
    createCommentPost: builder.mutation({
      query: (commentdata) => ({
        url: `/comment`,
        method: "POST",
        body: commentdata,
      }),
      invalidatesTags: ["Post"],
    }),
    deleteCommentPost: builder.mutation({
      query: (id) => ({
        url: `/comment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdMutation,
  useLikePostMutation,
  useGetUserPostsMutation,
  useUnLikePostMutation,
  useCreateCommentPostMutation,
  useDeleteCommentPostMutation,
} = postapi;
