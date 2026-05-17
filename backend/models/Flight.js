const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true, uppercase: true },
    airline: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    terminal: { type: String, required: true, enum: ["T1", "T2", "T3", "T4"] },
    gate: { type: String },
    scheduledArrival: { type: Date },
    scheduledDeparture: { type: Date },
    actualArrival: { type: Date },
    actualDeparture: { type: Date },
    status: {
      type: String,
      enum: ["scheduled", "boarding", "departed", "arrived", "delayed", "cancelled"],
      default: "scheduled",
    },
    passengerCount: { type: Number, default: 0 },
    aircraftType: { type: String },
  },
  { timestamps: true }
);

flightSchema.index({ flightNumber: 1, scheduledDeparture: 1 });
flightSchema.index({ terminal: 1, status: 1 });

module.exports = mongoose.model("Flight", flightSchema);
