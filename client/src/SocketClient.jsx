import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import audiobell from "./audio/got-it-done-613.mp3";
import { useRef } from "react";
import {
  setNotification,
  updateNotification,
} from "./features/notify/notifySlice";
import { updatePosts } from "./features/posts/postSlice";
import { setUserInfo } from "./features/profile/profileSlice";
import {
  setAvailableUser,
  setUnAvailableUser,
} from "./features/status/statusSlice";
import { updateMessages } from "./features/messages/messageSlice";

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);

  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
  };
};
const SocketClient = () => {
  const { socket } = useSelector((state) => state.socket);
  const { userInfo } = useSelector((state) => state.auth);
  const { online } = useSelector((state) => state.status);
  const { profile } = useSelector((state) => state.profile);

  const audioRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("joinUser", userInfo);
  }, [socket, userInfo]);

  // Likes
  useEffect(() => {
    socket.on("likeToClient", (newPost) => {
      dispatch(updatePosts(newPost));
    });

    return () => socket.off("likeToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("unLikeToClient", (newPost) => {
      dispatch(updatePosts(newPost));
    });

    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  // Follow
  useEffect(() => {
    socket.on("followToClient", (newUser) => {
      dispatch(setUserInfo(newUser));
    });

    return () => socket.off("followToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("unFollowToClient", (newUser) => {
      dispatch(setUserInfo(newUser));
    });

    return () => socket.off("unFollowToClient");
  }, [socket, dispatch]);

  // Comments
  useEffect(() => {
    socket.on("createCommentToClient", (newPost) => {
      console.log(newPost);
      dispatch(updatePosts(newPost));
    });

    return () => socket.off("createCommentToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("deleteCommentToClient", (newPost) => {
      dispatch(updatePosts(newPost));
    });

    return () => socket.off("deleteCommentToClient");
  }, [socket, dispatch]);

  // Notification
  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      console.log("msgzzzz", msg);
      audioRef.current.play();
      dispatch(setNotification(msg));

      // if (notify.sound) audioRef.current.play();
      spawnNotification(
        // msg.user.name + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "SOCIOVERSE-NETWORK"
      );
    });

    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("removeNotifyToClient", (msg) => {
      dispatch(updateNotification(msg));
    });

    return () => socket.off("removeNotifyToClient");
  }, [socket, dispatch]);

  // Check User Online / Offline
  useEffect(() => {
    socket.emit("checkUserOnline", userInfo);
  }, [socket, userInfo]);

  useEffect(() => {
    socket.on("checkUserOnlineToMe", (data) => {
      // console.log("data", data);
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch(setAvailableUser(item.id));
        }
      });
    });

    return () => socket.off("checkUserOnlineToMe");
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket.on("checkUserOnlineToClient", (id) => {
      if (!online.includes(id)) {
        dispatch(setAvailableUser(id));
      }
    });

    return () => socket.off("checkUserOnlineToClient");
  }, [socket, dispatch, online]);

  // Check User Offline
  useEffect(() => {
    socket.on("CheckUserOffline", (id) => {
      dispatch(setUnAvailableUser(id));
    });

    return () => socket.off("CheckUserOffline");
  }, [socket, dispatch]);

  // Message
  useEffect(() => {
    socket.on("addMessageToClient", (msg) => {
      dispatch(updateMessages(msg));

      // dispatch({
      //   type: MESS_TYPES.ADD_USER,
      //   payload: {
      //     ...msg.user,
      //     text: msg.text,
      //     media: msg.media,
      //   },
      // });
    });

    return () => socket.off("addMessageToClient");
  }, [socket, dispatch]);
  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audiobell} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
