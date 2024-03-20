import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const data = [
  {
    x: 0,
  },
  {
    x: 60,
  },
  {
    x: 20,
  },
  {
    x: 50,
  },
  {
    x: 0,
  },
  {
    x: 100,
  },
];

io.on("connection", (socket) => {
  let isInterval = true;

  if (data.length > 7) {
    data.shift();
  }

  data.push({ x: Math.random() * 100 });

  const interval = setInterval(() => {
    socket.emit("message", data);
  }, 3000);

  if (!isInterval) clearInterval(interval);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
