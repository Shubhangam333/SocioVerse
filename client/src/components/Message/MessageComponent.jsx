import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import ChatBox from "./ChatBox";
import { useParams } from "react-router-dom";
import SearchBox from "./SearchBox";

const MessageComponent = () => {
  const { id } = useParams();

  const [conversationId, setConversationId] = useState("");

  useEffect(() => {
    if (id) {
      setConversationId(id);
    }
  }, [id]);
  return (
    <div className="main m-auto my-24 ">
      <div className="grid grid-cols-9 msg my-8">
        <SideBar setConversationId={setConversationId} />
        {conversationId == id && <ChatBox id={conversationId} />}
      </div>
    </div>
  );
};

export default MessageComponent;
