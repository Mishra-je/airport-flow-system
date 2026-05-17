require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const socketHandlers = require("./socket/socketHandlers");
const errorHandler = require("./middleware/errorHandler");

// Routes
const authRoutes = require("./routes/auth");
const flightRoutes = require("./routes/flights");
const predictionRoutes = require("./routes/predictions");
const alertRoutes = require("./routes/alerts");

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Attach io to req so controllers can emit events
app.use((req, _res, next) => {
  req.io = io;
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/alerts", alertRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Socket.IO handlers
socketHandlers(io);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = { app, server, io };
