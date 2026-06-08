const express = require("express");
const { bookTicket, checkIn } = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/book", protect, bookTicket);
router.post("/checkin", protect, checkIn);

module.exports = router;
