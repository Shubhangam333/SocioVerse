import React, { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";

const CommentDisplay = ({ post }) => {
  const [openComment, setOpenComment] = useState(null);
  const commentRef = useRef(null);

  const toggleOpenComment = (commentId) => {
    if (openComment === commentId) {
      setOpenComment(null);
    } else {
      setOpenComment(commentId);
    }
  };

  const handleClickOutside = (e) => {
    if (commentRef.current && !commentRef.current.contains(e.target)) {
      setOpenComment(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full mx-4 my-2 flex flex-col">
      {post.comments &&
        post.comments.map((c) => (
          <div
            key={c._id}
            className="flex border-l-2 border-red-600 my-2 relative"
          >
            <img
              src={c.user.avatar.url}
              alt="user profile pic"
              className="w-6 rounded-full"
            />
            <p>{c.content}</p>
            <button
              className="mx-2 opacity-0 hover:opacity-100"
              onClick={() => toggleOpenComment(c._id)}
            >
              <BsThreeDots />
            </button>
            {openComment === c._id && (
              <div
                ref={commentRef}
                className="absolute top-4 left-2 w-80 bg-white flex flex-col"
              >
                <button>Edit</button>
                <button>Delete</button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CommentDisplay;
