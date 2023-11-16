import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReplyInput from "./Reply/ReplyInput";
import ReplyComponent from "./Reply/ReplyComponent";
import { BsReply, BsThreeDots } from "react-icons/bs";

const CommentItem = ({
  comment,
  toggleOpenComment,
  handleDelete,
  handleEdit,
  handleEditClose,
  toggleReply,
  showReply,
  edit,
  onReply,
  reply,
  isOpen,
  showReplyId,
  openComment,
  post,
}) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="flex border-l-2 border-red-600 my-2 relative">
        <img
          src={comment && comment.user.avatar.url}
          alt="user profile pic"
          className="w-6 rounded-full"
        />
        {!edit ? (
          <p>{comment.content}</p>
        ) : (
          <input type="text" value={comment.content} />
        )}

        {comment.user._id === userInfo._id && (
          <button
            className="mx-2"
            onClick={() => toggleOpenComment(comment._id)}
          >
            <BsThreeDots />
          </button>
        )}

        {openComment === comment._id && (
          <div className="absolute bottom-0 right-12 w-20 bg-white flex gap-4 shade z-30">
            {!edit ? (
              <button
                className="bg-blue-400 px-2 text-white rounded-md"
                onClick={() => handleEdit(comment)}
              >
                Edit
              </button>
            ) : (
              <button
                className="bg-blue-400 px-2 text-white rounded-md"
                onClick={handleEditClose}
              >
                Cancel
              </button>
            )}
            <button
              className="bg-red-400 px-2 text-white rounded-md"
              onClick={() => handleDelete(comment)}
            >
              Delete
            </button>
          </div>
        )}

        <BsReply className="text-xl" onClick={() => toggleReply(comment)} />
        {isOpen === comment._id && (
          <ReplyInput
            comment={comment}
            isOpen={isOpen}
            onReply={onReply}
            post={post}
          />
        )}
      </div>

      {comment.replyCount > 0 && (
        <ReplyComponent showReply={showReply} comment={comment} reply={reply} />
      )}

      <div>
        {showReplyId === comment._id && (
          <div>
            {reply &&
              reply.map((r) => (
                <div
                  key={r._id}
                  className="flex border-l-2 border-red-600 my-2 relative mx-8"
                >
                  <p>{r.content}</p>
                  <img
                    src={r.user && r.user.avatar.url}
                    alt="user profile pic"
                    className="w-6 rounded-full"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CommentItem;
