import PostInput from "./PostInput";
import PostsListing from "./PostsListing";

const PostFeed = () => {
  return (
    <div className="col-span-4">
      <PostInput />
      <PostsListing />
    </div>
  );
};

export default PostFeed;
