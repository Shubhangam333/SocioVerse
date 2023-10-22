let users = [];

export const SocketServer = (socket) => {
  socket.on("joinUser", (user) => {
    console.log("user", user._id);
    users.push({
      id: user._id,
      socketId: socket.id,
      followers: user.followers,
    });
    console.log("users before disconnect", users);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
    users = users.filter((user) => user.socketId !== socket.id);
    console.log("users", users);
  });

  socket.on("likePost", (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];

    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("likeToClient", newPost);
      });
    }
  });

  socket.on("unLikePost", (newPost) => {
    const ids = [...newPost.user.followers, newPost.user._id];
    const clients = users.filter((user) => ids.includes(user.id));

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("unLikeToClient", newPost);
      });
    }
  });

  // Follow
  socket.on("follow", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit("followToClient", newUser);
  });

  socket.on("unFollow", (newUser) => {
    const user = users.find((user) => user.id === newUser._id);
    user && socket.to(`${user.socketId}`).emit("unFollowToClient", newUser);
  });

  // Notification
  socket.on("createNotify", (msg) => {
    const client = users.find((user) => msg.recipients.includes(user.id));
    let arr = [];
    arr.push(msg);
    client && socket.to(`${client.socketId}`).emit("createNotifyToClient", arr);
  });

  socket.on("removeNotify", (msg) => {
    const client = users.find((user) => msg.recipients.includes(user.id));
    client && socket.to(`${client.socketId}`).emit("removeNotifyToClient", msg);
  });
};
