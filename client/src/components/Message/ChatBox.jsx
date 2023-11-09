import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateMessageMutation } from "../../features/messages/messageapi";
import MessageDisplay from "./MessageDisplay";
import { ImAttachment } from "react-icons/im";

const ChatBox = ({ id }) => {
  const [text, setText] = useState("");
  const [media, setMedia] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    console.log(files);

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

          <MessageDisplay
            id={id}
            handleDeleteImage={handleDeleteImage}
            imagePreviews={imagePreviews}
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
