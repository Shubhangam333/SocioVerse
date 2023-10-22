import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import audiobell from "./audio/got-it-done-613.mp3";
import { useRef } from "react";
import {
  setNotification,
  updateNotification,
} from "./features/notify/notifySlice";
import { updatePosts } from "./features/posts/postSlice";

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

  const audioRef = useRef();
  const dispatch = useDispatch();

  const [like, setLike] = useState("");
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
      console.log("unlikr", newPost);
      dispatch(updatePosts(newPost));
    });

    return () => socket.off("unLikeToClient");
  }, [socket, dispatch]);

  // Notification
  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      console.log("msgzzzz", msg);
      audioRef.current.play();
      dispatch(setNotification(msg));

      // if (notify.sound) audioRef.current.play();
      spawnNotification(
        msg.user.name + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "SOCIOVERSE-NETWORK"
      );
    });

    return () => socket.off("createNotifyToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on("removeNotifyToClient", (msg) => {
      console.log(msg);
      dispatch(updateNotification(msg));
    });

    return () => socket.off("removeNotifyToClient");
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
