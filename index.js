const express = require("express");
const connectDB = require("./Database/TodoDb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => res.send("Welcome"));

// ✅ Connect to DB first, THEN define routes
connectDB().then(() => {
  const Todo = require("./Schema/todo");

  app.get("/getTodo", async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
      res.status(500).send("Server error");
    }
  });

  app.post("/todos", async (req, res) => {
    const { todo } = req.body;

    if (!todo) return res.status(400).send("Todo is required");

    try {
      const newTodo = new Todo({ Todo: todo });
      const saved = await newTodo.save();
      res.status(201).json(saved);
    } catch (error) {
      console.error("Error saving todo:", error);
      res.status(500).send("Server error");
    }
  });

  app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  );
});
