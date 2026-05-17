const mongoose = require("mongoose");

const passengerFlowSchema = new mongoose.Schema(
  {
    terminal: { type: String, required: true, enum: ["T1", "T2", "T3", "T4"] },
    timestamp: { type: Date, required: true, default: Date.now },
    actualCount: { type: Number, required: true },
    predictedCount: { type: Number },
    checkpointType: {
      type: String,
      enum: ["security", "immigration", "boarding", "baggage"],
      required: true,
    },
    congestionLevel: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "low",
    },
    waitTimeMinutes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

passengerFlowSchema.index({ terminal: 1, timestamp: -1 });
passengerFlowSchema.index({ timestamp: -1 });

module.exports = mongoose.model("PassengerFlow", passengerFlowSchema);
