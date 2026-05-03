// backend/controllers/chatController.js
const Chat = require("../models/Chat");

exports.getMessages = async (req, res) => {
  const { user1, user2 } = req.params;

  const messages = await Chat.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ timestamp: 1 });

  res.json(messages);
};