import { useGetPostsQuery } from "../../../features/posts/postapi";
import PostCard from "./PostCard";
import Loader from "../../Loader/Loader";
import { useEffect } from "react";

const PostsListing = () => {
  const { data, isLoading, isSuccess, error } = useGetPostsQuery();

  console.log(error);
  return (
    <>
      {isLoading && <Loader />}
      {isSuccess &&
        data.posts &&
        data.posts.length > 0 &&
        data.posts.map((post) => <PostCard post={post} key={post._id} />)}
    </>
  );
};

export default PostsListing;
