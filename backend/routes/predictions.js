const express = require("express");
const router = express.Router();
const {
  getCurrentPrediction, getHourlyPredictions, getTerminalPrediction, getCustomPrediction,
} = require("../controllers/predictionController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/current", getCurrentPrediction);
router.get("/hourly", getHourlyPredictions);
router.get("/terminal/:id", getTerminalPrediction);
router.post("/custom", getCustomPrediction);

module.exports = router;
