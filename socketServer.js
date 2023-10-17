export const SocketServer = (socket) => {
  socket.on("joinUser", (msg) => {
    console.log("msg", msg);
    console.log("connected", msg);
  });
};
