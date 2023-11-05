import { BiMessageAltDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import MessageCard from "./MessageCard";
import SearchBox from "./SearchBox";
import { useGetConversationsQuery } from "../../features/messages/messageapi";
import { useEffect } from "react";
import { setConversations } from "../../features/messages/messageSlice";

const SideBar = () => {
  const { profile } = useSelector((state) => state.profile);
  const { conversations } = useSelector((state) => state.message);

  const { data, isLoading } = useGetConversationsQuery();

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setConversations(data.conversations));
    }
  }, [data, dispatch]);

  return (
    <div className="rounded-md  col-span-3 flex flex-col">
      <div className="text-slate-600 border-2 border-slate-600 p-2 rounded-full flex justify-center items-center gap-2 ">
        <h2>All Messages</h2>
        <BiMessageAltDetail className="text-lg " />
      </div>

      <div className="text-slate-600 border-2 border-slate-600  rounded-md p-2">
        <SearchBox />
        <div className="overflow-y-scroll h-96">
          {conversations &&
            conversations.map((f) => <MessageCard key={f._id} f={f} />)}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
