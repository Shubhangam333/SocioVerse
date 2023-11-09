const MessageTextItem = ({ id, recipient, message, key }) => {
  return (
    <>
      {id === recipient ? (
        <div className="self-start " key={key}>
          <div className="message bg-green-500 px-2  rounded-md m-2 w-fit mr-0">
            <p className="text-right"> {message.text}</p>
          </div>
          <div>
            {message.media &&
              message.media.map((m) => (
                <img src={m.url} key={m._id} className="rounded-md" />
              ))}
          </div>
        </div>
      ) : (
        <div className="self-end " key={key}>
          <div className="message bg-red-500 px-2 rounded-md m-2  w-fit mr-0">
            <p> {message.text}</p>
          </div>
          <div>
            {message.media &&
              message.media.map((m) => (
                <img src={m.url} key={m._id} className="rounded-md " />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MessageTextItem;
