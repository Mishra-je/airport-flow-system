const express = require("express");
const router = express.Router();
const { getAlerts, createAlert, updateAlert } = require("../controllers/alertController");
const { protect } = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

router.use(protect);

router.route("/")
  .get(getAlerts)
  .post(roleCheck("admin", "analyst"), createAlert);

router.route("/:id")
  .put(roleCheck("admin", "analyst"), updateAlert);

module.exports = router;
