const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("../Database/TodoDb");
const TodoRoutes = require("../controllers/TodoContoller");

require("dotenv").config(); // Load env variables

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/todo", TodoRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome Todo");
});

// Sample route for logging
app.get("/todo", (req, res) => {
  const { Todo } = req.body;
  console.log(Todo);
  res.send("Logged Todo from body (GET not recommended for body data)");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
