const Flight = require("../models/Flight");

const getFlights = async (req, res, next) => {
  try {
    const { terminal, status, date } = req.query;
    const filter = {};
    if (terminal) filter.terminal = terminal;
    if (status) filter.status = status;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.scheduledDeparture = { $gte: start, $lt: end };
    }
    const flights = await Flight.find(filter).sort({ scheduledDeparture: 1 });
    res.json({ count: flights.length, flights });
  } catch (err) {
    next(err);
  }
};

const createFlight = async (req, res, next) => {
  try {
    const flight = await Flight.create(req.body);
    req.io.emit("flight:status", { type: "new", flight });
    res.status(201).json({ flight });
  } catch (err) {
    next(err);
  }
};

const getFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json({ flight });
  } catch (err) {
    next(err);
  }
};

const updateFlight = async (req, res, next) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    req.io.emit("flight:status", { type: "update", flight });
    res.json({ flight });
  } catch (err) {
    next(err);
  }
};

const deleteFlight = async (req, res, next) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: "Flight deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getFlights, createFlight, getFlight, updateFlight, deleteFlight };
