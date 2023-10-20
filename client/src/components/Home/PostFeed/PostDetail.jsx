import React, { useState } from "react";

const PostDetail = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 mb-4">
      <p className="text-xl font-semibold">Post Title</p>
      <p className="text-gray-600">Posted by User on Date</p>
      <p className="mt-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="mt-4 flex justify-between">
        <button
          className={`flex items-center ${
            isLiked ? "text-red-500" : "text-gray-500"
          }`}
          onClick={handleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isLiked ? "M6 18L18 6M6 6l12 12" : "M6 18L18 6M6 6l12 12"}
            />
          </svg>
          Like
        </button>
        <button
          className={`flex items-center ${
            isSaved ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={handleSave}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isSaved ? "M12 4v16m8-8H4" : "M12 4v16m8-8H4"}
            />
          </svg>
          Save
        </button>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-2 py-1 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
          onClick={handleComment}
        >
          Comment
        </button>
      </div>

      <div className="mt-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded-md mb-2">
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
