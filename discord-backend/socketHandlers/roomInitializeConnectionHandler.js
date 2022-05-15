const roomInitializeConnectionHandler = (socket, data) => {
  const { connUserSocketId } = data;
  const initData = { connUserSocketId: socket.id };
  // We are emitting new signal to the user who is trying to connect, our own socketId now
  socket.to(connUserSocketId).emit("conn-init", initData);
};

module.exports = roomInitializeConnectionHandler;
