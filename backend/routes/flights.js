const express = require("express");
const router = express.Router();
const {
  getFlights, createFlight, getFlight, updateFlight, deleteFlight,
} = require("../controllers/flightController");
const { protect } = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.use(protect);

router.route("/")
  .get(getFlights)
  .post(roleCheck("admin", "analyst"), createFlight);

router.route("/:id")
  .get(getFlight)
  .put(roleCheck("admin", "analyst"), updateFlight)
  .delete(roleCheck("admin"), deleteFlight);

module.exports = router;
