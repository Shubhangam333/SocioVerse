import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

const PostInput = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => setModalOpen(true)}
      >
        Create Post
      </button>

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default PostInput;
