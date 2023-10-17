import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "../customBaseQuery/baseQueryWithReAuth";
// import { useSelector } from "react-redux";

export const profileapi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
    }),
    userSuggestion: builder.query({
      query: () => ({
        url: "suggestionsUser",
        method: "GET",
      }),
    }),
    getUserInfo: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    follow: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/follow`,
        method: "PUT",
      }),
    }),
    unFollow: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/unfollow`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useProfileQuery,
  useUserSuggestionQuery,
  useGetUserInfoMutation,
  useFollowMutation,
  useUnFollowMutation,
} = profileapi;
