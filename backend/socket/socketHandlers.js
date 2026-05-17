const PassengerFlow = require("../models/PassengerFlow");

const socketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Join terminal room
    socket.on("join:terminal", (terminal) => {
      socket.join(`terminal:${terminal}`);
      console.log(`Socket ${socket.id} joined terminal:${terminal}`);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  // Broadcast real-time passenger flow every 30 seconds
  setInterval(async () => {
    try {
      const terminals = ["T1", "T2", "T3", "T4"];
      for (const terminal of terminals) {
        const latest = await PassengerFlow.findOne({ terminal }).sort({ timestamp: -1 });
        if (latest) {
          io.to(`terminal:${terminal}`).emit("flow:update", latest);
        }
      }
      // Also broadcast global update
      const all = await PassengerFlow.find().sort({ timestamp: -1 }).limit(4);
      io.emit("flow:all", all);
    } catch (err) {
      console.error("Socket broadcast error:", err.message);
    }
  }, 30000);
};

module.exports = socketHandlers;
