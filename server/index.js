import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import connectToDatabase from "./db/db.js";
import employeeRouter from "./routes/employee.js";
import departmentRouter from "./routes/department.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import settingRouter from "./routes/setting.js";
import dashboardRouter from "./routes/dashboard.js";
import attendanceRouter from "./routes/attendance.js";
import registerRouter from "./routes/register.js";
import chatRouter from "./routes/chat.js";
import path from "path";
dotenv.config();

const app = express();
const server = http.createServer(app);
const _dirname=path.resolve();
const io = new Server(server, {

  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
try {
  connectToDatabase();
  console.log("Connected to Database Successfully");
} catch (error) {
  console.error("Database Connection Failed", error);
}

// Routes
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/setting", settingRouter);
app.use("/uploads", express.static("public/uploads"));
app.use("/api/attendance", attendanceRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/register", registerRouter);
app.use("/api/chat", chatRouter);
app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

// Socket.IO event handling
io.on("connection", (socket) => {
  //console.log("A user connected");

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("clearChat", () => {
    io.emit("clearChat");
  });

  socket.on("disconnect", () => {
 //   console.log("A user disconnected");
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { io };