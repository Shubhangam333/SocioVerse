import React from "react";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";

const MessageComponent = () => {
  return (
    <div className="main m-auto my-24 grid grid-cols-9 msg ">
      <SideBar />
      <ChatBox />
    </div>
  );
};

export default MessageComponent;
