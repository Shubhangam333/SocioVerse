import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineSave,
} from "react-icons/ai";
import PostImageCarousel from "./PostImageCaraousel";
import { useState } from "react";
import {
  useLikePostMutation,
  useUnLikePostMutation,
} from "../../../features/posts/postapi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnLikePostMutation();
  const [postLiked, setPostLiked] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const handleLike = async () => {
    try {
      const res = await likePost(post._id).unwrap();
      toast.success(res.msg);
      setPostLiked(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnLike = async () => {
    try {
      const res = await unlikePost(post._id).unwrap();
      toast.success(res.msg);
      setPostLiked(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (post.likes.includes(userInfo._id)) {
      setPostLiked(true);
    }
  }, [post.likes, userInfo._id]);

  return (
    <div className="m-4 shadow-2xl">
      <p className="truncate">{post.content}</p>
      <div>
        <PostImageCarousel images={post.images} />
      </div>
      <div className="flex justify-between my-4">
        <div className="flex gap-4">
          {postLiked ? (
            <AiFillHeart
              className="text-2xl text-red-500 cursor-pointer"
              onClick={handleUnLike}
            />
          ) : (
            <AiOutlineHeart
              className="text-2xl cursor-pointer"
              onClick={handleLike}
            />
          )}
          <AiOutlineComment className="text-2xl" />
        </div>
        <div>
          <AiOutlineSave className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
