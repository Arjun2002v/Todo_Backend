const mongoose = require("mongoose");
require("dotenv").config();

// const connectDB = async () => {
//   try {
//     // mongoose.set("strictQuery", false);
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB Connected");
//   } catch (error) {
//     console.error(`❌ Error: ${error.message}`);
//     process.exit(1);
//   }
// };

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Todo",
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
