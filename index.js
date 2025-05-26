const express = require("express");
const connectDB = require("./Database/TodoDb");

require("dotenv").config();
const Todo = require("./Schema/todo");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
if (!process.env.MONGO_URI || !connectDB) {
  console.error("MongoDB URI not found in .env file");
  process.exit(1);
}

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Node.js and MongoDB!");
});

// Create Todo route
app.post("/todos", async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return res.status(400).send("Todo is required");
  }

  try {
    const newTodo = new Todo({ Todo: todo }); // Capital T as per schema
    const saved = await newTodo.save();
    res.status(201).json(saved); // Return the saved todo
  } catch (error) {
    console.error("Error saving todo:", error);
    res.status(500).send("Server error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
