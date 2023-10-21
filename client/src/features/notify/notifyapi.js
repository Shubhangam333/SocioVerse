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
    removeNotification: builder.mutation({
      query: (msg) => ({
        url: `/notify/${msg.id}?url=${msg.url}`,
        method: "DELETE",
      }),
    }),
    getNotification: builder.mutation({
      query: () => ({
        url: "/notifies",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetNotificationMutation,
  useRemoveNotificationMutation,
} = notifyapi;
