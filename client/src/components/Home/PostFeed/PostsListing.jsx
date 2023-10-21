import { useGetPostsQuery } from "../../../features/posts/postapi";
import PostCard from "./PostCard";
import Loader from "../../Loader/Loader";
import { useSelector } from "react-redux";

const PostsListing = () => {
  const { posts } = useSelector((state) => state.post);

  return (
    <>{posts && posts.map((post) => <PostCard post={post} key={post._id} />)}</>
  );
};

export default PostsListing;
