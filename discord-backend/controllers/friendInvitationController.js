const FriendInvitation = require("../models/friendInvitation");
const User = require("../models/User");
const {
  updateFriendsPendingInviration,
} = require("../socketHandlers/updates/friends");

exports.postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry you can't become friend with yourself :(");
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });
  if (!targetUser) {
    return res
      .status(404)
      .send(
        `User ${targetMailAddress} has not been found. Please verify mail address.`
      );
  }

  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res
      .status(409)
      .send("Invitation has already been sent. Please be patiant");
  }

  const alreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (alreadyFriends) {
    return res.status(409).send("You are already friends with this user.");
  }

  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  updateFriendsPendingInviration(targetUser._id.toString());

  return res.status(201).send("Friend Invitation has been sent!");
};
