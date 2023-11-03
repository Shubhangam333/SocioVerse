import { useDispatch, useSelector } from "react-redux";
import {
  useFollowMutation,
  useUnFollowMutation,
} from "../../../features/profile/profileapi";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import {
  useCreateNotificationMutation,
  useRemoveNotificationMutation,
} from "../../../features/notify/notifyapi";

const ProfileInfo = ({ user }) => {
  const { profile } = useSelector((state) => state.profile);
  const { socket } = useSelector((state) => state.socket);

  const [following, setFollowing] = useState(false);

  const [followUser] = useFollowMutation();
  const [unFollowUser] = useUnFollowMutation();
  const [createNotify] = useCreateNotificationMutation();
  const [removeNotify] = useRemoveNotificationMutation();

  const dispatch = useDispatch();
  const handleFollow = async () => {
    try {
      const res = await followUser(user._id).unwrap();
      toast.success(res.msg);
      setFollowing(true);
      socket.emit("follow", res.newUser);

      // Notify
      const msg = {
        id: user._id,
        text: "has started to follow you.",
        recipients: [res.newUser._id],
        url: `/profile/${profile._id}`,
      };

      const notifyres = await createNotify(msg).unwrap();

      if (notifyres) {
        socket.emit("createNotify", {
          ...notifyres.notifies,
          user: {
            name: profile.name,
            avatar: profile.avatar,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnFollow = async () => {
    try {
      const res = await unFollowUser(user._id).unwrap();
      toast.success(res.msg);
      setFollowing(false);

      socket.emit("unFollow", res.newUser);

      // Notify
      const msg = {
        id: user._id,
        text: "has started to follow you.",
        recipients: [res.newUser._id],
        url: `/profile/${profile._id}`,
      };

      const notifyres = await removeNotify(msg).unwrap();

      if (notifyres) {
        socket.emit("removeNotify", msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (profile && profile.following.some((u) => u._id === user._id)) {
      setFollowing(true);
    }
  }, [profile, user._id]);

  return (
    <>
      {user && (
        <>
          {" "}
          <p className="text-center text-2xl">{user.name}</p>
          <div className="flex justify-between">
            {profile._id !== user._id ? (
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
            </div>{" "}
          </div>
        </>
      )}
    </>
  );
};

export default ProfileInfo;
