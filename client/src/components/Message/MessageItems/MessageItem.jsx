import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useDeleteMessagesMutation } from "../../../features/messages/messageapi";
import { toast } from "react-toastify";

const MessageItem = ({
  recipient,
  message,
  key,
  toggleDeleteModal,
  deleteModal,
  setDeleteModal,
}) => {
  const { profile } = useSelector((state) => state.profile);
  const { socket } = useSelector((state) => state.socket);

  const [deleteMessage, { isLoading }] = useDeleteMessagesMutation();

  const handleDelete = async (messageId) => {
    try {
      const res = await deleteMessage(messageId).unwrap();
      if (res) {
        toast.success("Message Deleted");
        const msg = { recipient };
        socket.emit("deleteMessage", msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {profile._id !== recipient ? (
        <>
          <div className="self-start ">
            <div className="message bg-green-500 px-2  rounded-md m-2 w-fit mr-0 relative flex items-center">
              <p className="text-right"> {message.text}</p>
              <button
                className="absolute text-slate-500 top-1 del-btn opacity-0 hover:opacity-100"
                onClick={() => toggleDeleteModal(message)}
              >
                <BsThreeDots />
              </button>
              <div className="absolute  del-view rounded-md  p-4 text-red-500  ">
                {deleteModal === message._id && (
                  <button
                    className=""
                    onClick={() => handleDelete(message._id)}
                  >
                    <AiFillDelete />
                  </button>
                )}
              </div>
            </div>

            {message.media &&
              message.media.map((m) => (
                <div key={m._id}>
                  <img src={m.url} className="rounded-md" />
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="self-end ">
          <div className="message bg-red-500 px-2 rounded-md m-2  w-fit mr-0 relative">
            <p> {message.text}</p>
          </div>

          {message.media &&
            message.media.map((m) => (
              <div key={m._id}>
                <img src={m.url} className="rounded-md " />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default MessageItem;
