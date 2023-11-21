import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDeleteConversationsMutation } from "../../features/messages/messageapi";
import { setisRecipient } from "../../features/messages/messageSlice";

const ConversationCard = ({ conv, setConversationId }) => {
  const { online } = useSelector((state) => state.status);
  const { profile } = useSelector((state) => state.profile);

  const [deleteConversation, { isSuccess }] = useDeleteConversationsMutation();
  const { isRecipient } = useSelector((state) => state.message);
  const { socket } = useSelector((state) => state.socket);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (conversationId) => {
    const msg = { recipient: conv.recipients[1]._id };
    try {
      const res = await deleteConversation(conversationId).unwrap();
      console.log(res);
      setConversationId("");
      socket.emit("deleteConversation", msg);
      navigate("/message");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/message");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (conv.recipients[1] && conv.recipients[1]._id === profile._id) {
      dispatch(setisRecipient());
      console.log("hello");
    }
  }, [conv, profile._id, isRecipient, dispatch]);

  return (
    <>
      {conv && !isRecipient && conv.recipients[1] ? (
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
                <p>{conv.text} </p>
              </div>
            </div>
            <button>
              <AiOutlineDelete
                onClick={() => handleDelete(conv.recipients[1]._id)}
              />
            </button>
          </div>
        </Link>
      ) : (
        conv.recipients[0] && (
          <Link to={`/message/${conv._id}`}>
            <div className="flex gap-2 items-center border-b-2 border-blue-400 justify-between ">
              <div className="flex items-center">
                <div>
                  <img
                    src={conv.recipients[0].avatar.url}
                    className="rounded-full w-16 block"
                    alt=""
                  />
                </div>

                <div className="flex flex-col h-100 w-100 ">
                  <h2 className="text-lg text-slate-950 relative">
                    {conv.recipients[0].name}{" "}
                    {online.includes(conv.recipients[0]._id) ? (
                      <span className="absolute rounded-full border-4 border-green-600 top-2 "></span>
                    ) : (
                      ""
                    )}
                  </h2>
                  <p>{conv.text} </p>
                </div>
              </div>
              <button>
                <AiOutlineDelete
                  onClick={() => handleDelete(conv.recipients[0]._id)}
                />
              </button>
            </div>
          </Link>
        )
      )}
    </>
  );
};

export default ConversationCard;
