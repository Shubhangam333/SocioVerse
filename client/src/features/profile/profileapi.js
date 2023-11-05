import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "../customBaseQuery/baseQueryWithReAuth";
// import { useSelector } from "react-redux";

export const profileapi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    userSuggestion: builder.query({
      query: () => ({
        url: "suggestionsUser",
        method: "GET",
      }),
    }),
    getUserInfo: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    follow: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/follow`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    unFollow: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/unfollow`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    searchUsers: builder.mutation({
      query: (search) => ({
        url: `/searchUsers?name=${search}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useProfileQuery,
  useUserSuggestionQuery,
  useGetUserInfoQuery,
  useFollowMutation,
  useUnFollowMutation,
  useSearchUsersMutation,
} = profileapi;
