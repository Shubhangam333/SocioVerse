import { useCallback, useEffect, useState } from "react";
import { useGetUserPostsMutation } from "../../../../features/posts/postapi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../../Loader/Loader";

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

  return (
    <div className="grid grid-cols-3 gap-2 my-8 ">
      {isLoading && <Loader />}
      {isSuccess &&
        data.userposts.map((post) =>
          post.images.length > 0 ? (
            <div className="w-full h-48">
              <img
                src={post.images[0].url}
                alt=""
                className="w-full h-full object-cover bg-center"
                key={Math.floor(Math.random() * 100)}
              />
            </div>
          ) : (
            <div className="w-full h-48">
              <img
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full object-cover"
                key={Math.floor(Math.random() * 100)}
              />
            </div>
          )
        )}
    </div>
  );
};

export default Gallery;
