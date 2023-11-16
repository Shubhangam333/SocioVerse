import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import PostImageCarousel from "./PostImageCaraousel";
import { useState } from "react";
import {
  useLikePostMutation,
  useUnLikePostMutation,
  useSavePostMutation,
  useUnSavePostMutation,
} from "../../../features/posts/postapi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateNotificationMutation,
  useRemoveNotificationMutation,
} from "../../../features/notify/notifyapi";
import CommentCard from "./CommentCard";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useRef } from "react";
import { setPostDisplay } from "../../../features/posts/postSlice";

const PostCard = ({ post }) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnLikePostMutation();
  const [savePost] = useSavePostMutation();
  const [unSavePost] = useUnSavePostMutation();
  const [createNotify] = useCreateNotificationMutation();
  const [removeNotify] = useRemoveNotificationMutation();
  const [postLiked, setPostLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const { postDisplay } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const postModal = useRef();
  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const res = await likePost(post._id).unwrap();
      toast.success(res.msg);
      setPostLiked(true);

      const newPost = { ...post, likes: [...post.likes, userInfo] };

      socket.emit("likePost", newPost);

      // Notify
      const msg = {
        id: userInfo._id,
        text: "like your post.",
        recipients: [post.user._id],
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
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnLike = async () => {
    try {
      const res = await unlikePost(post._id).unwrap();
      toast.success(res.msg);
      setPostLiked(false);

      console.log(res);

      const newPost = {
        ...post,
        likes: [...post.likes.filter((like) => like._id !== userInfo._id)],
      };

      socket.emit("unLikePost", newPost);

      // Notify
      const msg = {
        id: userInfo._id,
        text: "like your post.",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };

      const notifyres = await removeNotify(msg).unwrap();

      if (notifyres) {
        socket.emit("removeNotify", msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    const res = await savePost(post._id).unwrap();
    toast.success(res.msg);
    setPostSaved(true);
  };
  const handleUnSave = async () => {
    const res = await unSavePost(post._id).unwrap();
    toast.success(res.msg);
    setPostSaved(false);
  };
  useEffect(() => {
    const isUserLiked = post.likes.some((like) => like._id === userInfo._id);
    if (isUserLiked) {
      setPostLiked(true);
    }

    const isPostSaved = post.saved.some((s) => s === userInfo._id);

    if (isPostSaved) {
      setPostSaved(true);
    }
  }, [post.likes, userInfo._id, post._id, post.saved]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        postModal.current &&
        !postModal.current.contains(event.target) &&
        !event.target.classList.contains("vallreply") &&
        postDisplay === post._id
      ) {
        dispatch(setPostDisplay(null));
      }
    };

    document.addEventListener("click", handleClickOutside);

    // Remove event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch, post._id, postDisplay]);

  const toggleReadMore = () => {
    setExpanded(!isExpanded);
  };

  const truncatedContent = isExpanded
    ? post.content
    : post.content.slice(0, 150);

  return (
    <div
      className={` ${postDisplay === post._id ? "modal-overlay z-50 " : ""}`}
    >
      <div
        className={` ${
          postDisplay === post._id
            ? "post-modal w-3/5 px-4 py-4"
            : "m-4 shadow-2xl border-2 border-slate-300 card"
        }`}
        ref={postModal}
      >
        <div className="flex items-center border-2 border-slate-800 py-2">
          <img
            src={post.user && post.user.avatar.url}
            alt="userprofilepic"
            className="w-6 rounded-full border-2 border-blue-500"
          />
          <p>{post.user && post.user.name}</p>
        </div>
        <p className=" py-4">
          {truncatedContent}{" "}
          {!isExpanded && post.content.length > 150 && (
            <button
              onClick={toggleReadMore}
              className="text-blue-500 hover:underline"
            >
              Read more
            </button>
          )}
          {isExpanded && post.content.length > 150 && (
            <button
              onClick={toggleReadMore}
              className="text-blue-500 hover:underline"
            >
              See Less
            </button>
          )}
        </p>
        <div>
          <PostImageCarousel images={post.images} />
        </div>
        <div className="flex justify-between mt-4">
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

          {postSaved ? (
            <button onClick={handleUnSave}>
              <BsBookmarkFill className="text-2xl" />
            </button>
          ) : (
            <button onClick={handleSave}>
              <BsBookmark className="text-2xl" />
            </button>
          )}
        </div>
        <div className="text-sm">
          {post.likes.length > 0 ? (
            <p>
              {post.likes[0].name}
              {post.likes.length < 2
                ? " "
                : `  and ${post.likes.length - 1} other `}
              Liked this
            </p>
          ) : (
            ""
          )}
        </div>
        <CommentCard post={post} />
      </div>
    </div>
  );
};

export default PostCard;
