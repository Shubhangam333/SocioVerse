import { BiMessageAltDetail } from "react-icons/bi";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { profile } = useSelector((state) => state.profile);
  const { online } = useSelector((state) => state.status);
  return (
    <div className="rounded-md  col-span-3 flex flex-col">
      <div className="text-slate-600 border-2 border-slate-600 p-2 rounded-full flex justify-center items-center gap-2 ">
        <h2>All Messages</h2>
        <BiMessageAltDetail className="text-lg " />
      </div>
      <div className="text-slate-600 border-2 border-slate-600  rounded-md p-2">
        <div className="overflow-y-scroll h-96">
          {profile.following.map((f) => (
            <div
              className="flex gap-2 items-center border-b-2 border-blue-400 "
              key={f._id}
            >
              <div>
                <img
                  src={f.avatar.url}
                  className="rounded-full w-16 block"
                  alt=""
                />
              </div>

              <div className="flex flex-col h-100 w-100 ">
                <h2 className="text-lg text-slate-950 relative">
                  {f.name}{" "}
                  {online.includes(f._id) ? (
                    <span className="absolute rounded-full border-4 border-green-600 top-2 "></span>
                  ) : (
                    ""
                  )}
                </h2>
                <p>{f.name} </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
