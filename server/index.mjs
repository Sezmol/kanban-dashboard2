import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const barChartData = [
  {
    x: 103,
  },
  {
    x: 76,
  },
  {
    x: 76,
  },
  {
    x: 0,
  },
  {
    x: 0,
  },
  {
    x: 0,
  },
  {
    x: 0,
  },
  {
    x: 33,
  },
  {
    x: 33,
  },
  {
    x: 0,
  },
  {
    x: 0,
  },
  {
    x: 103,
  },
  {
    x: 87,
  },
];

const lineChartData = [
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
const data = { barChartData, lineChartData };

const addNewData = (chartData, maxLength) => {
  if (chartData.length >= maxLength) {
    chartData.shift();
  }

  const newData = { x: Math.ceil(Math.random() * 101) };
  chartData.push(newData);
};

io.on("connection", (socket) => {
  socket.emit("charts-data", data);

  const intervalId = setInterval(() => {
    addNewData(barChartData, 13);
    addNewData(lineChartData, 6);

    socket.emit("charts-data", data);
  }, 5000);

  socket.on("disconnect", () => {
    clearInterval(intervalId);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
