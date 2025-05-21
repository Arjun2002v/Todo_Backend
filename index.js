const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./Database/TodoDb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Node.js and MongoDB!");
});
connectDB();
