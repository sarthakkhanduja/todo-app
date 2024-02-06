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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Todo = mongoose.model("Todos", ToDoSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
  Todo,
  User,
};
