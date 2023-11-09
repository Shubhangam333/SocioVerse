const MessageTextItem = ({ id, recipient, message }) => {
  console.log(message);
  return (
    <>
      {id === recipient ? (
        <div className="self-start">
          <div className="message bg-green-500 px-2 w-fit rounded-md m-2 ">
            {message.text}
          </div>
          <div className="">
            {message.media &&
              message.media.map((m) => (
                <img src={m.url} key={m._id} className="rounded-md" />
              ))}
          </div>
        </div>
      ) : (
        <div className="self-end mb-2">
          <div className="message bg-red-500 px-2 w-fit rounded-md m-2 self-end">
            {message.text}
          </div>
          <div className="self-end ">
            {message.media &&
              message.media.map((m) => (
                <img src={m.url} key={m._id} className="rounded-md" />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageTextItem;
