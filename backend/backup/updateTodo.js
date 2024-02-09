const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://sarthakkhanduja:Sarthak%40123@test-cluster-sarthak.fxb1y3m.mongodb.net/todoApp"
);

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

// Function to update Todo documents
async function updateTodos() {
  try {
    await Todo.updateMany({}, [
      { $set: { status: "Yet to Start", project: null } }, // Add status with default value and set project to null
      { $unset: ["completedAt", "completed"] }, // Remove completedAt and completed fields
    ]);

    console.log("Todos updated");
  } catch (error) {
    console.error("Error updating Todos:", error);
  }
}

// Update Todos, Users, and Projects
async function updateData() {
  try {
    await updateTodos();
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Run the update process
updateData();
console.log("Done!");
