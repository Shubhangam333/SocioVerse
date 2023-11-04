import { BiMessageAltDetail } from "react-icons/bi";
import { useSelector } from "react-redux";
import MessageCard from "./MessageCard";

const SideBar = () => {
  const { profile } = useSelector((state) => state.profile);

  return (
    <div className="rounded-md  col-span-3 flex flex-col">
      <div className="text-slate-600 border-2 border-slate-600 p-2 rounded-full flex justify-center items-center gap-2 ">
        <h2>All Messages</h2>
        <BiMessageAltDetail className="text-lg " />
      </div>
      <div className="text-slate-600 border-2 border-slate-600  rounded-md p-2">
        <div className="overflow-y-scroll h-96">
          {profile.following.map((f) => (
            <MessageCard key={f._id} f={f} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
