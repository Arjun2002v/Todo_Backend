const express = require("express");
const connectDB = require("./Database/TodoDb");
const verifyToken = require("./middleware/authMiddleware");
const auth = require("./routes/authRoutes");

require("dotenv").config();

const {
  getAllTodo,
  getSpecificTodo,
  MarkComplete,
  createTodo,
  updateTodo,
  updateCompleted,
  deleteTodo,
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

app.get("/", (req, res) => {
  res.send("Hello from Node.js and MongoDB!");
});

app.use("/auth", auth);

app.get("/todos", verifyToken, getAllTodo);

app.get("/todos/:id", verifyToken, getSpecificTodo);

app.patch("/todos/mark", verifyToken, MarkComplete);

app.post("/todos", verifyToken, createTodo);

app.put("/todos/:id", verifyToken, updateTodo);

app.put("/todo/:id", verifyToken, updateCompleted);

app.delete("/todos/:id", verifyToken, deleteTodo);
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
