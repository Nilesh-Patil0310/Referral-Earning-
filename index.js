import express from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongoose.js";

import userRouter from "./routes/user.Routes.js";
import transactionRouter from "./routes/transaction.Routes.js";
import earningRouter from "./routes/earning.Routes.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use("api/v1",userRouter);
app.use("api/v1",transactionRouter);
app.use("api/v1",earningRouter);

// WebSocket connection setup
io.on("connection", (socket) => {
  console.log("A user connected");

  // Join a specific room for real-time notifications
  socket.on("subscribe", (userId) => {
    socket.join(`user_${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
