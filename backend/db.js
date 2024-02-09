// require("dotenv").config();
const mongoose = require("mongoose");

// console.log(process.env.MONGO_URI);
// console.log(typeof process.env.MONGO_URI);

mongoose.connect(
  "mongodb+srv://sarthakkhanduja:Sarthak%40123@test-cluster-sarthak.fxb1y3m.mongodb.net/todoApp"
);

const ProjectSchema = new mongoose.Schema({
  title: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todos",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  progress: Number,
});

const ToDoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Yet to Start", "In Progress", "Completed"],
    default: "Yet to Start",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const Todo = mongoose.model("Todo", ToDoSchema);
const Project = mongoose.model("Project", ProjectSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
  Todo,
  User,
  Project,
};
