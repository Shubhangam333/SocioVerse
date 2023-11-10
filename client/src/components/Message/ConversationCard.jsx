import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteConversationsMutation } from "../../features/messages/messageapi";
import { updateConversations } from "../../features/messages/messageSlice";

const ConversationCard = ({ conv, setConversationId }) => {
  const { online } = useSelector((state) => state.status);
  const { profile } = useSelector((state) => state.profile);

  const [deleteConversation, { isSuccess }] = useDeleteConversationsMutation();

  const navigate = useNavigate();

  const handleDelete = async (conversationId) => {
    try {
      const res = await deleteConversation(conversationId).unwrap();
      console.log(res);
      setConversationId("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/message");
    }
  }, [isSuccess, navigate]);

  return (
    <>
      {conv && (
        <Link to={`/message/${conv._id}`}>
          <div className="flex gap-2 items-center border-b-2 border-blue-400 justify-between ">
            <div className="flex items-center">
              <div>
                <img
                  src={conv.recipients[1].avatar.url}
                  className="rounded-full w-16 block"
                  alt=""
                />
              </div>

              <div className="flex flex-col h-100 w-100 ">
                <h2 className="text-lg text-slate-950 relative">
                  {conv.recipients[1].name}{" "}
                  {online.includes(conv.recipients[1]._id) ? (
                    <span className="absolute rounded-full border-4 border-green-600 top-2 "></span>
                  ) : (
                    ""
                  )}
                </h2>
                <p>{conv.recipients[1].name} </p>
              </div>
            </div>
            <button>
              <AiOutlineDelete
                onClick={() => handleDelete(conv.recipients[1]._id)}
              />
            </button>
          </div>
        </Link>
      )}
    </>
  );
};

export default ConversationCard;
