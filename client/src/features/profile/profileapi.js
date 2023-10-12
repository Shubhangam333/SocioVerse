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
  }),
});

export const { useProfileQuery } = profileapi;
