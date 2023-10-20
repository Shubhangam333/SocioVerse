import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../customBaseQuery/baseQueryWithReAuth";

export const notifyapi = createApi({
  reducerPath: "notifyapi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (notificationdata) => ({
        url: "/notify",
        method: "POST",
        body: notificationdata,
      }),
    }),
  }),
});

export const { useCreateNotificationMutation } = notifyapi;
