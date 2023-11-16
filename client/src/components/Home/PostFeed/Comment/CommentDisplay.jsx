import { useEffect, useState } from "react";

import { useDeleteCommentPostMutation } from "../../../../features/posts/postapi";
import { useDispatch, useSelector } from "react-redux";
import { useRemoveNotificationMutation } from "../../../../features/notify/notifyapi";

import CommentItem from "./CommentItem";
import PostModal from "../PostModal/PostModal";
import { setPostDisplay } from "../../../../features/posts/postSlice";

const CommentDisplay = ({ post }) => {
  const [edit, setisEdit] = useState(false);
  const [deleteComment] = useDeleteCommentPostMutation();
  const { socket } = useSelector((state) => state.socket);

  const [onReply, setOnReply] = useState(null);
  const [comments, setComments] = useState(null);
  const [isOpen, setIsOpen] = useState(null);
  const [showReplyId, setShowReplyId] = useState(null);
  const [reply, setReply] = useState(null);
  const [openComment, setOpenComment] = useState(null);
  const dispatch = useDispatch();

  const [removeNotify] = useRemoveNotificationMutation();
  const [postDisplay, setPostDisplay] = useState(null);

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
    setisEdit(true);
  };

  const handleEditClose = () => {
    setisEdit(false);
  };

  const toggleReply = (comment) => {
    if (isOpen === comment._id) {
      setIsOpen(null);
    } else {
      setIsOpen(comment._id);
    }
    setOnReply({ ...comment, commentId: comment._id });
  };

  const showReply = (commentId) => {
    if (showReplyId === commentId) {
      setShowReplyId(null);
      console.log("hi", showReplyId);
    } else {
      setShowReplyId(commentId);
      const reply = post && post.comments.filter((c) => c.reply === commentId);
      setReply(reply);
    }
  };

  useEffect(() => {
    if (post) {
      const cms = post.comments.filter((cm) => !cm.reply);
      setComments(cms.slice(0, 2));
    }
  }, [post]);

  const handleAllComments = (post) => {
    if (postDisplay === post._id) {
      dispatch(setPostDisplay(null));
    } else {
      dispatch(setPostDisplay(post._id));
    }
  };

  console.log("pd", postDisplay);

  return (
    <>
      <div className="w-full px-4 my-2 flex flex-col ">
        {comments &&
          comments.map(
            (comment) =>
              comment && (
                <CommentItem
                  key={comment._id}
                  toggleOpenComment={toggleOpenComment}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleEditClose={handleEditClose}
                  toggleReply={toggleReply}
                  showReply={showReply}
                  edit={edit}
                  onReply={onReply}
                  reply={reply}
                  comment={comment}
                  isOpen={isOpen}
                  showReplyId={showReplyId}
                  post={post}
                  openComment={openComment}
                />
              )
          )}
        {post.comments && post.comments.length > 4 && (
          <button
            className="text-sm text-slate-600 hover:text-slate-900 hover:underline vallreply"
            onClick={() => setPostDisplay(post._id)}
          >
            View all replies
          </button>
        )}
        {postDisplay === post._id && (
          <PostModal post={post} setPostDisplay={setPostDisplay} />
        )}
      </div>
    </>
  );
};

export default CommentDisplay;
