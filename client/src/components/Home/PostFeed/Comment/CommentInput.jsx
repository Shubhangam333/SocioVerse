import { useState } from "react";
import { useCreateCommentPostMutation } from "../../../../features/posts/postapi";

const CommentInput = ({ post }) => {
  const [content, setContent] = useState("");
  const [createComment, { isLoading }] = useCreateCommentPostMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("comment", content, post);

    try {
      const res = await createComment({
        content,
        postUserId: post.user._id,
        postId: post._id,
      }).unwrap();
      console.log("comment", res.newComment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="py-2 px-4 flex justify-between" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full px-2 focus:border-b-2 focus:border-slate-600 focus:outline-none  bg-slate-100 py-2"
        placeholder="Write a comment"
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="px-2 bg-blue-500 text-white ">Post</button>
    </form>
  );
};

export default CommentInput;
