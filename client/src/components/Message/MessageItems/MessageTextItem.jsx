import { useSelector } from "react-redux";

const MessageTextItem = ({ recipient, message, key }) => {
  const { profile } = useSelector((state) => state.profile);
  return (
    <>
      {profile._id !== recipient ? (
        <div className="self-start ">
          <div className="message bg-green-500 px-2  rounded-md m-2 w-fit mr-0">
            <p className="text-right"> {message.text}</p>
          </div>

          {message.media &&
            message.media.map((m) => (
              <div key={m._id}>
                <img src={m.url} className="rounded-md" />
              </div>
            ))}
        </div>
      ) : (
        <div className="self-end " key={key}>
          <div className="message bg-red-500 px-2 rounded-md m-2  w-fit mr-0">
            <p> {message.text}</p>
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

export default MessageTextItem;
