import React, { useState, useRef, useEffect, useCallback } from "react";
import { useGetMessagesQuery } from "../../features/messages/messageapi";
import {
  fetchMessages,
  setMessages,
} from "../../features/messages/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import MessageTextItem from "./MessageItems/MessageTextItem";

const MessageDisplay = ({ id, handleDeleteImage, imagePreviews }) => {
  const messageContainerRef = useRef(null);

  //   const [getMessages, { isLoading }] = useGetMessagesQuery();
  const { data, isLoading, refetch } = useGetMessagesQuery(id);

  const { messages, fetchMsg } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  // Scroll to the bottom of the container whenever new messages are added
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const getAllMessages = useCallback(async () => {
    try {
      //   const res = await getMessages(id).unwrap();

      if (data) {
        dispatch(setMessages(data.messages));
      }

      if (fetchMsg) {
        refetch();
        dispatch(fetchMessages(false));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, data, fetchMsg, refetch]);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-display-container border-l-2 border-r-2 border-slate-600 h-96 overflow-y-scroll">
      <div
        className="flex flex-col   text-white relative justify-end "
        ref={messageContainerRef}
        style={{ height: "90%" }}
      >
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          messages
            .slice()
            .reverse()
            .map((message, index) => (
              <MessageTextItem
                id={id}
                recipient={message.recipient}
                message={message}
                key={index}
              />
            ))
        )}
      </div>
      <div className=" flex  gap-2  w-full  px-2 absolute bottom-12">
        {imagePreviews &&
          imagePreviews.map((image, index) => (
            <>
              <div className="relative" key={Math.floor(Math.random(5) * 100)}>
                <img src={image} className="w-8 h-8 rounded-md " />
                <button
                  className=" text-white bg-red-500 rounded-md absolute top-0 right-0"
                  onClick={() => handleDeleteImage(index)}
                >
                  <AiOutlineClose className="text-xs" />
                </button>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default MessageDisplay;
