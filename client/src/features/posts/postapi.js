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
  }),
});

export const { useCreatePostMutation, useGetPostsQuery } = postapi;
