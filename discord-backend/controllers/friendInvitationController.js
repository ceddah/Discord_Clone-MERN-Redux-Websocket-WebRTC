const FriendInvitation = require("../models/friendInvitation");
const User = require("../models/user");
const {
  updateFriendsPendingInvitations,
  updateFriends,
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

  updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("Friend Invitation has been sent!");
};

exports.postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).send("Error occurred. Please try again.");
    }

    const { senderId, receiverId } = invitation;

    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    await FriendInvitation.findByIdAndDelete(id);

    updateFriendsPendingInvitations(receiverId.toString());

    // Update friends list of both users if they are online
    updateFriends(senderId.toString());
    updateFriends(receiverId.toString());

    return res.status(200).send("Friend successfully added!");
  } catch (error) {
    console.log(err);
    return res.status(500).send("Something went wrong. Please try again.");
  }
};
exports.postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;
    const invitationExists = await FriendInvitation.exists({ _id: id });

    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }
    updateFriendsPendingInvitations(userId);
    return res.status(200).send("Invitation was successfully rejected.");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong. Please try again.");
  }
};
