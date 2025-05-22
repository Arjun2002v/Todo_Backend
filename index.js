const express = require("express");
const connectDB = require("./Database/TodoDb");
require("dotenv").config();
const Todo = require("./Schema/todo");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello from Node.js and MongoDB!");
});
app.post("/todos", (req, res) => {
  const { todo } = req.body;
  const newTodo = new Todo({ todo });
  const saved = newTodo.save();
  res.send(201);
});
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
