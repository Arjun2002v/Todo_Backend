const express = require("express");
const connectDB = require("./Database/TodoDb");

require("dotenv").config();
const Todo = require("./Schema/todo");
const {
  getAllTodo,
  getSpecificTodo,
  MarkComplete,
  createTodo,
  updateTodo,
  updateCompleted,
  deleteTodo,
  filterTodo,
} = require("./controllers/TodoContoller");

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

app.get("/alltodo", getAllTodo);

app.get("/todo/:id", getSpecificTodo);

app.patch("/todo/mark", MarkComplete);

app.post("/todos", createTodo);

app.put("/todo/:id", updateTodo);

app.get("/alltodos", filterTodo);

app.put("/completed/:id", updateCompleted);

app.delete("/todo/:id", deleteTodo);
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
