const express = require("express");
const { createEvent, getEvents } = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createEvent);
router.get("/", getEvents);

module.exports = router;
