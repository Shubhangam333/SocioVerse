import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineSave,
} from "react-icons/ai";

const PostCard = ({ post }) => {
  return (
    <div className="m-4 shadow-2xl">
      <p className="truncate">{post.content}</p>
      <div>
        <img src={post.images[0].url} alt="images" />
      </div>
      <div className="flex justify-between my-4">
        <div className="flex gap-4">
          <AiOutlineHeart className="text-2xl" />
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
