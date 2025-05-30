const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Todo: {
    type: String,
    required: true,
  },
  Completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", schema);
