import React, { useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
const SocketClient = () => {
  const msg = "heeyyeyyey";
  useEffect(() => {
    socket.emit("joinUser", msg);
    console.log("hchchch");
  }, []);
  return <></>;
};

export default SocketClient;
