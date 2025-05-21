const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("../Database/TodoDb");
const TodoRoutes = require("../controllers/TodoContoller");

const app = express();
connectDB();
app.use(express.json());
app.use("/api/todo", TodoRoutes);

app.get("/", (res, req) => {
  res.send("Welcome Todo");
});

const PORT = process.env.TZ;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
