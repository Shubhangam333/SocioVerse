import { useSelector } from "react-redux";
import {
  useFollowMutation,
  useUnFollowMutation,
} from "../../../features/profile/profileapi";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const ProfileInfo = ({ user }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const [following, setFollowing] = useState(false);

  const [followUser] = useFollowMutation();
  const [unFollowUser] = useUnFollowMutation();
  const handleFollow = async () => {
    try {
      const res = await followUser(user._id).unwrap();
      toast.success(res.msg);
      setFollowing(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnFollow = async () => {
    try {
      const res = await unFollowUser(user._id).unwrap();
      toast.success(res.msg);
      setFollowing(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      userInfo.following &&
      user._id &&
      userInfo.following.includes(user._id)
    ) {
      setFollowing(true);
    }
    console.log("followring", following);
  }, [userInfo.following, user._id, following]);

  return (
    <>
      <p className="text-center text-2xl">{user.name}</p>

      <div className="flex justify-between">
        {userInfo._id !== user._id ? (
          following ? (
            <button
              className="rounded-md bg-red-500 text-white px-4 py-2 "
              onClick={handleUnFollow}
            >
              UnFollow
            </button>
          ) : (
            <button
              className="rounded-md bg-red-500 text-white px-4 py-2 "
              onClick={handleFollow}
            >
              Follow
            </button>
          )
        ) : null}

        <div className="flex gap-8">
          <p>Followers: {user.followers.length}</p>
          <p>Following: {user.following.length}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
