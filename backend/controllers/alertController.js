const Alert = require("../models/Alert");

const getAlerts = async (req, res, next) => {
  try {
    const { active } = req.query;
    const filter = active === "true" ? { isActive: true } : {};
    const alerts = await Alert.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json({ count: alerts.length, alerts });
  } catch (err) {
    next(err);
  }
};

const createAlert = async (req, res, next) => {
  try {
    const alert = await Alert.create({ ...req.body, createdBy: req.user._id });
    req.io.emit("alert:new", alert);
    res.status(201).json({ alert });
  } catch (err) {
    next(err);
  }
};

const updateAlert = async (req, res, next) => {
  try {
    if (req.body.isActive === false) req.body.resolvedAt = new Date();
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alert) return res.status(404).json({ message: "Alert not found" });
    res.json({ alert });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAlerts, createAlert, updateAlert };
