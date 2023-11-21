import { useState } from "react";
import { useCreateCommentPostMutation } from "../../../../features/posts/postapi";
import { useSelector } from "react-redux";
import { useCreateNotificationMutation } from "../../../../features/notify/notifyapi";

const CommentInput = ({ post }) => {
  const [content, setContent] = useState("");
  const [createComment, { isLoading }] = useCreateCommentPostMutation();
  const { socket } = useSelector((state) => state.socket);

  const { userInfo } = useSelector((state) => state.auth);
  const [createNotify] = useCreateNotificationMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createComment({
        content,
        postUserId: post.user._id,
        postId: post._id,
      }).unwrap();
      console.log("comment", res.newComment);

      setContent("");

      const newData = { ...res.newComment, user: userInfo };
      const newPost = {
        ...post,
        comments: [...post.comments, newData],
      };

      // Socket
      socket.emit("createComment", newPost);

      // Notify
      const msg = {
        id: res.newComment._id,
        text: res.newComment.reply
          ? "mentioned you in a comment."
          : "has commented on your post.",
        recipients: res.newComment.reply
          ? [res.newComment.tag._id]
          : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };
      const notifyres = await createNotify(msg).unwrap();

      if (notifyres) {
        socket.emit("createNotify", {
          ...notifyres.notifies,
          user: {
            name: userInfo.name,
            avatar: userInfo.avatar,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="text-lg my-2 px-4 flex justify-between"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="w-full px-2 focus:border-b-2 focus:border-slate-600 focus:outline-none  bg-slate-100 py-2"
        placeholder="Write a comment"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button className="px-2 bg-blue-500 text-white rounded-md">Post</button>
    </form>
  );
};

export default CommentInput;
