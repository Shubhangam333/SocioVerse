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
  }),
});

export const {
  useProfileQuery,
  useUserSuggestionQuery,
  useGetUserInfoQuery,
  useFollowMutation,
  useUnFollowMutation,
} = profileapi;
