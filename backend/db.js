// require("dotenv").config();
const mongoose = require("mongoose");

// console.log(process.env.MONGO_URI);
// console.log(typeof process.env.MONGO_URI);

mongoose.connect(
  "mongodb+srv://sarthakkhanduja:Sarthak%40123@test-cluster-sarthak.fxb1y3m.mongodb.net/todoApp"
);

const ToDoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todos", ToDoSchema);

module.exports = {
  Todo,
};
