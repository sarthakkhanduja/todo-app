require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

const ToDoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
});

const Todo = mongoose.model("Todos", ToDoSchema);

module.exports = {
  Todo,
};
