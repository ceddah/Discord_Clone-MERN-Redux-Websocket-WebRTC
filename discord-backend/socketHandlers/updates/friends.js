const User = require("../../models/user");
const FriendInvitation = require("../../models/friendInvitation");
const serverStore = require("../../serverStore");

const updateFriendsPendingInviration = async (userId) => {
  try {
    const pendingInvirations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username mail");

    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit("friends-invitations", {
        pendingInvirations: pendingInvirations ? pendingInvirations : [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateFriendsPendingInviration };
