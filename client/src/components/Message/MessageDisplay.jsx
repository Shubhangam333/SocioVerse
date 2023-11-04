import React, { useState, useRef, useEffect, useCallback } from "react";
import { useGetMessagesQuery } from "../../features/messages/messageapi";
import { setMessages } from "../../features/messages/messageSlice";
import { useDispatch, useSelector } from "react-redux";

const MessageDisplay = ({ id }) => {
  const messageContainerRef = useRef(null);

  //   const [getMessages, { isLoading }] = useGetMessagesQuery();
  const { data, isLoading } = useGetMessagesQuery(id);

  const { messages } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  // Scroll to the bottom of the container whenever new messages are added
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  //   useEffect(() => {
  //     scrollToBottom();
  //   }, [messages]);

  const getAllMessages = useCallback(async () => {
    try {
      //   const res = await getMessages(id).unwrap();

      if (data) {
        dispatch(setMessages(data.messages));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, data]);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  console.log(messages);

  return (
    <div className="message-display-container" ref={messageContainerRef}>
      <div className="flex flex-col justify-between overflow-y-scroll h-80 text-white">
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          messages
            .slice()
            .reverse()
            .map((message, index) =>
              id == message.recipient ? (
                <div
                  key={index}
                  className="message self-start bg-green-500 w-100 px-2 rounded-md my-2"
                >
                  {message.text}
                </div>
              ) : (
                <div
                  key={index}
                  className="message self-end bg-red-500 w-100 px-2 rounded-md my-2"
                >
                  {message.text}
                </div>
              )
            )
        )}
      </div>
    </div>
  );
};

export default MessageDisplay;