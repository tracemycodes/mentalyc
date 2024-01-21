const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");


app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

// Define our routes
app.use('/api/audio', require(`./routes/audio`));

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING at ${PORT}`);
});