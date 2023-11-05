import React from "react";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import SearchBox from "./SearchBox";

const MessageComponent = () => {
  const { id } = useParams();
  return (
    <div className="main m-auto my-24 ">
      <div className="grid grid-cols-9 msg my-8">
        <SideBar />
        {id && <ChatBox id={id} />}
      </div>
    </div>
  );
};

export default MessageComponent;
