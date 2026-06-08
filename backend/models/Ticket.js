const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  qrCode: {
    type: String, // Base64 QR Image
  },
  checkedIn: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
