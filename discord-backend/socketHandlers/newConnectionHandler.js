const serverStore = require("../serverStore");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("./updates/friends");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending invitations as soon as he connects
  updateFriendsPendingInvitations(userDetails.userId);
  updateFriends(userDetails.userId);
};

module.exports = newConnectionHandler;
