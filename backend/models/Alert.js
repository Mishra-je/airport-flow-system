const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["congestion", "delay", "security", "weather", "system"],
      required: true,
    },
    severity: {
      type: String,
      enum: ["info", "warning", "critical"],
      required: true,
    },
    terminal: { type: String, enum: ["T1", "T2", "T3", "T4", "ALL"] },
    message: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    resolvedAt: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
