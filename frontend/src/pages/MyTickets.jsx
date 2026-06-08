import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  // Load tickets from localStorage
  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem("myTickets")) || [];
    setTickets(savedTickets);
  }, []);

  // Save tickets to localStorage whenever tickets change
  useEffect(() => {
    localStorage.setItem("myTickets", JSON.stringify(tickets));
  }, [tickets]);

  const handleBookTicket = () => {
    if (!eventName || !eventDate || !eventLocation) return;

    const newTicket = {
      id: "TCKT" + Math.floor(Math.random() * 1000000),
      event: eventName,
      date: eventDate,
      location: eventLocation,
    };

    setTickets([newTicket, ...tickets]);
    setEventName("");
    setEventDate("");
    setEventLocation("");
  };

  const handleDeleteTicket = (id) => {
    setTickets(tickets.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-pink-100 py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center text-pink-700 mb-12 drop-shadow-lg"
      >
        🎉 My Fabulous Tickets
      </motion.h1>

      {/* Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl p-6 mb-10 shadow-2xl border border-pink-300"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
          Book Your Ticket
        </h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="text"
            placeholder="Location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            className="p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleBookTicket}
            className="mt-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
          >
            Book Ticket
          </button>
        </div>
      </motion.div>

      {/* Ticket List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {tickets.length === 0 && (
          <p className="text-center text-pink-600 font-semibold text-lg">
            No tickets booked yet! Start booking fabulous events 🌟
          </p>
        )}
        {tickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-pink-300 hover:shadow-pink-500/50 hover:scale-105 transition-transform"
          >
            <h2 className="text-2xl font-bold text-pink-700 mb-2">
              {ticket.event}
            </h2>
            <p className="text-gray-700 mb-1">
              📍 <strong>Location:</strong> {ticket.location}
            </p>
            <p className="text-gray-700 mb-4">
              📅 <strong>Date:</strong> {ticket.date}
            </p>

            <div className="flex flex-col items-center gap-2 mb-2">
              <QRCode
                value={ticket.id}
                size={128}
                className="bg-white p-2 rounded-xl"
              />
              <p className="mt-2 text-sm font-mono text-gray-800">
                Ticket ID: {ticket.id}
              </p>
            </div>

            <button
              onClick={() => handleDeleteTicket(ticket.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl shadow-md transition-transform transform hover:scale-105 mt-2"
            >
              Cancel Ticket
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
