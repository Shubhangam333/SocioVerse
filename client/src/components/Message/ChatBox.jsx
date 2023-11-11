import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreateMessageMutation } from "../../features/messages/messageapi";
import MessageDisplay from "./MessageDisplay";
import { ImAttachment } from "react-icons/im";
import { fetchConversations } from "../../features/messages/messageSlice";

const ChatBox = ({ conversationId }) => {
  const [text, setText] = useState("");
  const [recipient, setRecipient] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { profile } = useSelector((state) => state.profile);
  const [createMessage] = useCreateMessageMutation();

  const { socket } = useSelector((state) => state.socket);
  const { conversations, isRecipient } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const formData = new FormData();

    formData.append("sender", profile._id);
    formData.append("recipient", recipient._id);
    formData.append("text", text);

    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("media", selectedImages[i]);
    }

    let mediaArray = [];

    if (imagePreviews.length > 0) {
      for (let i = 0; i < imagePreviews.length; i++) {
        mediaArray.push(imagePreviews[i]);
      }
    }

    const msg = {
      sender: profile._id,
      recipient: recipient._id,
      text,
      media: mediaArray,
    };

    try {
      const res = await createMessage(formData);
      if (res) {
        const { _id, avatar, name } = profile;
        socket.emit("addMessage", {
          ...msg,
          user: { _id, avatar, name },
        });

        setText("");
        setImagePreviews([]);
        setSelectedImages([]);

        dispatch(fetchConversations(true));
      }
    } catch (error) {
      console.log("er", error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      setSelectedImages((prevImages) => [...prevImages, file]);

      const reader = new FileReader();
      reader.onload = (e) => {
        // console.log(e.target.result);

        setImagePreviews((prevImagePrev) => [
          ...prevImagePrev,
          e.target.result,
        ]);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index) => {
    setSelectedImages((prevSelectedImages) => {
      const newSelectedImages = [...prevSelectedImages];
      newSelectedImages.splice(index, 1);
      return newSelectedImages;
    });

    setImagePreviews((prevImagePreviews) => {
      const newImagePreviews = [...prevImagePreviews];
      newImagePreviews.splice(index, 1);
      return newImagePreviews;
    });
  };

  useEffect(() => {
    const convdata = conversations.find((c) => c._id === conversationId);
    if (convdata) {
      if (isRecipient) {
        setRecipient(convdata.recipients[0]);
      } else {
        setRecipient(convdata.recipients[1]);
      }
    }
  }, [conversationId, conversations, isRecipient]);

  return (
    <>
      {recipient && (
        <div className="col-span-6 relative  rounded-md">
          <div className="bg-white flex justify-between border-2 border-slate-600 rounded-tl-md rounded-tr-md">
            <div className="flex gap-2 items-center">
              <img src={recipient.avatar.url} alt="" className="w-12" />
              <div className="flex-col ">
                <p className="text-xl">{recipient.name}</p>
                <div className="flex gap-2 text-sm text-gray-600"></div>
              </div>
            </div>
          </div>

          <MessageDisplay
            id={conversationId}
            handleDeleteImage={handleDeleteImage}
            imagePreviews={imagePreviews}
            recipientId={recipient._id}
          />

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
                className="chat-input text-lg flex-1 focus:outline-none px-2 py-1"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              {/* <button className="px-2"></button> */}

              <div className="flex justify-center items-center ">
                <label htmlFor="fileInput" className="hover:cursor-pointer">
                  <ImAttachment className="text-xl " />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="fileInput"
                  name="postimage"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                className="chat-btn w-12 bg-blue-500 text-white focus:scale-105 hover:scale-x-105"
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
