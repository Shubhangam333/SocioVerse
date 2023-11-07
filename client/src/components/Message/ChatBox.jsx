import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateMessageMutation } from "../../features/messages/messageapi";
import MessageDisplay from "./MessageDisplay";

const ChatBox = ({ id }) => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState("");
  const { profile } = useSelector((state) => state.profile);
  const [createMessage, { isLoading }] = useCreateMessageMutation();

  const [recipient, setRecipient] = useState(null);
  const { socket } = useSelector((state) => state.socket);
  // const [loadMedia, setLoadMedia] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setText("");
    setMedia([]);
    // setLoadMedia(true);

    let newArr = [];
    // if(media.length > 0) newArr = await imageUpload(media)

    const msg = {
      sender: profile._id,
      recipient: id,
      text,
      media: newArr,
    };

    try {
      const res = await createMessage(msg);
      if (res) {
        const { _id, avatar, name } = profile;
        socket.emit("addMessage", {
          ...msg,
          user: { _id, avatar, name },
        });

        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRecipient(profile.following.filter((f) => f._id === id));
  }, [id, profile.following]);

  return (
    <>
      {recipient && (
        <div className="col-span-6 relative  rounded-md">
          <div className="bg-white flex justify-between border-2 border-slate-600 rounded-tl-md rounded-tr-md">
            <div className="flex gap-2 items-center">
              <img src={recipient[0].avatar.url} alt="" className="w-12" />
              <div className="flex-col ">
                <p className="text-xl">{recipient[0].name}</p>
                <div className="flex gap-2 text-sm text-gray-600">
                  <span>{recipient[0].followers.length} followers</span>
                  <span>{recipient[0].following.length} following</span>
                </div>
              </div>
            </div>
          </div>

          <MessageDisplay id={id} />

          <form
            id="send-message"
            className="chat-form "
            onSubmit={handleSubmit}
          >
            <div className="flex w-full border-2 border-slate-500 rounded-bl-md rounded-br-md">
              <input
                type="text"
                id="message"
                placeholder="Enter your message..."
                className="chat-input text-lg rounded-md flex-1"
                onChange={(e) => setText(e.target.value)}
                value={text}
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
      )}
    </>
  );
};

export default ChatBox;
