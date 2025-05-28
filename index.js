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

//Get all the Todo
app.get("/alltodo", async (req, res) => {
  const list = await Todo.find();
  res.send(list).sendStatus(201);
  if (!list) {
    res.sendStatus(401);
  }
});

//Get Specific Todo by id

app.get("/todo/:id", async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);
  res.send(todo).sendStatus(200);
  if (!todo) {
    res.send("No Todo Found").sendStatus(401);
  }
});

// Create Todo
app.post("/todos", async (req, res) => {
  const { todo } = req.body;

  if (!todo) {
    return res.status(200).send("Todo is required");
  }

  try {
    const newTodo = new Todo({ Todo: todo });
    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving todo:", error);
    res.status(500).send("Server error");
  }
});

//Update Todo
app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  const updated = await Todo.findByIdAndUpdate(id, {
    ...todo(todo && { Todo: todo }),
  });
  res.send(updated).sendStatus(201);
  if (!updated) {
    res.send("No Todo Updated").sendStatus(200);
  }
});

//Filter the Todo based of the completion status
app.get("/alltodos", async (req, res) => {
  const { completed, sort, order } = req.query;
  let filter = {};
  let sorted;
  if (completed !== undefined) {
    filter.Completed = completed === "true";
  }
  if (sort) {
    sorted[sort] = order === "desc" ? -1 : 1;
  }
  const todo = await Todo.find(filter);
  res.send(todo).sendStatus(201);
  if (!todo) {
    res.send("No Todo Found").sendStatus(201);
  }
});
//Update on Click of input box
app.put("/completed/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const update = await Todo.findByIdAndUpdate(
    id,
    { Completed: completed },
    { new: true }
  );
  res.send(update).sendStatus(200);
  if (update) {
    res.send("No Todo Updated").sendStatus(200);
  }
});

//Delete the Specific todo
app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.findByIdAndDelete(id);
  res.send("Deleted the Todo").sendStatus(201);
  if (!deleted) {
    res.send("Could not Delete the Todo").sendStatus(200);
  }
});
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
