import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../customBaseQuery/baseQueryWithReAuth";

export const messageapi = createApi({
  reducerPath: "messageapi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Message"],
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (postdata) => ({
        url: "/message",
        method: "POST",
        body: postdata,
      }),
      invalidatesTags: ["Message"],
    }),
    getMessages: builder.query({
      query: (id) => ({
        url: `/message/${id}`,
        method: "GET",
      }),
      providesTags: ["Message"],
    }),
    getConversations: builder.query({
      query: () => ({
        url: `/conversations`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetMessagesQuery,
  useGetConversationsQuery,
} = messageapi;
