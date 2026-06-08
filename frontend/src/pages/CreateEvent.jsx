import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CreateEvent() {
const [event, setEvent] = useState({
title: "",
date: "",
location: "",
description: "",
theme: "Party",
});

const [events, setEvents] = useState([]);

useEffect(() => {
const saved = JSON.parse(localStorage.getItem("em_events") || "[]");
setEvents(saved);
}, []);

const handleChange = (e) => {
setEvent({ ...event, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
e.preventDefault();

```
const newEvent = {
  ...event,
  id: Date.now(),
};

const updatedEvents = [...events, newEvent];

localStorage.setItem("em_events", JSON.stringify(updatedEvents));
setEvents(updatedEvents);

alert("🎉 Event created successfully!");

setEvent({
  title: "",
  date: "",
  location: "",
  description: "",
  theme: "Party",
});
```

};

return ( <div className="min-h-screen bg-gradient-to-tr from-pink-400 via-purple-400 to-orange-300 py-16 px-6"> <div className="max-w-6xl mx-auto">

```
    <motion.div
      className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Form Card */}
      <div className="bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
        <h1 className="text-3xl font-extrabold text-white mb-6 text-center drop-shadow">
          🎊 Create Your Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full p-3 rounded-xl bg-white/50 focus:bg-white focus:outline-none shadow-md"
            required
          />

          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50 focus:bg-white focus:outline-none shadow-md"
            required
          />

          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 rounded-xl bg-white/50 focus:bg-white focus:outline-none shadow-md"
            required
          />

          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Event Description"
            rows={3}
            className="w-full p-3 rounded-xl bg-white/50 focus:bg-white focus:outline-none shadow-md"
            required
          />

          <select
            name="theme"
            value={event.theme}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/50 focus:bg-white shadow-md"
          >
            <option>Party 🎉</option>
            <option>Concert 🎶</option>
            <option>Hackathon 💻</option>
            <option>Festival 🌸</option>
            <option>Workshop 📚</option>
          </select>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-full font-bold text-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white shadow-lg"
          >
            🚀 Create Event
          </motion.button>
        </form>
      </div>

      {/* Live Event Preview */}
      <motion.div
        className="bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-xl text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-2xl font-bold mb-3">📌 Event Preview</h2>

        <div className="bg-white/30 rounded-2xl p-6 shadow-inner">
          <h3 className="text-xl font-semibold">
            {event.title || "Your Event Title"}
          </h3>

          <p className="text-sm">
            {event.date || "Select a date"} • {event.location || "Location"}
          </p>

          <p className="mt-2 text-gray-800">
            {event.description || "Event details will appear here..."}
          </p>

          <span className="mt-4 inline-block px-3 py-1 bg-pink-600 text-white rounded-full text-sm">
            {event.theme}
          </span>
        </div>
      </motion.div>
    </motion.div>

    {/* Created Events */}
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        📅 Created Events
      </h2>

      {events.length === 0 ? (
        <div className="text-center text-white text-lg">
          No events created yet.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev) => (
            <motion.div
              key={ev.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-xl font-bold mb-2">{ev.title}</h3>

              <p className="text-gray-700">📅 {ev.date}</p>
              <p className="text-gray-700">📍 {ev.location}</p>

              <p className="mt-3 text-gray-600">
                {ev.description}
              </p>

              <span className="inline-block mt-4 px-3 py-1 bg-pink-500 text-white rounded-full">
                {ev.theme}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>

  </div>
</div>
);
}
