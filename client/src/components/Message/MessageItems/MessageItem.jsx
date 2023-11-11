import { useSelector } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const MessageItem = ({
  recipient,
  message,
  key,
  toggleDeleteModal,
  deleteModal,
  setDeleteModal,
}) => {
  const { profile } = useSelector((state) => state.profile);

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
              <div className="relative ">
                {deleteModal === message._id && (
                  <button
                    onClick={() => setDeleteModal(null)}
                    className="absolute del-view rounded-md  p-4 text-red-500 top-0"
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
            <button
              className="absolute text-slate-500 top-1 del-btn"
              onClick={() => toggleDeleteModal(message)}
            >
              <BsThreeDots />
            </button>
            {deleteModal === message._id && (
              <div className="absolute bg-slate-400 text-black  p-4  bottom-8 del-view z-50">
                <button>Delete Message</button>
              </div>
            )}
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
