import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

const PostInput = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="px-4">
      <button
        className="flex justify-between items-center w-full"
        onClick={() => setModalOpen(true)}
      >
        <p>Whats on your mind?</p>
        <span className="px-4 py-2 bg-blue-500 text-white rounded-md">
          {" "}
          Create Post
        </span>
      </button>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default PostInput;
