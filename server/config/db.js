const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri =
      "mongodb+srv://vegora:vegora123@cluster0.bxcwq86.mongodb.net/?appName=Cluster0";
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Connection failed ${error.message}`);
  }
};

module.exports = connectDB;
