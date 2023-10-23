import CommentDisplay from "./Comment/CommentDisplay";
import CommentInput from "./Comment/CommentInput";

const CommentCard = ({ post }) => {
  return (
    <>
      <CommentDisplay post={post} />
      <CommentInput post={post} />
    </>
  );
};

export default CommentCard;
