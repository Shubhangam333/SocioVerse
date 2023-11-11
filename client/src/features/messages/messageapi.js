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
    deleteMessages: builder.mutation({
      query: (id) => ({
        url: `/message/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Message"],
    }),
    getConversations: builder.query({
      query: () => ({
        url: `/conversations`,
        method: "GET",
      }),
      providesTags: ["Conversation"],
    }),
    createConversation: builder.mutation({
      query: (convdata) => ({
        url: `/create-conversation`,
        method: "POST",
        body: convdata,
      }),
      invalidatesTags: ["Conversation"],
    }),
    deleteConversations: builder.mutation({
      query: (id) => ({
        url: `/conversation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Conversation"],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetMessagesQuery,
  useGetConversationsQuery,
  useDeleteConversationsMutation,
  useCreateConversationMutation,
  useDeleteMessagesMutation,
} = messageapi;
