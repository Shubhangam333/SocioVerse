import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MessageCard = ({ f }) => {
  const { online } = useSelector((state) => state.status);
  return (
    <Link to={`/message/${f._id}`}>
      <div className="flex gap-2 items-center border-b-2 border-blue-400 ">
        <div>
          <img src={f.avatar.url} className="rounded-full w-16 block" alt="" />
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
    </Link>
  );
};

export default MessageCard;
