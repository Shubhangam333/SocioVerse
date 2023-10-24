import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDeleteCommentPostMutation } from "../../../../features/posts/postapi";
import { useSelector } from "react-redux";
import { useRemoveNotificationMutation } from "../../../../features/notify/notifyapi";

const CommentDisplay = ({ post }) => {
  const [openComment, setOpenComment] = useState(null);
  const [edit, setisEdit] = useState(false);
  const [deleteComment] = useDeleteCommentPostMutation();
  const { socket } = useSelector((state) => state.socket);

  const { userInfo } = useSelector((state) => state.auth);
  const [removeNotify] = useRemoveNotificationMutation();

  const toggleOpenComment = (commentId) => {
    if (openComment === commentId) {
      setOpenComment(null);
    } else {
      setOpenComment(commentId);
    }
  };

  const handleDelete = async (comment) => {
    try {
      const res = await deleteComment(comment._id).unwrap();
      console.log("del", res);

      const deleteArr = [
        ...post.comments.filter((cm) => cm.reply === comment._id),
        comment,
      ];

      const newPost = {
        ...post,
        comments: post.comments.filter(
          (cm) => !deleteArr.find((da) => cm._id === da._id)
        ),
      };
      // Socket
      socket.emit("deleteComment", newPost);

      const msg = {
        id: comment._id,
        text: comment.reply
          ? "mentioned you in a comment."
          : "has commented on your post.",
        recipients: comment.reply ? [comment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
      };
      const notifyres = await removeNotify(msg).unwrap();

      if (notifyres) {
        socket.emit("removeNotify", msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (comment) => {
    console.log("edit");
    setisEdit(true);
  };

  const handleEditClose = () => {
    setisEdit(false);
  };
  return (
    <div className="w-full px-4 my-2 flex flex-col">
      {post.comments &&
        post.comments.map((comment) => (
          <div
            key={comment._id}
            className="flex border-l-2 border-red-600 my-2 relative"
          >
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
          </div>
        ))}
    </div>
  );
};

export default CommentDisplay;
