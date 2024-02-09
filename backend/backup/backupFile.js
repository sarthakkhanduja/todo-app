const mongoose = require("mongoose");
const fs = require("fs");
const { promisify } = require("util");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://sarthakkhanduja:Sarthak%40123@test-cluster-sarthak.fxb1y3m.mongodb.net/todoApp"
);

// Define your Mongoose models
const Todo = mongoose.model("Todo", {
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

let count = 0;

// Function to export data to a JSON file
async function backupData(Model, fileName) {
  count += 1;
  try {
    // Query data from MongoDB
    const todos = await Model.find().lean(); // Use lean() to get plain JavaScript objects

    // Serialize data to JSON
    const jsonData = JSON.stringify(todos, null, 2);

    // Write data to a file
    await promisify(fs.writeFile)(fileName, jsonData);

    console.log(`Backup successful for ${count}`);
  } catch (error) {
    console.error("Backup failed:", error);
  }
}

// Run the backup function
backupData(Todo, "TodoBackup");
backupData(User, "UserBackup");
