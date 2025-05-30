const Todo = require("../Schema/todo");

//Get all the Todo
exports.getAllTodo = async (req, res) => {
  try {
    const { completed, sorts, order } = req.query; // Use query instead of body for GET
    let filter = {};
    let sortBy = {};

    if (completed !== undefined) {
      filter.Completed = completed === "true";
    }

    if (sorts !== undefined) {
      sortBy[sorts] = order === "desc" ? -1 : 1;
    }

    const todos = await Todo.find(filter).sort(sortBy);

    if (!todos || todos.length === 0) {
      return res.status(404).send("No todos found");
    }

    return res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).send("Server error");
  }
};

//Delete the Specific todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.findByIdAndDelete(id);
  res.send("Deleted the Todo").sendStatus(201);
  if (!deleted) {
    res.send("Could not Delete the Todo").sendStatus(200);
  }
};

//Update on Click of input box
exports.updateCompleted = async (req, res) => {
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
};

//Update Todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  const updated = await Todo.findByIdAndUpdate(id, {
    ...todo(todo && { Todo: todo }),
  });
  res.send(updated).sendStatus(201);
  if (!updated) {
    res.send("No Todo Updated").sendStatus(200);
  }
};

// Create Todo
exports.createTodo = async (req, res) => {
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
};

//Mark as Complete
exports.MarkComplete = async (req, res) => {
  try {
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res
        .status(400)
        .send("Invalid 'completed' value. Must be true or false.");
    }

    const result = await Todo.updateMany({}, { Completed: completed });

    if (result.modifiedCount === 0) {
      return res.status(404).send("No todos were updated.");
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating todos:", err);
    res.status(500).send("Server error");
  }
};

//Get Specific Todo by id
exports.getSpecificTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);
  if (!todo) {
    res.send("No Todo Found").sendStatus(200);
  } else {
    res.send(todo).sendStatus(200);
  }
};
