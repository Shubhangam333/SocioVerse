const ReplyComponent = ({ reply, comment, showReply }) => {
  return (
    <>
      {" "}
      {
        <div className="mx-4 my-2 ">
          <button
            className="text-sm text-slate-600 hover:text-slate-900 hover:underline "
            onClick={() => showReply(comment._id)}
          >
            View all replies
          </button>
        </div>
      }
    </>
  );
};

export default ReplyComponent;
