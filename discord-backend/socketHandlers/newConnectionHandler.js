const serverStore = require("../serverStore");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("./updates/friends");
const { updateRooms } = require("./updates/rooms");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending invitations as soon as user connects
  updateFriendsPendingInvitations(userDetails.userId);
  updateFriends(userDetails.userId);
  setTimeout(() => {
    updateRooms(socket.id);
  }, 500);
};

module.exports = newConnectionHandler;
