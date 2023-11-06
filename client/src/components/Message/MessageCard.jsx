import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MessageCard = ({ f }) => {
  const { online } = useSelector((state) => state.status);
  const { profile } = useSelector((state) => state.profile);

  const [recipient, setRecipient] = useState("");
  useEffect(() => {
    if (f.recipients) {
      setRecipient(f.recipients.find((r) => r._id !== profile._id));
    } else {
      setRecipient(f);
    }
  }, [f.recipients, profile._id, f]);

  console.log();
  return (
    <>
      {recipient && (
        <Link to={`/message/${recipient._id}`}>
          <div className="flex gap-2 items-center border-b-2 border-blue-400 ">
            <div>
              <img
                src={recipient.avatar.url}
                className="rounded-full w-16 block"
                alt=""
              />
            </div>

            <div className="flex flex-col h-100 w-100 ">
              <h2 className="text-lg text-slate-950 relative">
                {recipient.name}{" "}
                {online.includes(recipient._id) ? (
                  <span className="absolute rounded-full border-4 border-green-600 top-2 "></span>
                ) : (
                  ""
                )}
              </h2>
              <p>{recipient.name} </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default MessageCard;
