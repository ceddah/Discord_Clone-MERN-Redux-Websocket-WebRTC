const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("Conversation", conversationSchema);
