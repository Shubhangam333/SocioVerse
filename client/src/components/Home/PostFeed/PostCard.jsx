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
import { useDispatch, useSelector } from "react-redux";
import { useCreateNotificationMutation } from "../../../features/notify/notifyapi";

const PostCard = ({ post }) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnLikePostMutation();
  const [createNotify] = useCreateNotificationMutation();
  const [postLiked, setPostLiked] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const res = await likePost(post._id).unwrap();
      toast.success(res.msg);
      setPostLiked(true);

      const newPost = { ...post, likes: [...post.likes] };

      socket.emit("likePost", newPost);

      // Notify
      const msg = {
        text: "like your post.",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      const notifyres = await createNotify(msg).unwrap();
      console.log(notifyres);

      if (notifyres) {
        socket.emit("createNotify", {
          ...notifyres.notifies,
          user: {
            username: userInfo.name,
            avatar: userInfo.avatar,
          },
        });
      }
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
