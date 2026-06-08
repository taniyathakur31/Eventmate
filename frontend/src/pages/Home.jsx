import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  // Load events from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("em_events") || "[]");
    setEvents(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-200 text-gray-900 relative overflow-hidden">

      {/* Floating Confetti Bubbles */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-pink-300/40 rounded-full blur-2xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/40 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Hero Section */}
      <section className="text-center py-24 px-6 relative z-10">
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-red-500 to-yellow-500 animate-gradient"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎉 Welcome to Eventmate
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl max-w-2xl mx-auto text-gray-800 mb-10 drop-shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover & create unforgettable events with seamless booking & QR check-in.  
          Let’s turn moments into memories! ✨
        </motion.p>

        <motion.div className="flex justify-center gap-4 flex-wrap">
          <motion.button
            onClick={() => navigate("/create")}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full font-bold text-lg shadow-lg hover:scale-110 hover:shadow-2xl transition"
            whileHover={{ rotate: [0, 3, -3, 0] }}
          >
            🚀 Create Event
          </motion.button>

          <motion.button
            onClick={() => navigate("/mytickets")}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg hover:scale-110 hover:shadow-2xl transition"
            whileHover={{ rotate: [0, 3, -3, 0] }}
          >
            🎟️ My Tickets
          </motion.button>
        </motion.div>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12">🔥 Upcoming Events</h2>

        {events.length === 0 ? (
          <motion.div
            className="bg-white/60 backdrop-blur-md p-12 rounded-2xl text-center shadow-2xl animate-pulse"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-2xl font-semibold mb-2">No events yet 😢</h3>
            <p className="text-gray-700 mb-6">
              Be the first to host and spread the joy 🎊
            </p>
            <button
              onClick={() => navigate("/create")}
className="px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-500 text-white rounded-xl font-semibold hover:scale-105 transition"
            >
              Create Event
            </button>
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {events.map((ev) => (
              <motion.div
                key={ev.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
                className="relative bg-white/30 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden group"
              >
                {/* Shine Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition animate-shine" />
                <EventCard event={ev} />
          </motion.div>
          ))}
          </motion.div>
        )}
      </section>
      {/* Footer */}
      <footer className="py-8 text-center bg-gradient-to-r from-pink-400 via-orange-300 to-yellow-200 backdrop-blur-md relative z-10">
        <p className="text-gray-800 font-medium flex justify-center items-center gap-2">
          © {new Date().getFullYear()} Eventmate • Made with ❤️ & 🎶
        </p>
      </footer>
    </div>
    );
}