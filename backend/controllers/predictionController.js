const mlClient = require("../utils/mlClient");
const PassengerFlow = require("../models/PassengerFlow");

// GET /api/predictions/current
const getCurrentPrediction = async (req, res, next) => {
  try {
    const latest = await PassengerFlow.find()
      .sort({ timestamp: -1 })
      .limit(4); // one per terminal
    res.json({ predictions: latest });
  } catch (err) {
    next(err);
  }
};

// GET /api/predictions/hourly
const getHourlyPredictions = async (req, res, next) => {
  try {
    const data = await mlClient.getHourlyForecast();
    res.json({ forecast: data });
  } catch (err) {
    next(err);
  }
};

// GET /api/predictions/terminal/:id
const getTerminalPrediction = async (req, res, next) => {
  try {
    const { id } = req.params; // e.g. T1, T2
    const data = await mlClient.getTerminalForecast(id);
    res.json({ terminal: id, forecast: data });
  } catch (err) {
    next(err);
  }
};

// POST /api/predictions/custom
const getCustomPrediction = async (req, res, next) => {
  try {
    const { terminal, dateTime, flightCount } = req.body;
    const prediction = await mlClient.predictCustom({ terminal, dateTime, flightCount });
    res.json({ prediction });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCurrentPrediction,
  getHourlyPredictions,
  getTerminalPrediction,
  getCustomPrediction,
};
