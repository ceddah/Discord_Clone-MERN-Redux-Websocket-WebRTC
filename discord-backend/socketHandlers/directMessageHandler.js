const Message = require("../models/message");
const Conversation = require("../models/conversation");
const chatUpdates = require("./updates/chat");

const directMessageHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    const message = await Message.create({
      content,
      author: userId,
      date: new Date(),
      type: "DIRECT",
    });

    // Find out if conversation exists between these 2 users.
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();
      // perform an update to sender and receiver if they are online
      chatUpdates.updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });
      chatUpdates.updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = directMessageHandler;
