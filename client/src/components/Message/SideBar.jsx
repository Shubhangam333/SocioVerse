import { BiMessageAltDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { useGetConversationsQuery } from "../../features/messages/messageapi";
import { useEffect, useState } from "react";
import {
  fetchConversations,
  setConversations,
  setDeleteConv,
} from "../../features/messages/messageSlice";
import ConversationCard from "./ConversationCard";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const SideBar = ({ setConversationId }) => {
  const { profile } = useSelector((state) => state.profile);
  const { conversations, fetchConv, deleteConv } = useSelector(
    (state) => state.message
  );

  const { data, isLoading, refetch } = useGetConversationsQuery();

  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setConversations(data.conversations));
    }
  }, [data, dispatch]);
  const navigate = useNavigate();
  useEffect(() => {
    if (fetchConv) {
      refetch();
      dispatch(fetchConversations(false));
    }
  }, [refetch, dispatch, fetchConv]);

  useEffect(() => {
    if (deleteConv) {
      dispatch(setDeleteConv(false));
      navigate("/message");
    }
  }, [dispatch, deleteConv, navigate]);

  const handleModal = () => {
    setModalActive(!modalActive);
  };

  return (
    <div className="col-span-3 flex flex-col mr-2">
      <div className="text-slate-600 border-2 border-slate-600 p-2 rounded-md flex justify-between items-center gap-2 mb-2 ">
        <div className="flex items-center">
          <h2>All Messages</h2>
          <BiMessageAltDetail className="text-lg " />
        </div>
        <button
          className="rounded-md bg-green-600 text-white mr-4 p-2"
          onClick={handleModal}
        >
          Add user
        </button>
      </div>

      <div className="text-slate-600 border-2 border-slate-600  rounded-md p-2 h-full">
        {modalActive && (
          <SearchBox
            handleModal={handleModal}
            setModalActive={setModalActive}
          />
        )}

        <div className="overflow-y-scroll h-96">
          {isLoading && <Loader />}
          {conversations &&
            conversations.map((conv) => (
              <ConversationCard
                key={conv._id}
                conv={conv}
                setConversationId={setConversationId}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
