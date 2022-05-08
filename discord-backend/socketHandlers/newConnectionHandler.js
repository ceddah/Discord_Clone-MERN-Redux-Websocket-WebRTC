const serverStore = require("../serverStore");
const { updateFriendsPendingInvitations } = require("./updates/friends");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending invitations as soon as he connects
  updateFriendsPendingInvitations(userDetails.userId);
};

module.exports = newConnectionHandler;
