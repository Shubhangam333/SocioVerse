import React from "react";

const ChatBox = () => {
  return (
    <div className="col-span-6 relative border-2 border-slate-600 rounded-md">
      <div className="bg-white flex justify-between">
        <div className="flex gap-2 items-center">
          <img
            src="https://res.cloudinary.com/walli/image/upload/v1697627718/socioverse_avatar/rhxsp33ccn5a9rmokqzq.jpg"
            alt=""
            className="w-12"
          />
          <div className="flex-col ">
            <p className="text-xl">Kevin Joseph</p>
            <div className="flex gap-2 text-sm text-gray-600">
              <span>1 follower</span>
              <span>1 following</span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div></div>
      <form
        id="send-message"
        className="chat-form absolute bottom-0 right-0 left-0"
      >
        <div className="flex w-full">
          <input
            type="text"
            id="message"
            placeholder="Enter your message..."
            className="chat-input text-2xl border-2 border-slate-500 rounded-md flex-1"
          />
          <button
            type="submit"
            className="chat-btn py-4 px-6 bg-blue-500 text-white focus:scale-105"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
