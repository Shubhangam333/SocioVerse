import { useCallback, useEffect, useState } from "react";
import { useGetPostByIdMutation } from "../features/posts/postapi";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import PostCard from "../components/Home/PostFeed/PostCard";

const PostDisplayPage = () => {
  const [getPostById, { isLoading, data, isSuccess }] =
    useGetPostByIdMutation();
  const params = useParams();

  const [currentId, setCurrentId] = useState(null);

  const getPostDetail = useCallback(async () => {
    if (params.id && params.id !== currentId) {
      await getPostById(params.id);
      setCurrentId(params.id);
    }
  }, [params.id, currentId, getPostById]);

  useEffect(() => {
    getPostDetail();
  }, [getPostDetail]);

  return (
    <div className="w-10/12 m-auto my-24">
      {isLoading && <Loader className="m-80" />}
      {isSuccess && <PostCard post={data.post} />}
    </div>
  );
};

export default PostDisplayPage;
