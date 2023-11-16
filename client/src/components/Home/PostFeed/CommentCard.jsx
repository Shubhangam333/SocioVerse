import { useState } from "react";
import CommentDisplay from "./Comment/CommentDisplay";
import CommentInput from "./Comment/CommentInput";

const CommentCard = ({ post }) => {
  return (
    <>
      <CommentInput post={post} />
      <CommentDisplay post={post} />
    </>
  );
};

export default CommentCard;
