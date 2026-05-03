const Chat = require("../models/Chat");
const User = require("../models/User");

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 New user connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("✅ User joined room:", userId);
    });

    socket.on("send_message", async (data) => {
      const { sender, receiver, message } = data;

      console.log("📤 Message attempt:");
      console.log("➡️ Sender:", sender);
      console.log("➡️ Receiver:", receiver);
      console.log("➡️ Message:", message);

      // ✅ Validate receiver
      const userExists = await User.findOne({ username: receiver });

      if (!userExists) {
        console.log("❌ Receiver does NOT exist:", receiver);

        socket.emit("error_message", {
          message: "User does not exist"
        });
        return;
      }

      console.log("✅ Receiver exists:", receiver);

      // ✅ Save message
      const newChat = new Chat({ sender, receiver, message });
      await newChat.save();

      console.log("💾 Message saved to DB");

      // 🔥 Emit to both
      io.to(sender).emit("receive_message", data);
      io.to(receiver).emit("receive_message", data);

      console.log("📡 Message emitted to:");
      console.log("🟢 Sender room:", sender);
      console.log("🔵 Receiver room:", receiver);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;