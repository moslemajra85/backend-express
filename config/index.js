const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to MongoDB...".green.bold);
  } catch (error) {
    console.error("We coud not Connect to Mongodb...".red.inverse, error);
  }
}

module.exports = connectDB;
