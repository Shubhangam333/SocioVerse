import { BiMessageAltDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { useGetConversationsQuery } from "../../features/messages/messageapi";
import { useEffect, useState } from "react";
import { setConversations } from "../../features/messages/messageSlice";
import ConversationCard from "./ConversationCard";
import Loader from "../Loader/Loader";

const SideBar = ({ setConversationId }) => {
  const { profile } = useSelector((state) => state.profile);
  const { conversations } = useSelector((state) => state.message);

  const { data, isLoading } = useGetConversationsQuery();

  const [modalActive, setModalActive] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setConversations(data.conversations));
    }
  }, [data, dispatch]);

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
        {modalActive && <SearchBox handleModal={handleModal} />}

        <div className="overflow-y-scroll h-full">
          {isLoading && <Loader />}
          {conversations &&
            conversations.map((f) => (
              <ConversationCard
                key={f._id}
                f={f}
                setConversationId={setConversationId}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
