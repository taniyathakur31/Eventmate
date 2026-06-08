/*const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/eventmate", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected...");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
*/
const mongoose = require('mongoose');
require('dotenv').config(); // Load .env variables

async function connectDB() {
  try {
    // ✅ FIXED: Wrapped URI in backticks (` `)
    
        const uri=`mongodb+srv://thakurtaniya710:${process.env.db_password}@cluster0.fcgmewv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    const connection = await mongoose.connect(uri); // No need for useNewUrlParser/unifiedTopology

    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
