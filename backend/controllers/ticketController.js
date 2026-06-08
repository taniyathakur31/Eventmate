const Ticket = require("../models/Ticket");
const QRCode = require("qrcode");

exports.bookTicket = async (req, res) => {
  try {
    const { eventId } = req.body;

    // 1. Create ticket entry first
    const ticket = await Ticket.create({
      user: req.user._id,
      event: eventId,
    });

    // 2. Generate QR containing ticket check-in URL
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173"; 
    const qrData = `${baseUrl}/checkin/${ticket._id}`;

    const qrCode = await QRCode.toDataURL(qrData);

    // 3. Save QR to ticket
    ticket.qrCode = qrCode;
    await ticket.save();

    res.status(201).json({
      message: "Ticket booked successfully",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkIn = async (req, res) => {
  try {
    const { ticketId } = req.params; // From URL
    const ticket = await Ticket.findById(ticketId).populate("event user");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (ticket.checkedIn) {
      return res.status(400).json({ message: "Ticket already checked in" });
    }

    ticket.checkedIn = true;
    await ticket.save();

    res.json({
      message: "Check-in successful",
      ticket,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
