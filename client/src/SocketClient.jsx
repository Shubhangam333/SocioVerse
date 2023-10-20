import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import audiobell from "./audio/got-it-done-613.mp3";
import { useRef } from "react";
import { setNotification } from "./features/notify/notifySlice";

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

  // Notification
  useEffect(() => {
    socket.on("createNotifyToClient", (msg) => {
      console.log("msgzzzz", msg);
      audioRef.current.play();
      dispatch(setNotification(msg));

      // if (notify.sound) audioRef.current.play();
      spawnNotification(
        msg.user.username + " " + msg.text,
        msg.user.avatar,
        msg.url,
        "V-NETWORK"
      );
    });

    return () => socket.off("createNotifyToClient");
  }, [socket]);
  return (
    <>
      <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audiobell} type="audio/mp3" />
      </audio>
    </>
  );
};

export default SocketClient;
