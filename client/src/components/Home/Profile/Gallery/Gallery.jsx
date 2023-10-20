import { useCallback, useEffect, useState } from "react";
import { useGetUserPostsMutation } from "../../../../features/posts/postapi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const Gallery = ({ user }) => {
  const [userPosts, { data, isSuccess, isLoading }] = useGetUserPostsMutation();

  const [userPost, setUserPost] = useState([]);

  const getUserPosts = useCallback(async () => {
    try {
      const res = await userPosts(user._id).unwrap();
      setUserPost(res.userposts);
    } catch (err) {
      // toast.error(err?.data?.message || err.error);
    }
  }, [user._id, userPosts]);

  useEffect(() => {
    getUserPosts();
  }, [getUserPosts]);

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-2 my-8 ">
      {isLoading && <Loader />}
      {isSuccess &&
        data.userposts.map((post) =>
          post.images.length > 0 ? (
            <div
              className="w-full h-48"
              key={post._id}
              onClick={() => navigate(`/post/${post._id}`)}
            >
              <img
                src={post.images[0].url}
                alt=""
                className="w-full h-full object-cover bg-center"
              />
            </div>
          ) : (
            <div
              className="w-full h-48"
              key={post._id}
              onClick={() => navigate(`/post/${post._id}`)}
            >
              <img
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )
        )}
    </div>
  );
};

export default Gallery;
