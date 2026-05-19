// backend/index.js
require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const socketHandler = require("./sockets/socket");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

socketHandler(io);

server.listen(5000, () => console.log("Server running on 5000"));